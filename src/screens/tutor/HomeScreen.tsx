import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { getPetsCache } from '../../data/storage';
import { IPet } from '../../interfaces/IPet';
import { tutorHomeStyles as s } from '../../styles/tutor/home.styles';
import { PetCard } from '../../components/PetCard';
import { CONSULTAS_MOCK } from '../../data/mockData';

export function HomeScreen() {
  const router = useRouter();
  const { usuario } = useAuth();
  const [pets, setPets] = useState<IPet[]>([]);

  useEffect(() => {
    getPetsCache().then(setPets);
  }, []);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={s.header}>
        <View style={s.headerContent}>
          <View>
            <Text style={s.greeting}>Olá, {usuario?.nome ?? 'Marina'} 👋</Text>
            <Text style={s.greetingSub}>Como seu pet tá hoje?</Text>
          </View>
          <Text style={s.bell}>🔔</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <Text style={s.sectionTitle}>Seus pets</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.petsRow}
        >
          {pets.map(pet => (
            <PetCard
              key={pet.id}
              pet={pet}
              status={pet.ultimoScore && pet.ultimoScore > 50 ? 'attention' : 'ok'}
              onPress={() =>
                router.push({ pathname: '/(tutor)/pet/[id]', params: { id: pet.id } })
              }
            />
          ))}
          <TouchableOpacity
            style={s.addPetCard}
            onPress={() => router.push('/(tutor)/pet/new')}
          >
            <Text style={s.addPetPlus}>+</Text>
            <Text style={s.addPetLabel}>Novo pet</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={s.sectionTitle}>Ação rápida</Text>
        <TouchableOpacity
          style={s.quickActionCard}
          onPress={() =>
            pets[0] &&
            router.push({ pathname: '/(tutor)/pain-sense', params: { petId: pets[0].id } })
          }
          activeOpacity={0.85}
        >
          <Text style={s.qaIcon}>🔍</Text>
          <View style={s.qaContent}>
            <Text style={s.qaTitle}>Pain Sense</Text>
            <Text style={s.qaSub}>Como o {pets[0]?.nome ?? 'seu pet'} tá hoje?</Text>
          </View>
          <Text style={s.qaArrow}>→</Text>
        </TouchableOpacity>

        <Text style={s.sectionTitle}>Próximos compromissos</Text>
        {CONSULTAS_MOCK.map(apt => (
          <View key={apt.id} style={s.aptCard}>
            <View style={s.aptDate}>
              <Text style={s.aptDateDay}>{apt.data.split(' ')[0]}</Text>
              <Text style={s.aptDateMonth}>{apt.data.split(' ')[1]}</Text>
            </View>
            <View style={s.aptInfo}>
              <Text style={s.aptTitle}>
                {apt.motivo} — {apt.nomePet}
              </Text>
              <Text style={s.aptSub}>
                {apt.horario} · {apt.nomeVet} · {apt.nomeClinica}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
