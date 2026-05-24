import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IConsulta } from '../../interfaces/IPet';
import { agendaStyles as s } from '../../styles/tutor/agenda.styles';
import { CONSULTAS_MOCK } from '../../data/mockData';

const STATUS_LABELS: Record<string, string> = {
  agendada: 'Agendado',
  concluida: 'Concluído',
  cancelada: 'Cancelado',
};

function ConsultaItem({ item }: { item: IConsulta }) {
  return (
    <View style={s.aptCard}>
      <View style={s.datebox}>
        <Text style={s.dateboxDay}>{item.data.split(' ')[0]}</Text>
        <Text style={s.dateboxMonth}>{item.data.split(' ')[1]}</Text>
      </View>
      <View style={s.aptContent}>
        <Text style={s.aptTitle}>{item.motivo}</Text>
        <Text style={s.aptSub}>
          🐾 {item.nomePet} · {item.horario} · {item.nomeVet} · {item.nomeClinica}
        </Text>
        <View style={s.badge}>
          <Text style={s.badgeText}>{STATUS_LABELS[item.status] ?? item.status}</Text>
        </View>
      </View>
    </View>
  );
}

export function AgendaScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.title}>Agenda</Text>
        <TouchableOpacity
          style={s.addBtn}
          onPress={() => Alert.alert('Em breve', 'Agendamento online em breve!')}
        >
          <Text style={s.addBtnText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={CONSULTAS_MOCK}
        keyExtractor={item => item.id}
        contentContainerStyle={s.list}
        renderItem={({ item }) => <ConsultaItem item={item} />}
        ListEmptyComponent={
          <Text style={s.empty}>Nenhum compromisso agendado.</Text>
        }
      />
    </SafeAreaView>
  );
}

export default AgendaScreen;
