import { View, Image, ImageProps } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface EmojiStickerProps {
  imageSize?: number;
  stickerSource?: ImageProps['source'];
}

export default function EmojiSticker({
  imageSize = 40,
  stickerSource,
}: EmojiStickerProps) {
  const scaleImage = useSharedValue(imageSize);

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value) {
        scaleImage.value = scaleImage.value * 2;
      }
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  if (!stickerSource) {
    return null;
  }

  return (
    <View style={{ top: -350 }}>
      {/* @ts-expect-error: missing unused properties */}
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
        <AnimatedImage
          source={stickerSource}
          resizeMode='contain'
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
      </TapGestureHandler>
    </View>
  );
}
