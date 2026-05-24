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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { examesStyles as s } from '../../styles/tutor/exames.styles';
import { COLORS } from '../../styles/colors';

// ── Local types ──────────────────────────────────────────────────────────────

type ExameTipo = 'pedido' | 'exame' | 'vacina' | 'resultado';

interface IExameItem {
  id: string;
  tipo: ExameTipo;
  nomePet: string;
  descricao: string;
  data: string;
  status: 'pendente' | 'realizado' | 'agendado';
}

// ── Local storage helpers ────────────────────────────────────────────────────

const EXAMES_KEY = '@orbis:exames';

async function getExamesCache(): Promise<IExameItem[]> {
  const raw = await AsyncStorage.getItem(EXAMES_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function cacheExames(exames: IExameItem[]): Promise<void> {
  await AsyncStorage.setItem(EXAMES_KEY, JSON.stringify(exames));
}

// ── Action card config ───────────────────────────────────────────────────────

interface ActionConfig {
  tipo: ExameTipo;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  sub: string;
  bg: string;
}

const ACTIONS: ActionConfig[] = [
  {
    tipo: 'pedido',
    icon: 'document-text',
    title: 'Pedido Médico',
    sub: 'Registre solicitações do veterinário',
    bg: COLORS.card[0],
  },
  {
    tipo: 'exame',
    icon: 'flask',
    title: 'Agendar Exame',
    sub: 'Sangue, urina, ultrassom e mais',
    bg: COLORS.card[4],
  },
  {
    tipo: 'vacina',
    icon: 'medical',
    title: 'Vacinas',
    sub: 'Calendário vacinal e reforços',
    bg: COLORS.card[3],
  },
  {
    tipo: 'resultado',
    icon: 'share-social',
    title: 'Compartilhar Resultado',
    sub: 'Envie laudos ao seu veterinário',
    bg: COLORS.card[6],
  },
];

// ── Status helpers ───────────────────────────────────────────────────────────

function statusStyle(status: IExameItem['status']): { bg: string; text: string } {
  switch (status) {
    case 'realizado':
      return { bg: COLORS.card[3], text: COLORS.cardText[3] };
    case 'agendado':
      return { bg: COLORS.card[4], text: COLORS.cardText[4] };
    default:
      return { bg: COLORS.card[1], text: COLORS.cardText[1] };
  }
}

function iconBoxColor(tipo: ExameTipo): string {
  switch (tipo) {
    case 'pedido':
      return COLORS.card[0];
    case 'exame':
      return COLORS.card[4];
    case 'vacina':
      return COLORS.card[3];
    case 'resultado':
      return COLORS.card[6];
  }
}

function tipoLabel(tipo: ExameTipo): string {
  switch (tipo) {
    case 'pedido':
      return 'Pedido Médico';
    case 'exame':
      return 'Exame';
    case 'vacina':
      return 'Vacina';
    case 'resultado':
      return 'Resultado';
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export function ExamesScreen() {
  const [exames, setExames] = useState<IExameItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoAtivo, setTipoAtivo] = useState<ExameTipo>('exame');

  // form fields
  const [nomePet, setNomePet] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  useFocusEffect(
    useCallback(() => {
      getExamesCache().then(setExames);
    }, [])
  );

  function resetForm() {
    setNomePet('');
    setDescricao('');
    setData('');
  }

  function openModal(tipo: ExameTipo) {
    setTipoAtivo(tipo);
    setModalVisible(true);
  }

  async function handleSalvar() {
    if (!nomePet || !descricao || !data) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }
    const novo: IExameItem = {
      id: 'exm_' + Date.now(),
      tipo: tipoAtivo,
      nomePet,
      descricao,
      data,
      status: tipoAtivo === 'resultado' ? 'realizado' : 'agendado',
    };
    const atualizados = [novo, ...exames];
    await cacheExames(atualizados);
    setExames(atualizados);
    setModalVisible(false);
    resetForm();
    Alert.alert('Salvo!', `${tipoLabel(tipoAtivo)} registrado com sucesso.`);
  }

  function modalTitle(): string {
    switch (tipoAtivo) {
      case 'pedido':
        return 'Pedido Médico';
      case 'exame':
        return 'Agendar Exame';
      case 'vacina':
        return 'Vacinas';
      case 'resultado':
        return 'Compartilhar Resultado';
    }
  }

  function descricaoPlaceholder(): string {
    switch (tipoAtivo) {
      case 'pedido':
        return 'Ex: Hemograma completo, raio-X...';
      case 'exame':
        return 'Ex: Ultrassom abdominal';
      case 'vacina':
        return 'Ex: V10, Antirrábica...';
      case 'resultado':
        return 'Ex: Resultado do hemograma de Jun/2025';
    }
  }

  const actionCardBg = (action: ActionConfig) => action.bg;

  return (
    <View style={s.container}>
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={s.headerRow}>
          <Text style={s.headerTitle}>Exames & Vacinas</Text>
          <Text style={s.headerSub}>Gerencie a saúde preventiva dos seus pets</Text>
        </View>
      </SafeAreaView>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Action cards */}
        {ACTIONS.map(action => (
          <TouchableOpacity
            key={action.tipo}
            style={[s.actionCard, { backgroundColor: actionCardBg(action) }]}
            onPress={() => openModal(action.tipo)}
            activeOpacity={0.85}
          >
            <View style={s.actionIcon}>
              <Ionicons
                name={action.icon}
                size={24}
                color={COLORS.cardText[ACTIONS.indexOf(action) % COLORS.cardText.length]}
              />
            </View>
            <View style={s.actionContent}>
              <Text
                style={[
                  s.actionTitle,
                  { color: COLORS.cardText[ACTIONS.indexOf(action) % COLORS.cardText.length] },
                ]}
              >
                {action.title}
              </Text>
              <Text
                style={[
                  s.actionSub,
                  { color: COLORS.cardText[ACTIONS.indexOf(action) % COLORS.cardText.length] },
                ]}
              >
                {action.sub}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.cardText[ACTIONS.indexOf(action) % COLORS.cardText.length]}
            />
          </TouchableOpacity>
        ))}

        {/* Registered items list */}
        <Text style={s.sectionTitle}>Histórico</Text>

        {exames.length === 0 ? (
          <Text style={s.emptyText}>Nenhum registro ainda. Use as opções acima.</Text>
        ) : (
          exames.map((item, idx) => {
            const sc = statusStyle(item.status);
            return (
              <View key={item.id} style={s.itemCard}>
                <View
                  style={[
                    s.itemIconBox,
                    { backgroundColor: iconBoxColor(item.tipo) },
                  ]}
                >
                  <Ionicons
                    name={
                      item.tipo === 'pedido'
                        ? 'document-text'
                        : item.tipo === 'exame'
                        ? 'flask'
                        : item.tipo === 'vacina'
                        ? 'medical'
                        : 'share-social'
                    }
                    size={22}
                    color={COLORS.cardText[idx % COLORS.cardText.length]}
                  />
                </View>
                <View style={s.itemContent}>
                  <Text style={s.itemTitle}>{item.descricao}</Text>
                  <Text style={s.itemSub}>{item.nomePet} · {tipoLabel(item.tipo)}</Text>
                  <Text style={s.itemDate}>{item.data}</Text>
                </View>
                <View style={[s.itemStatus, { backgroundColor: sc.bg }]}>
                  <Text style={[s.itemStatusText, { color: sc.text }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={s.modalOverlay}>
          <View style={s.modalSheet}>
            <Text style={s.modalTitle}>{modalTitle()}</Text>

            <Text style={s.modalLabel}>Nome do pet *</Text>
            <TextInput
              style={s.modalInput}
              value={nomePet}
              onChangeText={setNomePet}
              placeholder="Ex: Thor"
              placeholderTextColor={COLORS.gray['400']}
            />

            <Text style={s.modalLabel}>
              {tipoAtivo === 'resultado' ? 'Descrição do resultado *' : 'Descrição *'}
            </Text>
            <TextInput
              style={s.modalInput}
              value={descricao}
              onChangeText={setDescricao}
              placeholder={descricaoPlaceholder()}
              placeholderTextColor={COLORS.gray['400']}
            />

            <Text style={s.modalLabel}>
              {tipoAtivo === 'resultado' ? 'Data do resultado *' : 'Data *'}
            </Text>
            <TextInput
              style={s.modalInput}
              value={data}
              onChangeText={setData}
              placeholder="Ex: 20 Jun 2025"
              placeholderTextColor={COLORS.gray['400']}
            />

            <TouchableOpacity style={s.modalBtn} onPress={handleSalvar}>
              <Text style={s.modalBtnText}>Salvar</Text>
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

export default ExamesScreen;
