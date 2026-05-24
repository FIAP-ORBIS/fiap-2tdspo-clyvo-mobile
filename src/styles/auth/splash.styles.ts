import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING } from '../spacing';

export const splashStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary['500'] },
  ellipseTopLeft: { position: 'absolute', width: 500, height: 500, borderRadius: 250, backgroundColor: COLORS.primary['500'], top: -200, left: -55, opacity: 0.7 },
  ellipseBottomRight: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: COLORS.primary['400'], bottom: -80, right: -30, opacity: 0.5 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 52, fontWeight: '800', color: '#FFFFFF', letterSpacing: 6 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: SPACING.sm, letterSpacing: 1 },
});
