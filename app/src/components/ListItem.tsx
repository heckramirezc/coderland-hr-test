import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ItemList } from '../types/itemList';

interface Props {
  item: ItemList;
}

const FALLBACK_AVATAR = 'https://img.icons8.com/?size=100&id=7847&format=png&color=000000';

const ListItem: React.FC<Props> = ({ item }) => {
  const initialUri = item.avatar?.trim() ? item.avatar : FALLBACK_AVATAR;
  const [uri, setUri] = useState(initialUri);

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {item.name?.trim() ? item.name : '(Sin nombre)'}
        </Text>
      </View>
      <Image
        source={{ uri }}
        style={styles.avatar}
        onError={() => setUri(FALLBACK_AVATAR)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    backgroundColor: '#f3f3f3',
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111',
  }
});

export default ListItem;
