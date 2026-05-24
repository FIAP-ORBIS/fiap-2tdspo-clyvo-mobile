import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const profileStyles = StyleSheet.create({
  header: { backgroundColor: COLORS.secondary['500'] },
  avatarContainer: { marginTop: SPACING.md, position: 'relative' },
  avatarCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.primary['500'], alignItems: 'center', justifyContent: 'center' },
  avatarImg: { width: 90, height: 90, borderRadius: 45 },
  avatarInitials: { fontSize: 34, fontWeight: '800', color: COLORS.white },
  cameraOverlay: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary['500'], alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.white },
  name: { fontSize: 22, fontWeight: '800', color: COLORS.white, marginTop: SPACING.sm },
  email: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  roleBadge: { backgroundColor: COLORS.primary['500'], paddingHorizontal: SPACING.md, paddingVertical: 4, borderRadius: BORDER_RADIUS.full, marginTop: SPACING.sm },
  roleBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: COLORS.gray['500'], marginTop: SPACING.lg, marginBottom: SPACING.xs, letterSpacing: 1 },
  section: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, overflow: 'hidden' },
  settingItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  settingLabel: { flex: 1, fontSize: 15, color: COLORS.secondary['500'] },
  settingValue: { fontSize: 14, color: COLORS.gray['400'], marginRight: SPACING.xs },
  divider: { height: 1, backgroundColor: COLORS.gray['100'], marginLeft: SPACING.md + 32 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary['050'], borderRadius: BORDER_RADIUS.lg, height: 52, gap: SPACING.sm, marginTop: SPACING.xl },
  logoutText: { color: COLORS.primary['500'], fontSize: 15, fontWeight: '700' },
});
