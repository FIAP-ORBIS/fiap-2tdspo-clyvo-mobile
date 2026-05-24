import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const teamStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray['100'] },
  header: { backgroundColor: COLORS.tertiary['500'], paddingHorizontal: SPACING.md, paddingBottom: SPACING.lg },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.white, marginTop: SPACING.md },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  scroll: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  emptyState: { alignItems: 'center', paddingVertical: 64 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.gray['500'], marginTop: 16, textAlign: 'center' },
  emptySubtitle: { fontSize: 13, color: COLORS.gray['400'], marginTop: 8, textAlign: 'center', paddingHorizontal: 24 },
  inviteBtn: {
    backgroundColor: COLORS.tertiary['500'],
    borderRadius: BORDER_RADIUS.md,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  inviteBtnText: { fontSize: 15, color: COLORS.white, fontWeight: '600' },
  inviteBtnIcon: { marginRight: 8 },
});
