import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { SPACING, BORDER_RADIUS } from './spacing';

export const globalStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { flexGrow: 1, paddingHorizontal: SPACING.md, paddingBottom: 100 },
  card: { backgroundColor: '#FFFFFF', borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  row: { flexDirection: 'row' as const, alignItems: 'center' as const },
  center: { justifyContent: 'center' as const, alignItems: 'center' as const },
  label: { fontSize: 13, fontWeight: '500' as const, color: COLORS.secondary['400'], marginBottom: SPACING.xs },
  sectionTitle: { fontSize: 18, fontWeight: '600' as const, color: COLORS.secondary['500'], marginTop: SPACING.lg, marginBottom: SPACING.sm },
  divider: { height: 1, backgroundColor: '#E5E5E5' },
  tealHeader: { backgroundColor: COLORS.secondary['500'], paddingBottom: SPACING.xl },
});
