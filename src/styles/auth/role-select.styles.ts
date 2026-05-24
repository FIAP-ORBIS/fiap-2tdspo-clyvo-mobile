import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const roleSelectStyles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.md },
  back: { marginTop: SPACING.md, marginBottom: SPACING.xl },
  backText: { fontSize: 24, color: COLORS.secondary['500'] },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: SPACING.xs },
  subtitle: { fontSize: 15, color: COLORS.secondary['400'], marginBottom: SPACING.xl },
  cardsGap: { gap: SPACING.md },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.tertiary['400'], borderRadius: BORDER_RADIUS.md, padding: SPACING.lg, gap: SPACING.md },
  emojiCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary['050'], alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 22 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: 4 },
  cardDesc: { fontSize: 13, color: COLORS.secondary['400'] },
  arrow: { fontSize: 20, color: COLORS.secondary['400'] },
});
