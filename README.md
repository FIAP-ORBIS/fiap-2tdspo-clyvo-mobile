# Orbis

##  Integrantes
 
| Nome | RM | Turma |
| :--- | :--- | :--- |
| Diego Andrade | 566385 | 2TDSPO |
| Grazielle Alencar | 561529 | 2TDSPO |
| Julia Altino | 564870 | 2TDSPO |

---

## Sobre o Projeto

**Orbis** é a interface mobile da plataforma **Clyvo VET**, uma solução de saúde animal que conecta **tutores, veterinários e clínicas** em um único aplicativo, com IA sensorial para detectar o que o pet não pode dizer.

O Brasil tem mais de **160 milhões de pets** e mais de **70% dos animais com doenças crônicas vivem com dor não diagnosticada** (IVAPM). O Orbis ataca esse problema com **gestão de prontuário** e **continuidade de jornada de saúde** entre múltiplas clínicas.

### O que torna o Orbis diferente

- **Interface adaptativa:** o mesmo app reconhece o tipo de usuário no login e ajusta toda a experiência, tutor vê seus pets, veterinário vê pacientes do dia, gestor de clínica vê o dashboard operacional.
- **Multi-espécie:** suporta cães, gatos, aves, coelhos, roedores, répteis, peixes e exóticos.



## 🛠️ Tecnologias

| Categoria | Stack |
|---|---|
| Framework | React Native 0.83 · Expo SDK 55 |
| Linguagem | TypeScript 5.9 (strict mode) |
| Navegação | Expo Router · React Navigation (bottom-tabs + native-stack) |
| Persistência | `@react-native-async-storage/async-storage` |
| HTTP | Axios |
| UI | `@expo/vector-icons` · SafeAreaContext |
| Ícones | Ionicons (via Expo Vector Icons) |
| Câmera/Imagem | `expo-image-picker` |

---

##  Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- App **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) · [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/FIAP-ORBIS/fiap-2tdspo-clyvo-mobile.git
cd fiap-2tdspo-clyvo-mobile

# 2. Instale as dependências
npm install

# 3. Inicie o projeto
npx expo start
```

Depois disso:
- Pressione `a` para abrir no **emulador Android**
- Pressione `i` para abrir no **simulador iOS** (apenas macOS)
- Pressione `w` para abrir no **navegador**
- Ou escaneie o QR Code com o **Expo Go** no seu celular

---

## 📂 Estrutura do projeto

```
fiap-2tdspo-clyvo-mobile/
│
├── app/                              # ROTAS (Expo Router)
│   ├── _layout.tsx                   # Layout raiz + carregamento de fontes
│   ├── index.tsx                     # Splash + roteador adaptativo
│   ├── auth/                         # Fluxo de autenticação
│   │   ├── login.tsx
│   │   ├── welcome.tsx
│   │   ├── role-select.tsx           # Escolha do tipo de usuário
│   │   ├── signup-tutor.tsx
│   │   ├── signup-vet.tsx
│   │   └── signup-clinic.tsx
│   ├── (tutor)/                      # Bottom tabs do TUTOR
│   │   ├── home.tsx
│   │   ├── explorar.tsx
│   │   ├── consultas.tsx
│   │   ├── exames.tsx
│   │   ├── profile.tsx
│   │   ├── pets/index.tsx            # Listagem de pets
│   │   └── pet/[id].tsx              # Detalhes + edição de pet
│   ├── (vet)/                        # Bottom tabs do VETERINÁRIO
│   │   ├── home.tsx
│   │   ├── patients.tsx
│   │   ├── agenda.tsx
│   │   └── profile.tsx
│   └── (clinic)/                     # Bottom tabs da CLÍNICA
│       ├── dashboard.tsx
│       ├── team.tsx
│       ├── pets.tsx
│       ├── agenda.tsx
│       └── profile.tsx
│
├── src/
│   ├── screens/                      # Telas reais (UI)
│   │   ├── auth/                     # LoginScreen, RoleSelectScreen, etc.
│   │   ├── tutor/                    # HomeScreen, PetListScreen, PetDetailScreen, etc.
│   │   ├── vet/                      # HomeScreen, PatientsScreen, AgendaScreen, etc.
│   │   └── clinic/                   # DashboardScreen, TeamScreen, PetsScreen, etc.
│   │
│   ├── components/                   # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── PetCard.tsx
│   │
│   ├── styles/                       # StyleSheets separados (zero inline)
│   │   ├── colors.ts                 # Paleta semântica 050–700
│   │   ├── typography.ts             # Tokens de tipografia
│   │   ├── spacing.ts                # Tokens de espaçamento
│   │   ├── global.styles.ts
│   │   ├── auth/                     # Estilos por tela de auth
│   │   ├── tutor/                    # Estilos por tela do tutor
│   │   ├── vet/                      # Estilos por tela do vet
│   │   ├── clinic/                   # Estilos por tela da clínica
│   │   └── components/               # Estilos dos componentes
│   │
│   ├── interfaces/                   # Tipagem TypeScript
│   │   ├── IUser.ts                  # IUser, ILoginRequest, ISignup*
│   │   └── IPet.ts                   # IPet, IConsulta, IEventoTimeline
│   │
│   ├── data/                         # Camada de dados
│   │   ├── storage.ts                # AsyncStorage com migração
│   │   └── mockData.ts               # Dados de teste
│   │
│   ├── services/                     # Conexões com API
│   │   ├── api.ts                    # Instância axios
│   │   └── auth.ts                   # Login, signup, logout
│   │
│   └── context/                      # Context API
│       └── AuthContext.tsx           # Estado global de autenticação
│
├── App.tsx
├── app.json                          # Configuração do Expo
├── package.json
└── tsconfig.json                     # TypeScript strict mode
```


