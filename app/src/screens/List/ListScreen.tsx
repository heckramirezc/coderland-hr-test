import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchElements } from '../../store/listSlice';
import ListItem from '../../components/ListItem';

const ListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.list);

  useEffect(() => {
    dispatch(fetchElements());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Listado</Text>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Cargando datos...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Button title="Reintentar" onPress={() => dispatch(fetchElements())} />
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItem item={item} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron elementos.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 20, backgroundColor: '#F7F8FA', paddingBottom: 70},
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#111',
  },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#444' },
  errorText: { color: '#d9534f', marginBottom: 10, fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#777' },
});

export default ListScreen;
