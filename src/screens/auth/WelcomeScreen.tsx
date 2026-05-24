import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { welcomeStyles as s } from '../../styles/auth/welcome.styles';
import { Button } from '../../components/Button';

export function WelcomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={s.ellipseTop} />
      <View style={s.container}>
        <View style={s.logoCircle}>
          <Text style={s.logoLetter}>O</Text>
        </View>
        <Text style={s.brand}>Orbis</Text>
        <Text style={s.heading}>Bem-vindo</Text>
        <Text style={s.subtitle}>O que vamos fazer hoje?</Text>
        <View style={s.actionsGap}>
          <Button title="Entrar" onPress={() => router.push('/auth/login')} />
          <Button
            title="Criar conta"
            variant="secondary"
            onPress={() => router.push('/auth/role-select')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
