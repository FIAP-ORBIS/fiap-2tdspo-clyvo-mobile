import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getPetsCache } from '../../data/storage';
import { IPet } from '../../interfaces/IPet';
import { petListStyles as s } from '../../styles/tutor/pet-list.styles';
import { COLORS } from '../../styles/colors';

const { width } = Dimensions.get('window');
const COLS = 2;
const CARD_W = (width - 16 * 2 - 12) / COLS;

export function PetListScreen() {
  const router = useRouter();
  const [pets, setPets] = useState<IPet[]>([]);

  useFocusEffect(useCallback(() => { getPetsCache().then(setPets); }, []));

  function renderPet({ item, index }: { item: IPet; index: number }) {
    const bg = COLORS.card[index % COLORS.card.length];
    const textColor = COLORS.cardText[index % COLORS.cardText.length];
    return (
      <TouchableOpacity style={[s.card, { backgroundColor: bg, width: CARD_W }]} onPress={() => router.push({ pathname: '/(tutor)/pet/[id]', params: { id: item.id } })} activeOpacity={0.85}>
        <View style={s.photoCircle}>
          {item.foto
            ? <Image source={{ uri: item.foto }} style={s.photoImg} />
            : <Ionicons name="paw" size={30} color={COLORS.gray['300']} />}
        </View>
        <Ionicons name="heart-outline" size={18} color={textColor} style={s.heart} />
        <Text style={[s.petName, { color: textColor }]}>{item.nome}</Text>
        <Text style={[s.petBreed, { color: textColor }]}>{item.especie}</Text>
        <Text style={[s.petBreed, { color: textColor }]}>{item.raca}</Text>
        {item.peso ? <Text style={[s.petInfo, { color: textColor }]}>{item.peso} kg</Text> : null}
        
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={s.safe}>
      <View style={s.header}>
        <Text style={s.title}>Meus Pets</Text>
        <TouchableOpacity style={s.addBtn} onPress={() => router.push('/(tutor)/pet/new')}>
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={s.addBtnText}>Novo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={pets}
        keyExtractor={p => p.id}
        numColumns={COLS}
        contentContainerStyle={s.list}
        columnWrapperStyle={s.row}
        renderItem={renderPet}
        ListEmptyComponent={
          <View style={s.empty}>
            <Ionicons name="paw-outline" size={60} color={COLORS.gray['300']} />
            <Text style={s.emptyTitle}>Nenhum pet ainda</Text>
            <Text style={s.emptyText}>Adicione seu primeiro pet!</Text>
            <TouchableOpacity style={s.emptyBtn} onPress={() => router.push('/(tutor)/pet/new')}>
              <Text style={s.emptyBtnText}>+ Adicionar pet</Text>
            </TouchableOpacity>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
export default PetListScreen;
