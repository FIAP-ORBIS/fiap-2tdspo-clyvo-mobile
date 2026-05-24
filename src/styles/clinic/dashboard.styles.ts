import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const dashboardStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray['100'] },
  header: { backgroundColor: COLORS.tertiary['500'], paddingBottom: SPACING.xl },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  clinicName: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  clinicSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  scroll: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.secondary['500'], marginTop: SPACING.lg, marginBottom: SPACING.sm },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.xs },
  statCard: { flex: 1, minWidth: '45%', borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, gap: 4 },
  statNum: { fontSize: 28, fontWeight: '700' },
  statLabel: { fontSize: 12, lineHeight: 17 },
  emptySection: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: BORDER_RADIUS.lg, paddingVertical: SPACING.xl, paddingHorizontal: SPACING.md, gap: SPACING.sm, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: COLORS.gray['500'] },
  emptySubtitle: { fontSize: 13, color: COLORS.gray['400'], textAlign: 'center' },
});
