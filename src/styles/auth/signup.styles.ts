import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const signupStyles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.md, marginBottom: SPACING.xl },
  back: { fontSize: 24, color: COLORS.secondary['500'], marginRight: SPACING.sm },
  stepLabel: { flex: 1, fontSize: 14, color: COLORS.secondary['400'] },
  progress: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E0E0E0' },
  dotActive: { backgroundColor: COLORS.primary['200'] },
  dotCurrent: { width: 24, backgroundColor: COLORS.primary['500'] },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: SPACING.xs },
  subtitle: { fontSize: 15, color: COLORS.secondary['400'], marginBottom: SPACING.xl },
  btn: { marginTop: SPACING.sm },
  validationGap: { gap: SPACING.xs, marginBottom: SPACING.lg },
  valItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  valDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E0E0E0' },
  valDotOk: { backgroundColor: '#4CAF50' },
  valText: { fontSize: 13, color: COLORS.secondary['400'] },
  successContainer: { flex: 1, alignItems: 'center', paddingTop: SPACING.xxl },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary['050'], alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg },
  check: { fontSize: 40, color: COLORS.primary['500'] },
  successTitle: { fontSize: 28, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: SPACING.md },
  successSub: { fontSize: 15, color: COLORS.secondary['400'], textAlign: 'center', marginBottom: SPACING.xl, lineHeight: 22 },
});
