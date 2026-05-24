import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getConsultasCache } from '../../data/storage';
import { IConsulta } from '../../interfaces/IPet';
import { COLORS } from '../../styles/colors';
import { vetAgendaStyles as s } from '../../styles/vet/agenda.styles';

const STATUS_CORES: Record<string, string> = {
  agendada: COLORS.secondary['500'],
  concluida: '#22C55E',
  cancelada: COLORS.primary['500'],
};

const STATUS_BG: Record<string, string> = {
  agendada: COLORS.secondary['500'] + '20',
  concluida: '#22C55E20',
  cancelada: COLORS.primary['500'] + '20',
};

function semana(): string {
  const now = new Date();
  const segunda = new Date(now);
  segunda.setDate(now.getDate() - now.getDay() + 1);
  const domingo = new Date(segunda);
  domingo.setDate(segunda.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  return `${fmt(segunda)} – ${fmt(domingo)}`;
}

export function AgendaScreen() {
  const [consultas, setConsultas] = useState<IConsulta[]>([]);

  useFocusEffect(useCallback(() => {
    getConsultasCache().then(setConsultas);
  }, []));

  const semanaLabel = semana();
  const hojeLabel = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={s.header}>
        <Text style={s.title}>Agenda</Text>
        <View style={s.weekRow}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
          <Text style={s.weekLabel}>{semanaLabel}</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.dayTitle}>Hoje — {hojeLabel}</Text>

        {consultas.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 48 }}>
            <Ionicons name="calendar-outline" size={56} color={COLORS.gray['200']} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.gray['500'], marginTop: 12 }}>
              Nenhuma consulta ainda
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.gray['400'], marginTop: 4, textAlign: 'center', paddingHorizontal: 24 }}>
              Consultas agendadas pelos tutores aparecerão aqui
            </Text>
          </View>
        ) : (
          consultas.map((apt, i) => {
            const cor = STATUS_CORES[apt.status] ?? COLORS.gray['400'];
            const bg = STATUS_BG[apt.status] ?? COLORS.gray['100'];
            return (
              <View key={apt.id} style={[s.card, { borderLeftColor: COLORS.card[i % COLORS.card.length], borderLeftWidth: 4 }]}>
                <View style={s.timeCol}>
                  <Text style={s.time}>{apt.horario}</Text>
                </View>
                <View style={s.divider} />
                <View style={s.cardInfo}>
                  <View style={s.cardHeader}>
                    <Text style={s.petName}>{apt.nomePet}</Text>
                    <View style={[s.statusBadge, { backgroundColor: bg }]}>
                      <Text style={[s.statusText, { color: cor }]}>{apt.status}</Text>
                    </View>
                  </View>
                  <Text style={s.reason}>{apt.motivo}</Text>
                  <Text style={s.tutor}>{apt.data} · {apt.nomeClinica}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

export default AgendaScreen;
