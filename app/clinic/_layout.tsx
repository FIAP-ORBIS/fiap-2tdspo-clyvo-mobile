import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/styles/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: { name: string; label: string; icon: IconName; iconActive: IconName }[] = [
  { name: 'dashboard', label: 'Painel', icon: 'grid-outline', iconActive: 'grid' },
  { name: 'team', label: 'Equipe', icon: 'people-outline', iconActive: 'people' },
  { name: 'pets', label: 'Pacientes', icon: 'paw-outline', iconActive: 'paw' },
  { name: 'agenda', label: 'Agenda', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'profile', label: 'Perfil', icon: 'business-outline', iconActive: 'business' },
];

export default function ClinicLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const cfg = TAB_CONFIG.find(t => t.name === route.name);
        return {
          headerShown: false,
          tabBarActiveTintColor: COLORS.tertiary['500'],
          tabBarInactiveTintColor: COLORS.gray['400'],
          tabBarStyle: { height: 80, paddingBottom: 16, paddingTop: 8, borderTopWidth: 1, borderTopColor: COLORS.gray['200'] },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarLabel: cfg?.label ?? route.name,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? (cfg?.iconActive ?? 'ellipse') : (cfg?.icon ?? 'ellipse-outline')} size={24} color={color} />
          ),
        };
      }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="team" />
      <Tabs.Screen name="pets" />
      <Tabs.Screen name="agenda" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
