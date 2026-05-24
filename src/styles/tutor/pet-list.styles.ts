import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const petListStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.gray['100'] },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, backgroundColor: COLORS.white },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.secondary['500'] },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary['500'], paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.full, gap: 4 },
  addBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
  list: { padding: SPACING.md, paddingBottom: 100 },
  row: { justifyContent: 'space-between', marginBottom: SPACING.sm },
  card: { flex: 1, flexDirection: 'column', gap: "2px", borderRadius: BORDER_RADIUS.md, padding: SPACING.md, alignItems: 'center', paddingTop: SPACING.lg },
  photoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm, overflow: 'hidden' },
  photoImg: { width: 80, height: 80, borderRadius: 40 },
  emoji: { fontSize: 40 },
  heart: { position: 'absolute', top: SPACING.sm, right: SPACING.sm },
  petName: { fontSize: 16, fontWeight: '800', textAlign: 'center' },
  petBreed: { fontSize: 12, textAlign: 'center', marginTop: 2, opacity: 0.8 },
  petInfo: { fontSize: 12, textAlign: 'center', marginTop: 4, fontWeight: '600', opacity: 0.7 },
  empty: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: SPACING.lg },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: COLORS.secondary['500'], marginTop: SPACING.md },
  emptyText: { fontSize: 14, color: COLORS.gray['400'], marginTop: SPACING.xs },
  emptyBtn: { marginTop: SPACING.lg, backgroundColor: COLORS.primary['500'], paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full },
  emptyBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
});
