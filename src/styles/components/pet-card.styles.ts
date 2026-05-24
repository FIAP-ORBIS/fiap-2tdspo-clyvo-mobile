import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const petCardStyles = StyleSheet.create({
  card: { width: 156, borderRadius: BORDER_RADIUS.lg, backgroundColor: '#F8F8F8', padding: SPACING.sm, alignItems: 'flex-start', marginRight: SPACING.sm },
  emoji: { fontSize: 32, marginBottom: SPACING.sm },
  name: { fontSize: 16, fontWeight: '600', color: COLORS.secondary['500'], marginBottom: 2 },
  info: { fontSize: 13, color: COLORS.secondary['400'], marginBottom: SPACING.sm },
  badgeOk: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BORDER_RADIUS.full, backgroundColor: '#E8F5E9' },
  badgeAttention: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BORDER_RADIUS.full, backgroundColor: '#FFF3E0' },
  badgeTextOk: { fontSize: 12, fontWeight: '500', color: '#2E7D32' },
  badgeTextAttention: { fontSize: 12, fontWeight: '500', color: '#E65100' },
});
