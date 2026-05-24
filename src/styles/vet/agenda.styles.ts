import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const vetAgendaStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray['100'] },
  header: { backgroundColor: COLORS.secondary['500'], paddingHorizontal: SPACING.md, paddingBottom: SPACING.lg },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.white, marginTop: SPACING.md },
  weekRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACING.sm },
  weekLabel: { fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
  scroll: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  dayTitle: { fontSize: 15, fontWeight: '700', color: COLORS.gray['600'], marginTop: SPACING.lg, marginBottom: SPACING.sm },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  timeCol: { alignItems: 'center', minWidth: 44 },
  time: { fontSize: 15, fontWeight: '700', color: COLORS.secondary['500'] },
  divider: { width: 2, alignSelf: 'stretch', backgroundColor: COLORS.gray['200'], borderRadius: 1 },
  cardInfo: { flex: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  petName: { fontSize: 16, fontWeight: '600', color: COLORS.secondary['500'] },
  statusBadge: { paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: BORDER_RADIUS.full },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' as const },
  reason: { fontSize: 13, color: COLORS.gray['500'], marginTop: 2 },
  tutor: { fontSize: 12, color: COLORS.gray['400'], marginTop: 2 },
  emptyState: { alignItems: 'center', paddingVertical: 48 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.gray['500'], marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: COLORS.gray['400'], marginTop: 4, textAlign: 'center', paddingHorizontal: 24 },
});
