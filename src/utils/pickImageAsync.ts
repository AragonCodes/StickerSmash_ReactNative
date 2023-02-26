import * as ImagePicker from 'expo-image-picker';

export const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets;
  } else {
    return undefined;
  }
};
