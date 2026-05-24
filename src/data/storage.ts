import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../interfaces/IUser';
import { IPet, IConsulta, IEventoTimeline } from '../interfaces/IPet';

const KEYS = {
  USER: '@orbis:usuario',
  TOKEN: '@orbis:token',
  PETS: '@orbis:pets',
  CONSULTAS: '@orbis:consultas',
  TIMELINE: '@orbis:timeline',
};

// ── Migração / limpeza de dados antigos ─────────────────────
const STORAGE_VERSION = '3'; // incrementar sempre que for necessário limpar dados legados
const VERSION_KEY = '@orbis:version';

/**
 * Chamado na inicialização do app.
 * Se a versão do storage não coincidir com STORAGE_VERSION,
 * apaga pets, consultas e timeline (dados que podem conter lixo de sessões anteriores).
 * A sessão do usuário (login) é preservada.
 */
export async function checkAndMigrateStorage(): Promise<void> {
  const version = await AsyncStorage.getItem(VERSION_KEY);
  if (version !== STORAGE_VERSION) {
    await AsyncStorage.removeItem(KEYS.PETS);
    await AsyncStorage.removeItem(KEYS.CONSULTAS);
    await AsyncStorage.removeItem(KEYS.TIMELINE);
    await AsyncStorage.setItem(VERSION_KEY, STORAGE_VERSION);
  }
}

// ── Usuário ──────────────────────────────────────────────
export async function salvarUsuario(usuario: IUser): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER, JSON.stringify(usuario));
}

export async function getUsuario(): Promise<IUser | null> {
  const raw = await AsyncStorage.getItem(KEYS.USER);
  return raw ? JSON.parse(raw) : null;
}

export async function removerUsuario(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.USER);
}

// ── Token ─────────────────────────────────────────────────
export async function salvarToken(token: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.TOKEN, token);
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.TOKEN);
}

export async function removerToken(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.TOKEN);
}

// ── Pets ──────────────────────────────────────────────────
export async function cachePets(pets: IPet[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.PETS, JSON.stringify(pets));
}

export async function getPetsCache(): Promise<IPet[]> {
  const raw = await AsyncStorage.getItem(KEYS.PETS);
  return raw ? JSON.parse(raw) : [];
}

export async function salvarPet(pet: IPet): Promise<void> {
  const lista = await getPetsCache();
  const idx = lista.findIndex(p => p.id === pet.id);
  if (idx >= 0) lista[idx] = pet;
  else lista.push(pet);
  await cachePets(lista);
}

export async function removerPet(petId: string): Promise<void> {
  const lista = await getPetsCache();
  await cachePets(lista.filter(p => p.id !== petId));
}

// ── Consultas ─────────────────────────────────────────────
export async function cacheConsultas(consultas: IConsulta[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.CONSULTAS, JSON.stringify(consultas));
}

export async function getConsultasCache(): Promise<IConsulta[]> {
  const raw = await AsyncStorage.getItem(KEYS.CONSULTAS);
  return raw ? JSON.parse(raw) : [];
}

// ── Timeline ──────────────────────────────────────────────
export async function salvarEventoTimeline(evento: IEventoTimeline): Promise<void> {
  const raw = await AsyncStorage.getItem(KEYS.TIMELINE);
  const lista: IEventoTimeline[] = raw ? JSON.parse(raw) : [];
  lista.unshift(evento);
  await AsyncStorage.setItem(KEYS.TIMELINE, JSON.stringify(lista));
}

export async function getTimelinePet(petId: string): Promise<IEventoTimeline[]> {
  const raw = await AsyncStorage.getItem(KEYS.TIMELINE);
  const lista: IEventoTimeline[] = raw ? JSON.parse(raw) : [];
  return lista.filter(e => e.petId === petId);
}

// ── Limpar tudo ───────────────────────────────────────────
export async function clearAll(): Promise<void> {
  for (const key of Object.values(KEYS)) {
    await AsyncStorage.removeItem(key);
  }
}
