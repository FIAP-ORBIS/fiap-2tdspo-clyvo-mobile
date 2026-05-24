import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const clinicAgendaStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray['100'] },
  header: { backgroundColor: COLORS.tertiary['500'], paddingHorizontal: SPACING.md, paddingBottom: SPACING.lg },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.white, marginTop: SPACING.md },
  weekRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACING.sm },
  weekLabel: { fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
  scroll: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  dayTitle: { fontSize: 15, fontWeight: '700', color: COLORS.gray['600'], marginTop: SPACING.lg, marginBottom: SPACING.sm },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  time: { fontSize: 14, fontWeight: '700', color: COLORS.tertiary['500'] },
  vetName: { fontSize: 13, color: COLORS.gray['500'] },
  petName: { fontSize: 16, fontWeight: '600', color: COLORS.secondary['500'] },
  reason: { fontSize: 13, color: COLORS.gray['500'], marginTop: 2 },
  tutor: { fontSize: 12, color: COLORS.gray['400'], marginTop: 2 },
  statusBadge: { paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: BORDER_RADIUS.full },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' as const },
  emptyState: { alignItems: 'center', paddingVertical: 48 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.gray['500'], marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: COLORS.gray['400'], marginTop: 4, textAlign: 'center', paddingHorizontal: 24 },
});
