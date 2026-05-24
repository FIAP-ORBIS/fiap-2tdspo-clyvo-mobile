import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const clinicPetsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray['100'] },
  header: { backgroundColor: COLORS.tertiary['500'], paddingHorizontal: SPACING.md, paddingBottom: SPACING.lg },
  title: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginTop: SPACING.md },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  scroll: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: BORDER_RADIUS.md, padding: SPACING.sm, marginTop: SPACING.md,
    marginBottom: SPACING.sm, gap: SPACING.sm,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.secondary['500'] },
  petItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm,
    gap: SPACING.md, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4,
    elevation: 1, borderLeftWidth: 4,
  },
  petAvatarFallback: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: COLORS.secondary['500'] },
  breed: { fontSize: 13, color: COLORS.gray['500'], marginTop: 2 },
  detail: { fontSize: 12, color: COLORS.gray['400'], marginTop: 1 },
  emptyState: { alignItems: 'center', paddingVertical: 64 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.gray['500'], marginTop: 16 },
  emptySubtitle: { fontSize: 13, color: COLORS.gray['400'], marginTop: 4, textAlign: 'center', paddingHorizontal: 24 },
});
