import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { salvarUsuario } from '../../data/storage';
import { profileStyles as s } from '../../styles/tutor/profile.styles';
import { COLORS } from '../../styles/colors';

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

  function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => sair() },
    ]);
  }

  useEffect(() => {
    if (!usuario) router.replace('/auth/welcome');
  }, [usuario]);

  const initials = usuario?.nome?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() ?? '?';
  const roleLabel: Record<string, string> = { tutor: 'Tutor', vet: 'Veterinário', clinic: 'Clínica' };

  return (
    <View style={s.container}>
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={s.avatarSection}>
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

      <ScrollView contentContainerStyle={s.scrollContent}>
        {/* Conta */}
        <Text style={s.sectionTitle}>CONTA</Text>
        <View style={s.section}>
          <TouchableOpacity style={s.settingItem} onPress={() => { setNovoNome(usuario?.nome ?? ''); setEditModal(true); }}>
            <Ionicons name="person-outline" size={20} color={COLORS.secondary['500']} style={s.iconLeft} />
            <Text style={s.settingLabel}>Nome</Text>
            <Text style={s.settingValue}>{usuario?.nome}</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray['400']} />
          </TouchableOpacity>
          <View style={s.divider} />
          <TouchableOpacity style={s.settingItem} onPress={() => Alert.alert('E-mail', usuario?.email ?? '')}>
            <Ionicons name="mail-outline" size={20} color={COLORS.secondary['500']} style={s.iconLeft} />
            <Text style={s.settingLabel}>E-mail</Text>
            <Text style={s.settingValue}>{usuario?.email}</Text>
          </TouchableOpacity>
        </View>

        {/* Segurança */}
        <Text style={s.sectionTitle}>SEGURANÇA</Text>
        <View style={s.section}>
          <TouchableOpacity style={s.settingItem} onPress={() => Alert.alert('Em breve', 'Alteração de senha em desenvolvimento.')}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.secondary['500']} style={s.iconLeft} />
            <Text style={s.settingLabel}>Alterar senha</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray['400']} />
          </TouchableOpacity>
        </View>

        {/* Sobre */}
        <Text style={s.sectionTitle}>SOBRE</Text>
        <View style={s.section}>
          <TouchableOpacity style={s.settingItem} onPress={() => Alert.alert('Orbis', 'v1.0.0 — FIAP 2025')}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.secondary['500']} style={s.iconLeft} />
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
        <View style={s.modalOverlay}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Editar nome</Text>
            <TextInput value={novoNome} onChangeText={setNovoNome} style={s.modalInput} />
            <TouchableOpacity style={s.modalSaveBtn} onPress={handleSaveNome}>
              <Text style={s.modalSaveBtnText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModal(false)} style={s.modalCancelBtn}>
              <Text style={s.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default ProfileScreen;
