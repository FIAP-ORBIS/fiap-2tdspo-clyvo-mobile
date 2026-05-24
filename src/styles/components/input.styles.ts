import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const inputStyles = StyleSheet.create({
  wrapper: { marginBottom: SPACING.md },
  label: { fontSize: 13, fontWeight: '500', color: COLORS.secondary['400'], marginBottom: SPACING.xs },
  input: { borderWidth: 1.5, borderColor: '#E5E5E5', borderRadius: BORDER_RADIUS.md, height: 56, paddingHorizontal: SPACING.md, fontSize: 16, color: COLORS.secondary['500'], backgroundColor: '#FAFAFA' },
  inputFocused: { borderColor: COLORS.primary['500'], backgroundColor: '#FFFFFF' },
  inputError: { borderColor: COLORS.primary['500'] },
  toggle: { position: 'absolute', right: SPACING.md, top: 0, height: 56, justifyContent: 'center' },
  toggleText: { color: COLORS.primary['500'], fontWeight: '500', fontSize: 13 },
  error: { color: COLORS.primary['500'], fontSize: 12, marginTop: 4 },
});
