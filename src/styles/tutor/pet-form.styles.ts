import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { SPACING, BORDER_RADIUS } from '../spacing';

export const petFormStyles = StyleSheet.create({
  scroll: { flexGrow: 1, paddingBottom: SPACING.xxl },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: SPACING.lg, gap: SPACING.md },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.secondary['500'] },
  photoContainer: { alignSelf: 'center', marginBottom: SPACING.lg },
  photoImage: { width: 120, height: 120, borderRadius: 60 },
  photoPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: COLORS.gray['100'], borderWidth: 2, borderColor: COLORS.gray['200'], borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  photoText: { fontSize: 12, color: COLORS.gray['400'], marginTop: SPACING.xs },
  form: { paddingHorizontal: SPACING.md },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.gray['600'], marginBottom: SPACING.xs },
  input: { borderWidth: 1.5, borderColor: COLORS.gray['200'], borderRadius: BORDER_RADIUS.md, height: 52, paddingHorizontal: SPACING.md, fontSize: 15, color: COLORS.secondary['500'], backgroundColor: COLORS.gray['100'], marginBottom: SPACING.md },
  textArea: { height: 88, paddingTop: SPACING.md },
  generoRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.md },
  generoBtn: { flex: 1, height: 44, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, borderColor: COLORS.gray['200'], alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.gray['100'] },
  generoBtnActive: { backgroundColor: COLORS.primary['500'], borderColor: COLORS.primary['500'] },
  generoText: { fontSize: 13, fontWeight: '600', color: COLORS.gray['500'] },
  generoTextActive: { color: COLORS.white },
  rowFields: { flexDirection: 'row', gap: SPACING.sm },
  halfField: { flex: 1 },
  btnRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.md },
  saveBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary['500'], borderRadius: BORDER_RADIUS.lg, height: 56, gap: SPACING.sm },
  saveBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '800' },
  clearBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: COLORS.gray['300'], borderRadius: BORDER_RADIUS.lg, height: 56, gap: SPACING.sm },
  clearBtnText: { color: COLORS.gray['500'], fontSize: 15, fontWeight: '700' },
});
