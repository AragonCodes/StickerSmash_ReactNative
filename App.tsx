import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button } from 'src/components/Button';
import CircleButton from 'src/components/CircleButton';
import BottomScreenModal from 'src/components/BottomScreenModal';
import IconButton from 'src/components/IconButton';
import { ImageViewer } from 'src/components/ImageViewer';
import { pickImageAsync } from 'src/utils/pickImageAsync';
import EmojiList from 'src/components/EmojiPicker/EmojiList';
import EmojiSticker from 'src/components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import DomToImage from 'dom-to-image';

const PLACEHOLDER_IMAGE = require('src/assets/images/background-image.png');

export default function App() {
  const [pickedEmoji, setPickedEmoji] = useState(undefined);
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [isPhotoChosen, setIsPhotoChosen] = useState(false);
  const [isEmojiPickerModalShown, setIsEmojiPickerModalShown] = useState(false);

  const imageRef = useRef<View>(null);

  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();

  if (permissionStatus === null) {
    requestPermission();
  }

  const handlePickImage = async () => {
    const images = await pickImageAsync();

    if (images?.[0]) {
      setSelectedImageUri(images[0].uri);
      setIsPhotoChosen(true);
    } else {
      alert('No image selected.');
    }
  };

  const handleChoosePhoto = () => {
    setIsPhotoChosen(true);
  };

  const handleReset = () => {
    setIsPhotoChosen(false);
  };

  const handleAddSticker = () => {
    setIsEmojiPickerModalShown(true);
  };

  const handleEmojiPickerModalClose = () => {
    setIsEmojiPickerModalShown(false);
  };

  const handleEmojiSelection = (emoji: any) => {
    setPickedEmoji(emoji);
    setIsEmojiPickerModalShown(false);
  };

  const handleSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else if (imageRef.current) {
      // @ts-expect-error: no idea
      DomToImage.toJpeg(imageRef.current, {
        quality: 0.95,
        width: 320,
        height: 440,
      })
        .then((dataUrl) => {
          const now = new Date();
          let link = document.createElement('a');
          link.download = `sticker-smash_${now.toUTCString()}.jpeg`;
          link.href = dataUrl;
          link.click();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            sourceUri={selectedImageUri}
            placeholderImage={PLACEHOLDER_IMAGE}
          />
          <EmojiSticker stickerSource={pickedEmoji} />
        </View>
      </View>
      {isPhotoChosen ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              iconName='refresh'
              label='Reset'
              onPress={handleReset}
            />
            <CircleButton onPress={handleAddSticker} />
            <IconButton
              iconName='save-alt'
              label='Save'
              onPress={handleSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            type='primary'
            label='Choose a photo'
            onPress={handlePickImage}
          />
          <Button label='Use this photo' onPress={handleChoosePhoto} />
        </View>
      )}
      <BottomScreenModal
        isVisible={isEmojiPickerModalShown}
        onClose={handleEmojiPickerModalClose}
      >
        <EmojiList onSelect={handleEmojiSelection} />
      </BottomScreenModal>
      <StatusBar style='light' />
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
