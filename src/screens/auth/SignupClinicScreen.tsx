import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { signupStyles as s } from '../../styles/auth/signup.styles';
import { globalStyles } from '../../styles/global.styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { loginMock } from '../../services/auth';

function validarEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function validarCNPJ(v: string) {
  return v.replace(/\D/g, '').length === 14;
}

type Erros1 = { nomeClinica?: string; email?: string; cnpj?: string };
type Erros2 = { senha?: string };

export function SignupClinicScreen() {
  const router = useRouter();
  const { entrar } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nomeClinica, setNomeClinica] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [erros1, setErros1] = useState<Erros1>({});
  const [erros2, setErros2] = useState<Erros2>({});

  async function handleFinish() {
    const usuario = await loginMock(email.trim(), nomeClinica.trim(), 'clinic');
    await entrar({ ...usuario, cnpj: cnpj.replace(/\D/g, '') });
    router.replace('/(clinic)/dashboard');
  }

  function handleStep1() {
    const e: Erros1 = {};
    if (!nomeClinica.trim()) e.nomeClinica = 'Nome da clínica obrigatório';
    if (!email.trim()) e.email = 'E-mail obrigatório';
    else if (!validarEmail(email)) e.email = 'E-mail inválido';
    if (!cnpj.trim()) e.cnpj = 'CNPJ obrigatório';
    else if (!validarCNPJ(cnpj)) e.cnpj = 'CNPJ deve ter 14 dígitos';
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
            <Text style={s.title}>Sobre sua clínica</Text>
            <Text style={s.subtitle}>Dados da instituição.</Text>
            <Input label="Nome da clínica *" value={nomeClinica} onChangeText={t => { setNomeClinica(t); setErros1(e => ({ ...e, nomeClinica: undefined })); }} placeholder="Clínica VetCare" error={erros1.nomeClinica} />
            <Input label="E-mail *" value={email} onChangeText={t => { setEmail(t); setErros1(e => ({ ...e, email: undefined })); }} keyboardType="email-address" autoCapitalize="none" placeholder="contato@clinica.com" error={erros1.email} />
            <Input label="CNPJ * (14 dígitos)" value={cnpj} onChangeText={t => { setCnpj(t); setErros1(e => ({ ...e, cnpj: undefined })); }} keyboardType="number-pad" placeholder="00.000.000/0001-00" maxLength={18} error={erros1.cnpj} />
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
            <Text style={s.successTitle}>Clínica cadastrada!</Text>
            <Text style={s.successSub}>Complete as informações de atendimento no Perfil.</Text>
            <Button title="Acessar painel" onPress={handleFinish} style={s.btn} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignupClinicScreen;
