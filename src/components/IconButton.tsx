import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IconButtonProps {
  onPress: PressableProps['onPress'];
  iconName: string;
  label: string;
}

export default function IconButton({
  iconName,
  label,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons
        // @ts-expect-error: name string union is not exposed
        name={iconName}
        size={24}
        color='#fff'
      />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
