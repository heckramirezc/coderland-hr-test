import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchElements } from '../../store/listSlice';
import { ItemList } from '../../types/itemList';

const ListItem: React.FC<{ item: ItemList }> = ({ item }) => {
  const [imageSource, setImageSource] = useState({ uri: item.avatar });

  return (
    <View style={styles.listItem}>
      <Text style={styles.name}>{item.name != null && item.name != '' && item.name != ' '? item.name : '(Sin nombre)'}</Text>
      <Image
        source={imageSource}
        style={styles.avatar}
        onError={() => setImageSource({ uri: 'https://img.icons8.com/?size=100&id=7847&format=png&color=000000' })}
      />
    </View>
  );
};

const ListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.list);

  useEffect(() => {
    dispatch(fetchElements());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando datos remotos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error al cargar: {error}</Text>
        <Button title="Reintentar" onPress={() => dispatch(fetchElements())} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron elementos.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
});

export default ListScreen;