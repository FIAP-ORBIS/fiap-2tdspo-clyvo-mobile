import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getPetsCache, getTimelinePet } from '../../data/storage';
import { IPet, IEventoTimeline } from '../../interfaces/IPet';
import { COLORS } from '../../styles/colors';
import { petDetailStyles as s } from '../../styles/tutor/pet-detail.styles';

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
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.headerBg}>
        <SafeAreaView edges={['top']}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={s.avatarSection}>
            <View style={s.avatarCircle}>
              {pet.foto
                ? <Image source={{ uri: pet.foto }} style={s.avatarImg} />
                : <Ionicons name="paw" size={40} color={COLORS.gray['300']} />}
            </View>
            <Text style={s.petName}>{pet.nome}</Text>
            <Text style={s.petSubtitle}>
              {[pet.especie, pet.raca, pet.peso ? `${pet.peso} kg` : null].filter(Boolean).join(' · ')}
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <View style={s.actionsBar}>
        {quickActions.map((a, i) => (
          <TouchableOpacity key={i} style={s.actionItem}>
            <Ionicons name={a.icon} size={22} color={COLORS.white} />
            <Text style={s.actionLabel}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.infoCard}>
          {[
            { label: 'Espécie', value: pet.especie },
            { label: 'Raça', value: pet.raca || '—' },
            { label: 'Gênero', value: pet.genero },
            { label: 'Peso', value: pet.peso ? `${pet.peso} kg` : '—' },
            { label: 'Cor', value: pet.cor || '—' },
          ].map((item, idx) => (
            <View key={idx} style={[s.chip, { backgroundColor: COLORS.card[idx % COLORS.card.length] }]}>
              <Text style={[s.chipLabel, { color: COLORS.cardText[idx % COLORS.cardText.length] }]}>{item.label}</Text>
              <Text style={[s.chipValue, { color: COLORS.cardText[idx % COLORS.cardText.length] }]}>{item.value}</Text>
            </View>
          ))}
        </View>

        {pet.notasSaude ? (
          <View style={s.obsCard}>
            <Text style={s.obsLabel}>OBSERVAÇÕES</Text>
            <Text style={s.obsText}>{pet.notasSaude}</Text>
          </View>
        ) : null}

        <Text style={s.sectionTitle}>Timeline</Text>
        {timeline.length === 0 ? (
          <Text style={s.emptyText}>Nenhum evento registrado.</Text>
        ) : (
          timeline.map((event, idx) => (
            <View key={event.id} style={s.timelineItem}>
              <View style={s.timelineDotCol}>
                <View style={s.timelineDot} />
                {idx < timeline.length - 1 && <View style={s.timelineLine} />}
              </View>
              <View style={s.timelineBody}>
                <Text style={s.timelineDate}>{event.data}</Text>
                <View style={s.timelineCard}>
                  <Text style={s.timelineTitle}>{event.titulo}</Text>
                  <Text style={s.timelineDesc}>{event.descricao}</Text>
                  <Text style={s.timelineAuthor}>{event.autor}</Text>
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
