import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getPetsCache, getTimelinePet } from '../../data/storage';
import { IPet, IEventoTimeline } from '../../interfaces/IPet';
import { COLORS } from '../../styles/colors';
import { SPACING, BORDER_RADIUS } from '../../styles/spacing';

const HEADER_COLOR = '#7C3AED';
const HEADER_TEXT = '#FFFFFF';

export function PetDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pet, setPet] = useState<IPet | null>(null);
  const [timeline, setTimeline] = useState<IEventoTimeline[]>([]);

  useEffect(() => {
    if (id) {
      getPetsCache().then(pets => setPet(pets.find(p => p.id === id) ?? null));
      getTimelinePet(id).then(setTimeline);
    }
  }, [id]);

  if (!pet) return null;

  const quickActions = [
    { icon: 'calendar-outline' as const, label: 'Agendar' },
    { icon: 'medical-outline' as const, label: 'Vacinas' },
    { icon: 'document-text-outline' as const, label: 'Exames' },
    { icon: 'alert-circle-outline' as const, label: 'Risco' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gray['100'] }}>
      <StatusBar barStyle="light-content" />
      <View style={{ backgroundColor: HEADER_COLOR, paddingBottom: SPACING.xl }}>
        <SafeAreaView edges={['top']}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: SPACING.md }}>
            <Ionicons name="arrow-back" size={24} color={HEADER_TEXT} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', paddingHorizontal: SPACING.md }}>
            <View style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm, overflow: 'hidden' }}>
              {pet.foto
                ? <Image source={{ uri: pet.foto }} style={{ width: 90, height: 90, borderRadius: 45 }} />
                : <Text style={{ fontSize: 44 }}>{pet.emoji ?? '🐾'}</Text>}
            </View>
            <Text style={{ fontSize: 26, fontWeight: '800', color: HEADER_TEXT, marginBottom: 4 }}>{pet.nome}</Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
              {[pet.especie, pet.raca, pet.peso ? `${pet.peso} kg` : null].filter(Boolean).join(' · ')}
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Quick Actions */}
      <View style={{ flexDirection: 'row', backgroundColor: '#5B21B6', paddingVertical: SPACING.sm }}>
        {quickActions.map((a, i) => (
          <TouchableOpacity key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <Ionicons name={a.icon} size={22} color={HEADER_TEXT} />
            <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: SPACING.md, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

        {/* Pet Info Card */}
        <View style={{ backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginTop: SPACING.md, flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm }}>
          {[
            { label: 'Espécie', value: pet.especie },
            { label: 'Raça', value: pet.raca || '—' },
            { label: 'Gênero', value: pet.genero },
            { label: 'Peso', value: pet.peso ? `${pet.peso} kg` : '—' },
            { label: 'Cor', value: pet.cor || '—' },
          ].map((item, idx) => (
            <View key={idx} style={{ backgroundColor: COLORS.card[idx % COLORS.card.length], borderRadius: BORDER_RADIUS.md, padding: SPACING.sm, minWidth: 90, alignItems: 'center' }}>
              <Text style={{ fontSize: 11, color: COLORS.cardText[idx % COLORS.cardText.length], fontWeight: '600' }}>{item.label}</Text>
              <Text style={{ fontSize: 14, color: COLORS.cardText[idx % COLORS.cardText.length], fontWeight: '800', marginTop: 2 }}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Observações */}
        {pet.notasSaude ? (
          <View style={{ backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginTop: SPACING.sm }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.gray['500'], marginBottom: SPACING.xs }}>OBSERVAÇÕES</Text>
            <Text style={{ fontSize: 14, color: COLORS.secondary['500'], lineHeight: 20 }}>{pet.notasSaude}</Text>
          </View>
        ) : null}

        {/* Timeline */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.secondary['500'], marginTop: SPACING.lg, marginBottom: SPACING.sm }}>Timeline</Text>
        {timeline.length === 0 ? (
          <Text style={{ color: COLORS.gray['400'], fontSize: 14 }}>Nenhum evento registrado.</Text>
        ) : (
          timeline.map((event, idx) => (
            <View key={event.id} style={{ flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.sm }}>
              <View style={{ alignItems: 'center', width: 14 }}>
                <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.primary['500'], marginTop: SPACING.md }} />
                {idx < timeline.length - 1 && <View style={{ flex: 1, width: 2, backgroundColor: COLORS.gray['200'], marginTop: 4 }} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: COLORS.gray['400'], marginBottom: 4 }}>{event.data}</Text>
                <View style={{ backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.md, padding: SPACING.md }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: 2 }}>{event.titulo}</Text>
                  <Text style={{ fontSize: 13, color: COLORS.gray['500'], marginBottom: 2 }}>{event.descricao}</Text>
                  <Text style={{ fontSize: 12, color: COLORS.gray['400'] }}>{event.autor}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default PetDetailScreen;
