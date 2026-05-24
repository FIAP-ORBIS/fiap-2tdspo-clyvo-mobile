import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { signupStyles as s } from '../../styles/auth/signup.styles';
import { globalStyles } from '../../styles/global.styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { loginMock } from '../../services/auth';

// ── helpers de validação ───────────────────────────────────
function validarEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function validarCPF(v: string) {
  return v.replace(/\D/g, '').length === 11;
}
function validarTelefone(v: string) {
  return v.replace(/\D/g, '').length >= 10;
}

type Erros1 = { nome?: string; email?: string; cpf?: string; telefone?: string };
type Erros2 = { senha?: string };

export function SignupTutorScreen() {
  const router = useRouter();
  const { entrar } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [erros1, setErros1] = useState<Erros1>({});
  const [erros2, setErros2] = useState<Erros2>({});

  async function handleFinish() {
    const usuario = await loginMock(email.trim(), nome.trim(), 'tutor');
    await entrar({ ...usuario, cpf: cpf.replace(/\D/g, ''), telefone });
    router.replace('/(tutor)/explorar');
  }

  function handleStep1() {
    const e: Erros1 = {};
    if (!nome.trim()) e.nome = 'Nome obrigatório';
    if (!email.trim()) e.email = 'E-mail obrigatório';
    else if (!validarEmail(email)) e.email = 'E-mail inválido';
    if (!cpf.trim()) e.cpf = 'CPF obrigatório';
    else if (!validarCPF(cpf)) e.cpf = 'CPF deve ter 11 dígitos';
    if (!telefone.trim()) e.telefone = 'Telefone obrigatório';
    else if (!validarTelefone(telefone)) e.telefone = 'Telefone inválido (mín. 10 dígitos)';
    setErros1(e);
    if (Object.keys(e).length === 0) setStep(2);
  }

  function handleStep2() {
    const e: Erros2 = {};
    if (!senha.trim()) e.senha = 'Senha obrigatória';
    else if (senha.length < 6) e.senha = 'Senha deve ter pelo menos 6 caracteres';
    setErros2(e);
    if (Object.keys(e).length === 0) setStep(3);
  }

  function handleBack() {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3);
    else router.back();
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={s.header}>
          <TouchableOpacity onPress={handleBack}>
            <Text style={s.back}>←</Text>
          </TouchableOpacity>
          <Text style={s.stepLabel}>Passo {step} de 3</Text>
          <View style={s.progress}>
            {([1, 2, 3] as const).map(n => (
              <View key={n} style={[s.dot, n <= step && s.dotActive, n === step && s.dotCurrent]} />
            ))}
          </View>
        </View>

        {step === 1 && (
          <>
            <Text style={s.title}>Vamos te conhecer</Text>
            <Text style={s.subtitle}>Preencha suas informações pessoais.</Text>
            <Input label="Nome completo *" value={nome} onChangeText={t => { setNome(t); setErros1(e => ({ ...e, nome: undefined })); }} placeholder="Marina Silva" error={erros1.nome} />
            <Input label="E-mail *" value={email} onChangeText={t => { setEmail(t); setErros1(e => ({ ...e, email: undefined })); }} keyboardType="email-address" autoCapitalize="none" placeholder="marina@email.com" error={erros1.email} />
            <Input label="CPF *" value={cpf} onChangeText={t => { setCpf(t); setErros1(e => ({ ...e, cpf: undefined })); }} keyboardType="number-pad" placeholder="000.000.000-00" maxLength={14} error={erros1.cpf} />
            <Input label="Telefone *" value={telefone} onChangeText={t => { setTelefone(t); setErros1(e => ({ ...e, telefone: undefined })); }} keyboardType="phone-pad" placeholder="(11) 99999-0000" error={erros1.telefone} />
            <Button title="Continuar →" onPress={handleStep1} style={s.btn} />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={s.title}>Crie sua senha</Text>
            <Text style={s.subtitle}>Mínimo de 6 caracteres.</Text>
            <Input label="Senha *" value={senha} onChangeText={t => { setSenha(t); setErros2(e => ({ ...e, senha: undefined })); }} secureTextEntry showToggle placeholder="••••••••" error={erros2.senha} />
            <Button title="Continuar →" onPress={handleStep2} style={s.btn} />
          </>
        )}

        {step === 3 && (
          <View style={s.successContainer}>
            <View style={s.checkCircle}><Text style={s.check}>✓</Text></View>
            <Text style={s.successTitle}>Conta criada!</Text>
            <Text style={s.successSub}>Agora cadastre seu pet na aba Pets.</Text>
            <Button title="Acessar o app" onPress={handleFinish} style={s.btn} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignupTutorScreen;
