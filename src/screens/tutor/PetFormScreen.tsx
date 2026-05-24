import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { salvarPet } from '../../data/storage';
import { IPet } from '../../interfaces/IPet';
import { Genero } from '../../interfaces/IPet';
import { petFormStyles as s } from '../../styles/tutor/pet-form.styles';
import { globalStyles } from '../../styles/global.styles';
import { COLORS } from '../../styles/colors';

export function PetFormScreen() {
  const router = useRouter();
  const { usuario } = useAuth();
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [genero, setGenero] = useState<Genero>('desconhecido');
  const [peso, setPeso] = useState('');
  const [cor, setCor] = useState('');
  const [foto, setFoto] = useState<string | undefined>();
  const [obs, setObs] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function handlePickPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setFoto(result.assets[0].uri);
    }
  }

  async function handleSalvar() {
    if (!nome.trim()) { Alert.alert('Atenção', 'O nome do pet é obrigatório.'); return; }
    if (!especie.trim()) { Alert.alert('Atenção', 'A espécie é obrigatória.'); return; }
    setSalvando(true);
    
    const pet: IPet = {
      id: 'pet_' + Date.now(),
      tutorId: usuario?.id ?? 'sem_tutor',
      nome: nome.trim(),
      especie: especie.trim(),
      raca: raca.trim(),
      genero,
      idade: '',
      peso: peso.trim(),
      cor: cor.trim(),
      notasSaude: obs.trim(),
      foto,
    };
    await salvarPet(pet);
    setSalvando(false);
    router.back();
  }

  const generos: { label: string; value: Genero }[] = [
    { label: 'Macho', value: 'macho' },
    { label: 'Fêmea', value: 'femea' },
    { label: 'Desconhecido', value: 'desconhecido' },
  ];

  return (
    <SafeAreaView edges={['top']} style={globalStyles.safeArea}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.secondary['500']} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Cadastrar Pet</Text>
        </View>

        {/* Foto */}
        <TouchableOpacity style={s.photoContainer} onPress={handlePickPhoto} activeOpacity={0.8}>
          {foto
            ? <Image source={{ uri: foto }} style={s.photoImage} />
            : (
              <View style={s.photoPlaceholder}>
                <Ionicons name="camera" size={32} color={COLORS.gray['400']} />
                <Text style={s.photoText}>Adicionar foto</Text>
              </View>
            )}
        </TouchableOpacity>

        {/* Campos */}
        <View style={s.form}>
          <Text style={s.label}>Nome *</Text>
          <TextInput style={s.input} value={nome} onChangeText={setNome} placeholder="Ex: Thor" placeholderTextColor={COLORS.gray['400']} />

          <Text style={s.label}>Espécie *</Text>
          <TextInput style={s.input} value={especie} onChangeText={setEspecie} placeholder="Ex: Cachorro, Gato..." placeholderTextColor={COLORS.gray['400']} />

          <Text style={s.label}>Raça</Text>
          <TextInput style={s.input} value={raca} onChangeText={setRaca} placeholder="Ex: Labrador" placeholderTextColor={COLORS.gray['400']} />

          <Text style={s.label}>Gênero</Text>
          <View style={s.generoRow}>
            {generos.map(g => (
              <TouchableOpacity
                key={g.value}
                style={[s.generoBtn, genero === g.value && s.generoBtnActive]}
                onPress={() => setGenero(g.value)}
              >
                <Text style={[s.generoText, genero === g.value && s.generoTextActive]}>{g.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={s.rowFields}>
            <View style={s.halfField}>
              <Text style={s.label}>Peso (kg)</Text>
              <TextInput style={s.input} value={peso} onChangeText={setPeso} placeholder="Ex: 8.5" keyboardType="numeric" placeholderTextColor={COLORS.gray['400']} />
            </View>
            <View style={s.halfField}>
              <Text style={s.label}>Cor</Text>
              <TextInput style={s.input} value={cor} onChangeText={setCor} placeholder="Ex: Marrom" placeholderTextColor={COLORS.gray['400']} />
            </View>
          </View>

          <Text style={s.label}>Observações</Text>
          <TextInput style={[s.input, s.textArea]} value={obs} onChangeText={setObs} placeholder="Alergias, condições especiais..." placeholderTextColor={COLORS.gray['400']} multiline numberOfLines={3} textAlignVertical="top" />

          <TouchableOpacity style={s.saveBtn} onPress={handleSalvar} disabled={salvando} activeOpacity={0.85}>
            <Ionicons name="paw" size={20} color={COLORS.white} />
            <Text style={s.saveBtnText}>{salvando ? 'Salvando...' : 'Salvar pet'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default PetFormScreen;
