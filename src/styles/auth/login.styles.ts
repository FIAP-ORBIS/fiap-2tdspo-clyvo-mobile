import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const loginStyles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.md },
  back: { marginTop: SPACING.md, marginBottom: SPACING.xl },
  backText: { fontSize: 24, color: COLORS.secondary['500'] },
  title: { fontSize: 28, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: SPACING.xs },
  subtitle: { fontSize: 15, color: COLORS.secondary['400'], marginBottom: SPACING.xl },
  forgotLink: { color: COLORS.primary['500'], fontSize: 14, marginTop: -8, marginBottom: SPACING.lg },
  btn: { marginTop: SPACING.sm },
  signupRow: { alignItems: 'center', marginTop: SPACING.lg },
  signupText: { fontSize: 14, color: COLORS.secondary['400'] },
  signupLink: { color: COLORS.primary['500'], fontWeight: '600' },
});
