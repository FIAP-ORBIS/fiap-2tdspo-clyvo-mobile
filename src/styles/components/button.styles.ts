import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { BORDER_RADIUS } from '../spacing';

export const buttonStyles = StyleSheet.create({
  primary: { backgroundColor: COLORS.primary['500'], borderRadius: BORDER_RADIUS.md, height: 56, alignItems: 'center', justifyContent: 'center' },
  secondary: { backgroundColor: 'transparent', borderRadius: BORDER_RADIUS.md, height: 56, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: COLORS.secondary['500'] },
  ghost: { height: 48, alignItems: 'center', justifyContent: 'center' },
  outline: { backgroundColor: 'transparent', borderRadius: BORDER_RADIUS.md, height: 56, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: COLORS.primary['500'] },
  disabled: { opacity: 0.5 },
  textPrimary: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  textSecondary: { color: COLORS.secondary['500'], fontSize: 16, fontWeight: '600' },
  textGhost: { color: COLORS.secondary['500'], fontSize: 15, fontWeight: '500' },
  textOutline: { color: COLORS.primary['500'], fontSize: 16, fontWeight: '600' },
});
