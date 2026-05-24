import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { getPetsCache, getConsultasCache } from '../../data/storage';
import { IPet } from '../../interfaces/IPet';
import { IConsulta } from '../../interfaces/IPet';
import { explorarStyles as s } from '../../styles/tutor/explorar.styles';
import { COLORS } from '../../styles/colors';

export function ExplorarScreen() {
  const router = useRouter();
  const { usuario } = useAuth();
  const [pets, setPets] = useState<IPet[]>([]);
  const [consultas, setConsultas] = useState<IConsulta[]>([]);
  const [busca, setBusca] = useState('');

  useFocusEffect(useCallback(() => {
    getPetsCache().then(setPets);
    getConsultasCache().then(setConsultas);
  }, []));

  const petsFiltrados = pets.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.especie.toLowerCase().includes(busca.toLowerCase())
  );

  const proximasConsultas = consultas
    .filter(c => c.status === 'agendada')
    .slice(0, 3);

  return (
    <View style={s.container}>
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={s.headerTop}>
          <Text style={s.headerTitle}>Explorar</Text>
          <TouchableOpacity
            style={s.avatarBtn}
            onPress={() => router.push('/(tutor)/profile')}
          >
            <Ionicons name="person" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={s.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.gray['400']} />
          <TextInput
            style={s.searchInput}
            placeholder="Buscar pets, veterinários..."
            placeholderTextColor={COLORS.gray['400']}
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </SafeAreaView>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Seus Pets */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Seus pets</Text>
          <TouchableOpacity onPress={() => router.push('/(tutor)/pets')}>
            <Text style={s.seeAll}>Ver todos →</Text>
          </TouchableOpacity>
        </View>

        {petsFiltrados.length === 0 ? (
          <View style={s.emptyPets}>
            <Ionicons name="paw" size={40} color={COLORS.gray['300']} />
            <Text style={s.emptyText}>Nenhum pet cadastrado ainda.</Text>
            <TouchableOpacity
              style={s.emptyBtn}
              onPress={() => router.push('/(tutor)/pet/new')}
            >
              <Text style={s.emptyBtnText}>+ Adicionar pet</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={s.petsGrid}>
            {petsFiltrados.slice(0, 4).map((pet, idx) => (
              <TouchableOpacity
                key={pet.id}
                style={[s.petGridCard, { backgroundColor: COLORS.card[idx % COLORS.card.length] }]}
                onPress={() =>
                  router.push({ pathname: '/(tutor)/pet/[id]', params: { id: pet.id } })
                }
                activeOpacity={0.85}
              >
                <TouchableOpacity style={s.favoriteBtn}>
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color={COLORS.cardText[idx % COLORS.cardText.length]}
                  />
                </TouchableOpacity>
                <View style={s.petGridCardInner}>
                  <View style={s.petGridPhoto}>
                    {pet.foto ? (
                      <Image source={{ uri: pet.foto }} style={s.petGridPhotoImg} />
                    ) : (
                      <Text style={s.petGridEmoji}>{pet.emoji ?? '🐾'}</Text>
                    )}
                  </View>
                  <Text
                    style={[
                      s.petGridName,
                      { color: COLORS.cardText[idx % COLORS.cardText.length] },
                    ]}
                  >
                    {pet.nome}
                  </Text>
                  <Text
                    style={[
                      s.petGridInfo,
                      { color: COLORS.cardText[idx % COLORS.cardText.length] },
                    ]}
                  >
                    {pet.especie} · {pet.raca}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Próximas Consultas */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Consultas marcadas</Text>
          <TouchableOpacity onPress={() => router.push('/(tutor)/consultas')}>
            <Text style={s.seeAll}>Ver todas →</Text>
          </TouchableOpacity>
        </View>

        {proximasConsultas.length === 0 ? (
          <Text style={s.noDataText}>Nenhuma consulta agendada.</Text>
        ) : (
          <View style={s.aptRow}>
            {proximasConsultas.map((c, idx) => (
              <View key={c.id} style={s.aptCard}>
                <View
                  style={[
                    s.aptDateBox,
                    { backgroundColor: COLORS.card[idx % COLORS.card.length] },
                  ]}
                >
                  <Text
                    style={[
                      s.aptDateDay,
                      { color: COLORS.cardText[idx % COLORS.cardText.length] },
                    ]}
                  >
                    {c.data.split(' ')[0]}
                  </Text>
                  <Text
                    style={[
                      s.aptDateMon,
                      { color: COLORS.cardText[idx % COLORS.cardText.length] },
                    ]}
                  >
                    {c.data.split(' ')[1] ?? ''}
                  </Text>
                </View>
                <View style={s.aptContent}>
                  <Text style={s.aptTitle}>{c.motivo}</Text>
                  <Text style={s.aptSub}>
                    {c.nomePet} · {c.horario}
                  </Text>
                </View>
                <View
                  style={[
                    s.aptBadge,
                    { backgroundColor: COLORS.card[(idx + 2) % COLORS.card.length] },
                  ]}
                >
                  <Text
                    style={[
                      s.aptBadgeText,
                      { color: COLORS.cardText[(idx + 2) % COLORS.cardText.length] },
                    ]}
                  >
                    Agendada
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Seus Veterinários */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Seus veterinários</Text>
        </View>
        <Text style={s.noDataText}>Nenhum veterinário vinculado ainda.</Text>
      </ScrollView>
    </View>
  );
}

export default ExplorarScreen;
