import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { getPetsCache, getConsultasCache } from '../../data/storage';
import { COLORS } from '../../styles/colors';
import { dashboardStyles as s } from '../../styles/clinic/dashboard.styles';

export function DashboardScreen() {
  const { usuario } = useAuth();
  const [totalPets, setTotalPets] = useState(0);
  const [totalConsultas, setTotalConsultas] = useState(0);
  const [agendadas, setAgendadas] = useState(0);
  const [concluidas, setConcluidas] = useState(0);

  useFocusEffect(useCallback(() => {
    getPetsCache().then(pets => setTotalPets(pets.length));
    getConsultasCache().then(c => {
      setTotalConsultas(c.length);
      setAgendadas(c.filter(x => x.status === 'agendada').length);
      setConcluidas(c.filter(x => x.status === 'concluida').length);
    });
  }, []));

  const STATS = [
    { icon: 'paw-outline' as const, num: String(totalPets), label: 'Pets\ncadastrados', color: COLORS.card[0], textColor: COLORS.cardText[0] },
    { icon: 'calendar-outline' as const, num: String(totalConsultas), label: 'Consultas\nno total', color: COLORS.card[1], textColor: COLORS.cardText[1] },
    { icon: 'time-outline' as const, num: String(agendadas), label: 'Consultas\nagendadas', color: COLORS.card[2], textColor: COLORS.cardText[2] },
    { icon: 'checkmark-circle-outline' as const, num: String(concluidas), label: 'Consultas\nconcluídas', color: COLORS.card[3], textColor: COLORS.cardText[3] },
  ];

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.clinicName}>{usuario?.nome ?? 'Clínica'}</Text>
            <Text style={s.clinicSubtitle}>Painel da clínica</Text>
          </View>
          <Ionicons name="settings-outline" size={24} color="rgba(255,255,255,0.8)" />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.sectionTitle}>Resumo</Text>
        <View style={s.statsGrid}>
          {STATS.map((st, i) => (
            <View key={i} style={[s.statCard, { backgroundColor: st.color }]}>
              <Ionicons name={st.icon} size={24} color={st.textColor} />
              <Text style={[s.statNum, { color: st.textColor }]}>{st.num}</Text>
              <Text style={[s.statLabel, { color: st.textColor }]}>{st.label}</Text>
            </View>
          ))}
        </View>

        <Text style={s.sectionTitle}>Equipe</Text>
        <View style={s.emptySection}>
          <Ionicons name="people-outline" size={44} color={COLORS.gray['200']} />
          <Text style={s.emptyTitle}>Nenhum veterinário cadastrado</Text>
          <Text style={s.emptySubtitle}>Vá até a aba Equipe para gerenciar sua equipe</Text>
        </View>

        <Text style={s.sectionTitle}>Consultas recentes</Text>
        {totalConsultas === 0 ? (
          <View style={s.emptySection}>
            <Ionicons name="calendar-outline" size={44} color={COLORS.gray['200']} />
            <Text style={s.emptyTitle}>Nenhuma consulta registrada</Text>
            <Text style={s.emptySubtitle}>As consultas agendadas pelos tutores aparecerão aqui</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

export default DashboardScreen;
