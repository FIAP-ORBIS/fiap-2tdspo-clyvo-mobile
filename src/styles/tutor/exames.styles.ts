import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const examesStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray['100'] },
  header: { backgroundColor: COLORS.secondary['500'], paddingBottom: SPACING.md },
  headerRow: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  headerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.white },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: 100 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.secondary['500'], marginBottom: SPACING.sm, marginTop: SPACING.md },
  actionCard: { borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  actionIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  actionContent: { flex: 1 },
  actionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  actionSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  actionArrow: { color: 'rgba(255,255,255,0.8)' },
  itemCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, flexDirection: 'row', alignItems: 'center', gap: SPACING.md, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  itemIconBox: { width: 44, height: 44, borderRadius: BORDER_RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: '700', color: COLORS.secondary['500'] },
  itemSub: { fontSize: 12, color: COLORS.gray['500'], marginTop: 2 },
  itemDate: { fontSize: 11, color: COLORS.gray['400'], marginTop: 2 },
  itemStatus: { paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  itemStatusText: { fontSize: 11, fontWeight: '600' },
  emptyText: { color: COLORS.gray['400'], fontSize: 14, paddingVertical: SPACING.sm },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: COLORS.white, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, padding: SPACING.lg, paddingBottom: 40 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.secondary['500'], marginBottom: SPACING.lg, textAlign: 'center' },
  modalLabel: { fontSize: 13, fontWeight: '600', color: COLORS.gray['500'], marginBottom: SPACING.xs },
  modalInput: { borderWidth: 1.5, borderColor: COLORS.gray['200'], borderRadius: BORDER_RADIUS.md, height: 52, paddingHorizontal: SPACING.md, fontSize: 15, color: COLORS.secondary['500'], backgroundColor: COLORS.gray['100'], marginBottom: SPACING.md },
  modalBtn: { backgroundColor: COLORS.primary['500'], borderRadius: BORDER_RADIUS.md, height: 54, alignItems: 'center', justifyContent: 'center', marginTop: SPACING.sm },
  modalBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  modalCancelBtn: { alignItems: 'center', marginTop: SPACING.sm, padding: SPACING.sm },
  modalCancelText: { color: COLORS.gray['500'], fontSize: 14 },
});
