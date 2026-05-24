import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getConsultasCache, cacheConsultas, getPetsCache } from '../../data/storage';
import { IConsulta } from '../../interfaces/IPet';
import { IPet } from '../../interfaces/IPet';
import { consultasStyles as s } from '../../styles/tutor/consultas.styles';
import { COLORS } from '../../styles/colors';

type TabType = 'historico' | 'agendar';

export function ConsultasScreen() {
  const [tab, setTab] = useState<TabType>('historico');
  const [consultas, setConsultas] = useState<IConsulta[]>([]);
  const [pets, setPets] = useState<IPet[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoModal, setTipoModal] = useState<'presencial' | 'teleconsulta'>('presencial');

  // form fields
  const [nomePet, setNomePet] = useState('');
  const [nomeVet, setNomeVet] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [motivo, setMotivo] = useState('');

  useFocusEffect(
    useCallback(() => {
      getConsultasCache().then(setConsultas);
      getPetsCache().then(setPets);
    }, [])
  );

  function resetForm() {
    setNomePet('');
    setNomeVet('');
    setData('');
    setHorario('');
    setMotivo('');
  }

  async function handleAgendar() {
    if (!nomePet || !data || !horario || !motivo) {
      Alert.alert('Atenção', 'Preencha nome do pet, data, horário e motivo.');
      return;
    }
    const nova: IConsulta = {
      id: 'con_' + Date.now(),
      petId:
        pets.find(p => p.nome.toLowerCase() === nomePet.toLowerCase())?.id ?? 'sem_pet',
      nomePet,
      nomeVet: nomeVet || 'A definir',
      nomeClinica: tipoModal === 'teleconsulta' ? 'Teleconsulta' : 'A definir',
      data,
      horario,
      motivo: tipoModal === 'teleconsulta' ? `[Teleconsulta] ${motivo}` : motivo,
      status: 'agendada',
    };
    const atualizadas = [...consultas, nova];
    await cacheConsultas(atualizadas);
    setConsultas(atualizadas);
    setModalVisible(false);
    resetForm();
    Alert.alert('Agendado!', 'Consulta adicionada com sucesso.');
  }

  function statusColor(status: string): { bg: string; text: string } {
    if (status === 'agendada') return { bg: COLORS.card[4], text: COLORS.cardText[4] };
    if (status === 'concluida') return { bg: COLORS.card[3], text: COLORS.cardText[3] };
    return { bg: COLORS.card[1], text: COLORS.cardText[1] };
  }

  const tabs: [TabType, string][] = [
    ['historico', 'Histórico'],
    ['agendar', 'Agendar'],
  ];

  return (
    <View style={s.container}>
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={s.headerRow}>
          <Text style={s.headerTitle}>Consultas</Text>
        </View>
        <View style={s.tabs}>
          {tabs.map(([val, label]) => (
            <TouchableOpacity
              key={val}
              style={[s.tab, tab === val && s.tabActive]}
              onPress={() => setTab(val)}
            >
              <Text style={[s.tabText, tab === val && s.tabTextActive]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      {tab === 'historico' ? (
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.sectionTitle}>Todas as consultas</Text>
          {consultas.length === 0 ? (
            <View style={s.empty}>
              <Ionicons name="calendar-outline" size={40} color={COLORS.gray['300']} />
              <Text style={s.emptyText}>Nenhuma consulta registrada.</Text>
            </View>
          ) : (
            consultas.map((c, idx) => {
              const sc = statusColor(c.status);
              return (
                <View key={c.id} style={s.card}>
                  <View style={s.cardRow}>
                    <View
                      style={[
                        s.dateBox,
                        { backgroundColor: COLORS.card[idx % COLORS.card.length] },
                      ]}
                    >
                      <Text
                        style={[
                          s.dateDay,
                          { color: COLORS.cardText[idx % COLORS.cardText.length] },
                        ]}
                      >
                        {c.data.split(' ')[0]}
                      </Text>
                      <Text
                        style={[
                          s.dateMon,
                          { color: COLORS.cardText[idx % COLORS.cardText.length] },
                        ]}
                      >
                        {c.data.split(' ')[1] ?? ''}
                      </Text>
                    </View>
                    <View style={s.cardContent}>
                      <Text style={s.cardTitle}>{c.motivo}</Text>
                      <Text style={s.cardSub}>
                        {c.nomePet} · {c.horario} · {c.nomeVet}
                      </Text>
                      <View style={[s.cardBadge, { backgroundColor: sc.bg }]}>
                        <Text style={[s.cardBadgeText, { color: sc.text }]}>
                          {c.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      ) : (
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={s.scheduleBtn}
            onPress={() => {
              setTipoModal('presencial');
              setModalVisible(true);
            }}
          >
            <Ionicons name="calendar" size={20} color={COLORS.white} />
            <Text style={s.scheduleBtnText}>Agendar Consulta Presencial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.teleBtn}
            onPress={() => {
              setTipoModal('teleconsulta');
              setModalVisible(true);
            }}
          >
            <Ionicons name="videocam" size={20} color={COLORS.white} />
            <Text style={s.teleBtnText}>Agendar Teleconsulta</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={s.modalOverlay}>
          <View style={s.modalSheet}>
            <Text style={s.modalTitle}>
              {tipoModal === 'teleconsulta' ? '📹 Teleconsulta' : '🏥 Consulta Presencial'}
            </Text>

            <Text style={s.modalLabel}>Nome do pet *</Text>
            <TextInput
              style={s.modalInput}
              value={nomePet}
              onChangeText={setNomePet}
              placeholder="Ex: Thor"
              placeholderTextColor={COLORS.gray['400']}
            />

            <Text style={s.modalLabel}>Veterinário</Text>
            <TextInput
              style={s.modalInput}
              value={nomeVet}
              onChangeText={setNomeVet}
              placeholder="Ex: Dr. Carlos"
              placeholderTextColor={COLORS.gray['400']}
            />

            <Text style={s.modalLabel}>Data *</Text>
            <TextInput
              style={s.modalInput}
              value={data}
              onChangeText={setData}
              placeholder="Ex: 15 Jun"
              placeholderTextColor={COLORS.gray['400']}
            />

            <Text style={s.modalLabel}>Horário *</Text>
            <TextInput
              style={s.modalInput}
              value={horario}
              onChangeText={setHorario}
              placeholder="Ex: 14:00"
              placeholderTextColor={COLORS.gray['400']}
            />

            <Text style={s.modalLabel}>Motivo *</Text>
            <TextInput
              style={s.modalInput}
              value={motivo}
              onChangeText={setMotivo}
              placeholder="Ex: Retorno, Vacina..."
              placeholderTextColor={COLORS.gray['400']}
            />

            <TouchableOpacity style={s.modalBtn} onPress={handleAgendar}>
              <Text style={s.modalBtnText}>Confirmar agendamento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.modalLimparBtn} onPress={resetForm}>
              <Text style={s.modalLimparText}>Limpar campos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={s.modalCancelBtn}
              onPress={() => {
                setModalVisible(false);
                resetForm();
              }}
            >
              <Text style={s.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ConsultasScreen;
