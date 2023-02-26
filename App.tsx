import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'src/components/Button';
import { ImageViewer } from 'src/components/ImageViewer';
import { pickImageAsync } from 'src/utils/pickImageAsync';

const PLACEHOLDER_IMAGE = require('src/assets/images/background-image.png');

export default function App() {
  const [selectedImageUri, setSelectedImageUri] = useState('');

  const handlePickImage = async () => {
    const images = await pickImageAsync();

    if (images?.[0]) {
      setSelectedImageUri(images[0].uri);
    } else {
      alert('No image selected.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          sourceUri={selectedImageUri}
          placeholderImage={PLACEHOLDER_IMAGE}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          type='primary'
          label='Choose a photo'
          onPress={handlePickImage}
        />
        <Button label='Use this photo' />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
