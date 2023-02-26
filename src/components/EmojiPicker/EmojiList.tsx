import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

interface EmojiListProps {
  onSelect: (emojiAsset: any) => void;
}

export default function EmojiList({ onSelect }: EmojiListProps) {
  const emojisAssets = [
    require('src/assets/images/emoji1.png'),
    require('src/assets/images/emoji2.png'),
    require('src/assets/images/emoji3.png'),
    require('src/assets/images/emoji4.png'),
    require('src/assets/images/emoji5.png'),
    require('src/assets/images/emoji6.png'),
  ];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
      data={emojisAssets}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item: emojiAsset }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(emojiAsset);
            }}
          >
            <Image source={emojiAsset} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
