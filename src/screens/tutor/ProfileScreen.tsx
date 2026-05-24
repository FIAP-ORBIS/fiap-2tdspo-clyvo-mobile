import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { salvarUsuario } from '../../data/storage';
import { profileStyles as s } from '../../styles/tutor/profile.styles';
import { COLORS } from '../../styles/colors';

const SPACING_MD = 16;

export function ProfileScreen() {
  const router = useRouter();
  const { usuario, entrar, sair } = useAuth();
  const [editModal, setEditModal] = useState(false);
  const [novoNome, setNovoNome] = useState(usuario?.nome ?? '');

  async function handlePickPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permissão necessária'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.8 });
    if (!result.canceled && result.assets[0] && usuario) {
      const atualizado = { ...usuario, foto: result.assets[0].uri };
      await salvarUsuario(atualizado);
      await entrar(atualizado);
    }
  }

  async function handleSaveNome() {
    if (!novoNome.trim() || !usuario) return;
    const atualizado = { ...usuario, nome: novoNome.trim() };
    await salvarUsuario(atualizado);
    await entrar(atualizado);
    setEditModal(false);
  }

  async function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: async () => { await sair(); router.replace('/auth/welcome'); } },
    ]);
  }

  const initials = usuario?.nome?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() ?? '?';
  const roleLabel: Record<string, string> = { tutor: 'Tutor', vet: 'Veterinário', clinic: 'Clínica' };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gray['100'] }}>
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={{ alignItems: 'center', paddingBottom: 24 }}>
          <TouchableOpacity onPress={handlePickPhoto} style={s.avatarContainer} activeOpacity={0.85}>
            {usuario?.foto
              ? <Image source={{ uri: usuario.foto }} style={s.avatarImg} />
              : <View style={s.avatarCircle}><Text style={s.avatarInitials}>{initials}</Text></View>}
            <View style={s.cameraOverlay}><Ionicons name="camera" size={16} color={COLORS.white} /></View>
          </TouchableOpacity>
          <Text style={s.name}>{usuario?.nome ?? 'Usuário'}</Text>
          <Text style={s.email}>{usuario?.email ?? ''}</Text>
          <View style={s.roleBadge}>
            <Text style={s.roleBadgeText}>{roleLabel[usuario?.tipo ?? 'tutor']}</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: SPACING_MD }}>
        {/* Conta */}
        <Text style={s.sectionTitle}>CONTA</Text>
        <View style={s.section}>
          <TouchableOpacity style={s.settingItem} onPress={() => { setNovoNome(usuario?.nome ?? ''); setEditModal(true); }}>
            <Ionicons name="person-outline" size={20} color={COLORS.secondary['500']} style={{ marginRight: 12 }} />
            <Text style={s.settingLabel}>Nome</Text>
            <Text style={s.settingValue}>{usuario?.nome}</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray['400']} />
          </TouchableOpacity>
          <View style={s.divider} />
          <TouchableOpacity style={s.settingItem} onPress={() => Alert.alert('E-mail', usuario?.email ?? '')}>
            <Ionicons name="mail-outline" size={20} color={COLORS.secondary['500']} style={{ marginRight: 12 }} />
            <Text style={s.settingLabel}>E-mail</Text>
            <Text style={s.settingValue}>{usuario?.email}</Text>
          </TouchableOpacity>
        </View>

        {/* Segurança */}
        <Text style={s.sectionTitle}>SEGURANÇA</Text>
        <View style={s.section}>
          <TouchableOpacity style={s.settingItem} onPress={() => Alert.alert('Em breve', 'Alteração de senha em desenvolvimento.')}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.secondary['500']} style={{ marginRight: 12 }} />
            <Text style={s.settingLabel}>Alterar senha</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray['400']} />
          </TouchableOpacity>
        </View>

        {/* Sobre */}
        <Text style={s.sectionTitle}>SOBRE</Text>
        <View style={s.section}>
          <TouchableOpacity style={s.settingItem} onPress={() => Alert.alert('Orbis', 'v1.0.0 — FIAP 2025')}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.secondary['500']} style={{ marginRight: 12 }} />
            <Text style={s.settingLabel}>Versão do app</Text>
            <Text style={s.settingValue}>1.0.0</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.primary['500']} />
          <Text style={s.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={editModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={{ backgroundColor: COLORS.white, borderRadius: 20, padding: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: COLORS.secondary['500'], marginBottom: 16 }}>Editar nome</Text>
            <TextInput value={novoNome} onChangeText={setNovoNome} style={{ borderWidth: 1.5, borderColor: COLORS.gray['200'], borderRadius: 12, height: 52, paddingHorizontal: 16, fontSize: 16, color: COLORS.secondary['500'], marginBottom: 16 }} />
            <TouchableOpacity style={{ backgroundColor: COLORS.primary['500'], borderRadius: 12, height: 52, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }} onPress={handleSaveNome}>
              <Text style={{ color: COLORS.white, fontWeight: '700', fontSize: 15 }}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModal(false)} style={{ alignItems: 'center', padding: 8 }}>
              <Text style={{ color: COLORS.gray['500'] }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default ProfileScreen;
