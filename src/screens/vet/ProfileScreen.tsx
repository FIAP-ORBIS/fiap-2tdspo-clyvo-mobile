import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { TipoAtendimento } from '../../interfaces/IUser';
import { COLORS } from '../../styles/colors';
import { vetProfileStyles as s } from '../../styles/vet/profile.styles';

const TIPOS: { value: TipoAtendimento; label: string; icon: React.ComponentProps<typeof Ionicons>['name'] }[] = [
  { value: 'presencial', label: 'Presencial', icon: 'location-outline' },
  { value: 'teleconsulta', label: 'Teleconsulta', icon: 'videocam-outline' },
  { value: 'ambos', label: 'Ambos', icon: 'globe-outline' },
];

export function ProfileScreen() {
  const router = useRouter();
  const { usuario, atualizarUsuario, sair } = useAuth();
  const [editando, setEditando] = useState(false);
  const [horario, setHorario] = useState(usuario?.horarioAtendimento ?? '');
  const [cidade, setCidade] = useState(usuario?.cidade ?? '');
  const [tipo, setTipo] = useState<TipoAtendimento>(usuario?.tipoAtendimento ?? 'presencial');
  const [erroHorario, setErroHorario] = useState('');
  const [erroCidade, setErroCidade] = useState('');

  async function handleSalvar() {
    let ok = true;
    if (!horario.trim()) { setErroHorario('Informe o horário de atendimento'); ok = false; }
    else setErroHorario('');
    if (!cidade.trim()) { setErroCidade('Informe a cidade'); ok = false; }
    else setErroCidade('');
    if (!ok) return;
    await atualizarUsuario({ horarioAtendimento: horario.trim(), cidade: cidade.trim(), tipoAtendimento: tipo });
    setEditando(false);
  }

  useEffect(() => {
    if (!usuario) router.replace('/auth/welcome');
  }, [usuario]);

  function handleSair() {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => sair() },
    ]);
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={s.avatarRow}>
          <View style={s.avatar}>
            <Ionicons name="person" size={40} color={COLORS.white} />
          </View>
          <View style={s.headerInfo}>
            <Text style={s.name}>Dr(a). {usuario?.nome ?? 'Veterinário'}</Text>
            <Text style={s.email}>{usuario?.email ?? ''}</Text>
            {usuario?.crmv ? (
              <View style={s.crmvBadge}><Text style={s.crmvText}>CRMV {usuario.crmv}</Text></View>
            ) : null}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Informações fixas */}
        <Text style={s.sectionTitle}>Informações</Text>
        <View style={s.infoCard}>
          {[
            { icon: 'mail-outline' as const, label: 'E-mail', value: usuario?.email ?? '—', color: 0 },
            { icon: 'ribbon-outline' as const, label: 'CRMV', value: usuario?.crmv ? `CRMV ${usuario.crmv}` : '—', color: 1 },
          ].map((row, i) => (
            <View key={row.label}>
              <View style={s.infoRow}>
                <View style={[s.iconBox, { backgroundColor: COLORS.card[row.color] }]}>
                  <Ionicons name={row.icon} size={18} color={COLORS.cardText[row.color]} />
                </View>
                <View>
                  <Text style={s.infoLabel}>{row.label}</Text>
                  <Text style={s.infoValue}>{row.value}</Text>
                </View>
              </View>
              {i === 0 && <View style={s.separator} />}
            </View>
          ))}
        </View>

        {/* Perfil de atendimento */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Atendimento</Text>
          <TouchableOpacity onPress={() => setEditando(!editando)}>
            <Text style={s.editLink}>{editando ? 'Cancelar' : 'Editar'}</Text>
          </TouchableOpacity>
        </View>

        {editando ? (
          <View style={s.editCard}>
            <Text style={s.fieldLabel}>Horário de atendimento *</Text>
            <TextInput
              style={[s.fieldInput, erroHorario ? s.fieldInputError : null]}
              placeholder="Ex: Seg-Sex 08h-18h"
              placeholderTextColor={COLORS.gray['400']}
              value={horario}
              onChangeText={t => { setHorario(t); setErroHorario(''); }}
            />
            {erroHorario ? <Text style={s.fieldError}>{erroHorario}</Text> : null}

            <Text style={s.fieldLabelGap}>Cidade *</Text>
            <TextInput
              style={[s.fieldInput, erroCidade ? s.fieldInputError : null]}
              placeholder="Ex: São Paulo - SP"
              placeholderTextColor={COLORS.gray['400']}
              value={cidade}
              onChangeText={t => { setCidade(t); setErroCidade(''); }}
            />
            {erroCidade ? <Text style={s.fieldError}>{erroCidade}</Text> : null}

            <Text style={s.fieldLabelGap}>Tipo de atendimento *</Text>
            <View style={s.tipoRow}>
              {TIPOS.map(t => (
                <TouchableOpacity
                  key={t.value}
                  style={[s.tipoBtn, tipo === t.value && s.tipoBtnActive]}
                  onPress={() => setTipo(t.value)}
                >
                  <Ionicons name={t.icon} size={16} color={tipo === t.value ? COLORS.white : COLORS.secondary['500']} />
                  <Text style={[s.tipoBtnText, tipo === t.value && s.tipoBtnTextActive]}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={s.saveBtn} onPress={handleSalvar} activeOpacity={0.85}>
              <Text style={s.saveBtnText}>Salvar alterações</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={s.infoCard}>
            {[
              { icon: 'time-outline' as const, label: 'Horário', value: usuario?.horarioAtendimento ?? 'Não informado', color: 2 },
              { icon: 'location-outline' as const, label: 'Cidade', value: usuario?.cidade ?? 'Não informado', color: 3 },
              { icon: 'globe-outline' as const, label: 'Tipo', value: usuario?.tipoAtendimento ? TIPOS.find(t => t.value === usuario.tipoAtendimento)?.label ?? '—' : 'Não informado', color: 4 },
            ].map((row, i, arr) => (
              <View key={row.label}>
                <View style={s.infoRow}>
                  <View style={[s.iconBox, { backgroundColor: COLORS.card[row.color % COLORS.card.length] }]}>
                    <Ionicons name={row.icon} size={18} color={COLORS.cardText[row.color % COLORS.cardText.length]} />
                  </View>
                  <View>
                    <Text style={s.infoLabel}>{row.label}</Text>
                    <Text style={s.infoValue}>{row.value}</Text>
                  </View>
                </View>
                {i < arr.length - 1 && <View style={s.separator} />}
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={s.logoutBtn} onPress={handleSair} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.white} style={s.logoutIcon} />
          <Text style={s.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
