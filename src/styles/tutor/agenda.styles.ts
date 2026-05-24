import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const agendaStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.secondary['500'] },
  addBtn: { backgroundColor: COLORS.primary['500'], paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.full },
  addBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  list: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  aptCard: { backgroundColor: '#F8F8F8', borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, flexDirection: 'row', gap: SPACING.md, alignItems: 'center' },
  datebox: { width: 48, height: 48, backgroundColor: COLORS.primary['050'], borderRadius: BORDER_RADIUS.sm, alignItems: 'center', justifyContent: 'center' },
  dateboxDay: { fontSize: 18, fontWeight: '700', color: COLORS.primary['500'] },
  dateboxMonth: { fontSize: 11, color: COLORS.primary['400'] },
  aptContent: { flex: 1 },
  aptTitle: { fontSize: 15, fontWeight: '600', color: COLORS.secondary['500'] },
  aptSub: { fontSize: 12, color: COLORS.secondary['400'], marginTop: 2 },
  badge: { paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.tertiary['050'] },
  badgeText: { fontSize: 11, color: COLORS.tertiary['600'], fontWeight: '500' },
  empty: { textAlign: 'center', color: COLORS.secondary['400'], marginTop: 60, fontSize: 15 },
});
