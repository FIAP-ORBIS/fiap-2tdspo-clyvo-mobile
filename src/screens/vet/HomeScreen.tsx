import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { getConsultasCache } from '../../data/storage';
import { IConsulta } from '../../interfaces/IPet';
import { COLORS } from '../../styles/colors';
import { vetHomeStyles as s } from '../../styles/vet/home.styles';

export function HomeScreen() {
  const { usuario } = useAuth();
  const [consultas, setConsultas] = useState<IConsulta[]>([]);

  useFocusEffect(useCallback(() => {
    getConsultasCache().then(setConsultas);
  }, []));

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const agendadas = consultas.filter(c => c.status === 'agendada');
  const proxima = agendadas[0] ?? null;

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={s.headerContent}>
          <Text style={s.greeting}>Olá, Dr(a). {usuario?.nome ?? 'Veterinário'} 👨‍⚕️</Text>
          <Text style={s.date}>{hoje}</Text>
        </View>
        <View style={s.stats}>
          <View style={s.statCard}>
            <Text style={s.statNum}>{agendadas.length}</Text>
            <Text style={s.statLabel}>agendadas</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statNum}>{consultas.filter(c => c.status === 'concluida').length}</Text>
            <Text style={s.statLabel}>concluídas</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.sectionTitle}>Próximo atendimento</Text>
        {proxima ? (
          <View style={s.nextCard}>
            <View style={s.timeBadge}>
              <Text style={s.timeText}>{proxima.horario}</Text>
            </View>
            <Text style={s.nextPet}>{proxima.nomePet}</Text>
            <Text style={s.nextBreed}>Tutor: {proxima.nomeVet}</Text>
            <Text style={s.nextReason}>{proxima.motivo}</Text>
            <View style={[s.statusChip, { backgroundColor: COLORS.card[0] }]}>
              <Text style={[s.statusChipText, { color: COLORS.cardText[0] }]}>{proxima.data}</Text>
            </View>
          </View>
        ) : (
          <View style={s.emptyCard}>
            <Ionicons name="calendar-outline" size={40} color={COLORS.gray['400']} />
            <Text style={s.emptyText}>Nenhum atendimento agendado</Text>
            <Text style={s.emptySubText}>Consultas agendadas pelos tutores aparecerão aqui</Text>
          </View>
        )}

        <Text style={s.sectionTitle}>Agenda do dia</Text>
        {agendadas.length === 0 ? (
          <View style={s.emptyCard}>
            <Ionicons name="time-outline" size={36} color={COLORS.gray['400']} />
            <Text style={s.emptyText}>Sem consultas para hoje</Text>
          </View>
        ) : (
          agendadas.map((a, i) => (
            <View key={a.id} style={[s.agendaItem, { borderLeftColor: COLORS.card[i % COLORS.card.length] }]}>
              <Ionicons name="time-outline" size={16} color={COLORS.secondary['500']} />
              <Text style={s.agendaText}>
                {a.horario}  {a.nomePet} — {a.motivo}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
