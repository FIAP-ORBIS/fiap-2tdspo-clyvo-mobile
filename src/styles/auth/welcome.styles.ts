import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const welcomeStyles = StyleSheet.create({
  ellipseTop: { position: 'absolute', width: 500, height: 400, borderRadius: 250, backgroundColor: COLORS.primary['050'], top: -120, left: -55 },
  container: { flex: 1, paddingHorizontal: SPACING.md, justifyContent: 'center' },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.secondary['500'], alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: SPACING.sm },
  logoLetter: { fontSize: 36, fontWeight: '800', color: '#FFFFFF' },
  brand: { textAlign: 'center', fontSize: 28, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: SPACING.xl },
  heading: { fontSize: 28, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: SPACING.xs },
  subtitle: { fontSize: 16, color: COLORS.secondary['400'], marginBottom: SPACING.xl },
  actionsGap: { gap: SPACING.md },
});
