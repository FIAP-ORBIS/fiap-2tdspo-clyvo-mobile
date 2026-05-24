import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const tutorHomeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { backgroundColor: COLORS.secondary['500'], paddingBottom: SPACING.xl },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  greeting: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' },
  greetingSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  bell: { fontSize: 22 },
  scroll: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.secondary['500'], marginTop: SPACING.lg, marginBottom: SPACING.sm },
  petsRow: { paddingVertical: SPACING.xs },
  addPetCard: { width: 156, borderRadius: BORDER_RADIUS.lg, backgroundColor: '#F8F8F8', alignItems: 'center', justifyContent: 'center', marginRight: SPACING.sm, minHeight: 172 },
  addPetPlus: { fontSize: 36, color: COLORS.primary['500'], marginBottom: SPACING.xs },
  addPetLabel: { fontSize: 14, color: COLORS.secondary['400'] },
  quickActionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, gap: SPACING.md },
  qaIcon: { fontSize: 28 },
  qaContent: { flex: 1 },
  qaTitle: { fontSize: 16, fontWeight: '600', color: COLORS.secondary['500'] },
  qaSub: { fontSize: 13, color: COLORS.secondary['400'], marginTop: 2 },
  qaArrow: { fontSize: 20, color: COLORS.secondary['400'] },
  aptCard: { flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, gap: SPACING.md, marginBottom: SPACING.sm },
  aptDate: { width: 44, height: 44, backgroundColor: COLORS.primary['050'], borderRadius: BORDER_RADIUS.sm, alignItems: 'center', justifyContent: 'center' },
  aptDateDay: { fontSize: 16, fontWeight: '700', color: COLORS.primary['500'] },
  aptDateMonth: { fontSize: 11, color: COLORS.primary['400'] },
  aptInfo: { flex: 1 },
  aptTitle: { fontSize: 15, fontWeight: '600', color: COLORS.secondary['500'] },
  aptSub: { fontSize: 13, color: COLORS.secondary['400'], marginTop: 2 },
});
