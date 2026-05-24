import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { roleSelectStyles as s } from '../../styles/auth/role-select.styles';

const ROLES = [
  {
  
    titulo: 'Sou tutor',
    desc: 'Tenho um pet e quero acompanhar a saúde dele.',
    rota: '/auth/signup-tutor',
  },
  {
    
    titulo: 'Sou veterinário(a)',
    desc: 'Quero atender pets e acompanhar prontuários.',
    rota: '/auth/signup-vet',
  },
  {
   
    titulo: 'Sou clínica/hospital',
    desc: 'Gerencio equipe e pets vinculados.',
    rota: '/auth/signup-clinic',
  },
] as const;

export function RoleSelectScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={s.container}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Text style={s.backText}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Quem é você?</Text>
        <Text style={s.subtitle}>Escolha pra continuar.</Text>
        <View style={s.cardsGap}>
          {ROLES.map(role => (
            <TouchableOpacity
              key={role.rota}
              style={s.card}
              onPress={() => router.push(role.rota as any)}
              activeOpacity={0.85}
            >
              {/* <View style={s.emojiCircle}>
                <Text style={s.emoji}>{role.emoji}</Text>
              </View> */}
              <View style={s.cardContent}>
                <Text style={s.cardTitle}>{role.titulo}</Text>
                <Text style={s.cardDesc}>{role.desc}</Text>
              </View>
              <Text style={s.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RoleSelectScreen;
