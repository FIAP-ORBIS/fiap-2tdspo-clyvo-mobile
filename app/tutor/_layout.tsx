import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/styles/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: { name: string; label: string; icon: IconName; iconActive: IconName }[] = [
  { name: 'explorar', label: 'Explorar', icon: 'compass-outline', iconActive: 'compass' },
  { name: 'pets/index', label: 'Pets', icon: 'paw-outline', iconActive: 'paw' },
  { name: 'consultas', label: 'Consultas', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'exames', label: 'Exames', icon: 'flask-outline', iconActive: 'flask' },
  { name: 'profile', label: 'Perfil', icon: 'person-outline', iconActive: 'person' },
];

export default function TutorLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const cfg = TAB_CONFIG.find(t => t.name === route.name);
        return {
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary['500'],
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
      <Tabs.Screen name="explorar" />
      <Tabs.Screen name="pets/index" />
      <Tabs.Screen name="consultas" />
      <Tabs.Screen name="exames" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="pet/[id]" options={{ href: null }} />
      <Tabs.Screen name="pet/new" options={{ href: null }} />
      <Tabs.Screen name="pain-sense" options={{ href: null }} />
      <Tabs.Screen name="home" options={{ href: null }} />
    </Tabs>
  );
}
