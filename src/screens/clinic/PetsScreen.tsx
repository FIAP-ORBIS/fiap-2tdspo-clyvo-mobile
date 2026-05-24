import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getConsultasCache } from '../../data/storage';
import { IConsulta } from '../../interfaces/IPet';
import { COLORS } from '../../styles/colors';
import { clinicPetsStyles as s } from '../../styles/clinic/pets.styles';

interface Paciente {
  petId: string;
  nomePet: string;
  totalConsultas: number;
  ultimaConsulta: string;
}

export function PetsScreen() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busca, setBusca] = useState('');

  useFocusEffect(useCallback(() => {
    getConsultasCache().then(consultas => {
      const map = new Map<string, Paciente>();
      consultas.forEach((c: IConsulta) => {
        const existing = map.get(c.petId);
        if (!existing) {
          map.set(c.petId, { petId: c.petId, nomePet: c.nomePet, totalConsultas: 1, ultimaConsulta: c.data });
        } else {
          map.set(c.petId, { ...existing, totalConsultas: existing.totalConsultas + 1 });
        }
      });
      setPacientes(Array.from(map.values()));
    });
  }, []));

  const filtrados = pacientes.filter(p =>
    p.nomePet.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={s.header}>
        <Text style={s.title}>Pacientes</Text>
        <Text style={s.subtitle}>{pacientes.length} pet{pacientes.length !== 1 ? 's' : ''} atendido{pacientes.length !== 1 ? 's' : ''}</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.gray['400']} />
          <TextInput
            style={s.searchInput}
            placeholder="Buscar por nome do pet..."
            placeholderTextColor={COLORS.gray['400']}
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        {filtrados.length === 0 ? (
          <View style={s.emptyState}>
            <Ionicons name="paw-outline" size={56} color={COLORS.gray['200']} />
            <Text style={s.emptyTitle}>
              {pacientes.length === 0 ? 'Nenhum paciente ainda' : 'Nenhum resultado'}
            </Text>
            <Text style={s.emptySubtitle}>
              {pacientes.length === 0
                ? 'Os pets aparecem aqui quando uma consulta é agendada'
                : 'Tente buscar com outro nome'}
            </Text>
          </View>
        ) : (
          filtrados.map((p, i) => (
            <TouchableOpacity
              key={p.petId}
              style={[s.petItem, { borderLeftColor: COLORS.card[i % COLORS.card.length] }]}
              activeOpacity={0.75}
            >
              <View style={[s.petAvatarFallback, { backgroundColor: COLORS.card[i % COLORS.card.length] }]}>
                <Ionicons name="paw" size={22} color={COLORS.cardText[i % COLORS.cardText.length]} />
              </View>
              <View style={s.info}>
                <Text style={s.name}>{p.nomePet}</Text>
                <Text style={s.breed}>Última consulta: {p.ultimaConsulta}</Text>
                <Text style={s.detail}>{p.totalConsultas} consulta{p.totalConsultas !== 1 ? 's' : ''}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray['400']} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default PetsScreen;
