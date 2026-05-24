import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import { teamStyles as s } from '../../styles/clinic/team.styles';

export function TeamScreen() {
  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={s.header}>
        <Text style={s.title}>Equipe</Text>
        <Text style={s.subtitle}>Gerencie seus veterinários</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.emptyState}>
          <Ionicons name="people-outline" size={64} color={COLORS.gray['200']} />
          <Text style={s.emptyTitle}>Nenhum veterinário cadastrado</Text>
          <Text style={s.emptySubtitle}>
            Convide veterinários para integrar sua equipe e gerenciar atendimentos
          </Text>
        </View>

        <TouchableOpacity
          style={s.inviteBtn}
          onPress={() => Alert.alert('Em breve', 'O convite de veterinários estará disponível em breve!')}
          activeOpacity={0.8}
        >
          <Ionicons name="person-add-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={s.inviteBtnText}>Convidar veterinário</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default TeamScreen;
