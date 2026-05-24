import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { loginStyles as s } from '../../styles/auth/login.styles';
import { globalStyles } from '../../styles/global.styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { loginMock } from '../../services/auth';

export function LoginScreen() {
  const router = useRouter();
  const { entrar } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, informe seu e-mail.');
      return;
    }
    if (!senha.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, informe sua senha.');
      return;
    }
    setCarregando(true);
    try {
      const usuario = await loginMock(email.trim(), email.split('@')[0], 'tutor');
      await entrar(usuario);
      router.replace('/(tutor)/explorar');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.container}>
          <TouchableOpacity style={s.back} onPress={() => router.back()}>
            <Text style={s.backText}>←</Text>
          </TouchableOpacity>
          <Text style={s.title}>Entrar</Text>
          <Text style={s.subtitle}>Bem-vindo de volta.</Text>
          <Input
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="seu@email.com"
          />
          <Input
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            showToggle
            placeholder="••••••••"
          />
          <TouchableOpacity>
            <Text style={s.forgotLink}>Esqueci a senha</Text>
          </TouchableOpacity>
          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={carregando}
            style={s.btn}
          />
          <TouchableOpacity
            style={s.signupRow}
            onPress={() => router.push('/auth/role-select')}
          >
            <Text style={s.signupText}>
              Não tem conta?{' '}
              <Text style={s.signupLink}>Criar conta</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
