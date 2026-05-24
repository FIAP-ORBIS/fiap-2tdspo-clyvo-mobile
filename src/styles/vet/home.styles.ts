import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const vetHomeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray['100'] },
  header: { backgroundColor: COLORS.secondary['500'] },
  headerContent: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  greeting: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  date: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  stats: { flexDirection: 'row', gap: SPACING.sm, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  statCard: { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: BORDER_RADIUS.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm },
  statNum: { fontSize: 28, fontWeight: '700', color: '#FFFFFF' },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  scroll: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.secondary['500'], marginTop: SPACING.lg, marginBottom: SPACING.sm },
  nextCard: { backgroundColor: '#FFFFFF', borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, gap: SPACING.sm, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  timeBadge: { backgroundColor: COLORS.secondary['500'] + '18', paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.sm, alignSelf: 'flex-start' },
  timeText: { color: COLORS.secondary['500'], fontWeight: '700', fontSize: 14 },
  nextPet: { fontSize: 18, fontWeight: '700', color: COLORS.secondary['500'] },
  nextBreed: { fontSize: 13, color: COLORS.gray['500'] },
  nextReason: { fontSize: 13, color: COLORS.gray['600'] },
  statusChip: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.sm, alignSelf: 'flex-start' },
  statusChipText: { fontSize: 12, fontWeight: '600' },
  emptyCard: { backgroundColor: '#FFFFFF', borderRadius: BORDER_RADIUS.lg, padding: SPACING.xl, alignItems: 'center', gap: SPACING.sm, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  emptyText: { fontSize: 15, fontWeight: '600', color: COLORS.gray['500'], textAlign: 'center' },
  emptySubText: { fontSize: 13, color: COLORS.gray['400'], textAlign: 'center' },
  agendaItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: '#FFFFFF', borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  agendaText: { fontSize: 14, color: COLORS.secondary['500'], flex: 1 },
});
