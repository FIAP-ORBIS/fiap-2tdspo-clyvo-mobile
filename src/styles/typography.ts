import { COLORS } from './colors';
export const FONTS = {
  h1: { fontSize: 32, fontWeight: '700' as const, color: COLORS.secondary['500'] },
  h2: { fontSize: 24, fontWeight: '700' as const, color: COLORS.secondary['500'] },
  h3: { fontSize: 20, fontWeight: '600' as const, color: COLORS.secondary['500'] },
  subtitle: { fontSize: 16, fontWeight: '500' as const, color: COLORS.secondary['400'] },
  body: { fontSize: 14, fontWeight: '400' as const, color: COLORS.secondary['500'] },
  caption: { fontSize: 12, fontWeight: '400' as const, color: COLORS.secondary['400'] },
  label: { fontSize: 13, fontWeight: '500' as const, color: COLORS.secondary['400'] },
  buttonPrimary: { fontSize: 16, fontWeight: '600' as const, color: '#FFFFFF' },
  buttonSecondary: { fontSize: 16, fontWeight: '600' as const, color: COLORS.secondary['500'] },
};
