import { Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface ImageViewerProps {
  sourceUri: string;
  placeholderImage: ImageSourcePropType;
}

export const ImageViewer = ({
  sourceUri,
  placeholderImage,
}: ImageViewerProps) => {
  const source = !!sourceUri ? { uri: sourceUri } : placeholderImage;

  return <Image source={source} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
