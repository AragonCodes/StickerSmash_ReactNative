import { Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface ImageViewerProps {
  source: ImageSourcePropType;
}

export const ImageViewer = ({ source }: ImageViewerProps) => {
  return <Image source={source} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
