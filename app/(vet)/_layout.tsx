import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/styles/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: { name: string; label: string; icon: IconName; iconActive: IconName }[] = [
  { name: 'home', label: 'Início', icon: 'home-outline', iconActive: 'home' },
  { name: 'patients', label: 'Pacientes', icon: 'paw-outline', iconActive: 'paw' },
  { name: 'agenda', label: 'Agenda', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'profile', label: 'Perfil', icon: 'person-outline', iconActive: 'person' },
];

export default function VetLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const cfg = TAB_CONFIG.find(t => t.name === route.name);
        return {
          headerShown: false,
          tabBarActiveTintColor: COLORS.secondary['500'],
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
      <Tabs.Screen name="home" />
      <Tabs.Screen name="patients" />
      <Tabs.Screen name="agenda" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
