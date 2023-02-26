import { View, Image, ImageProps } from 'react-native';

interface EmojiStickerProps {
  imageSize?: number;
  stickerSource?: ImageProps['source'];
}

export default function EmojiSticker({
  imageSize = 40,
  stickerSource,
}: EmojiStickerProps) {
  if (!stickerSource) {
    return null;
  }

  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode='contain'
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
