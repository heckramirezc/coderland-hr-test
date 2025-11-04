import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks/reduxHooks';

const TaskItem: React.FC<{ description: string }> = ({ description }) => (
  <View style={styles.taskItem}>
    <Text>{description}</Text>
  </View>
);

const TasksScreen: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  
  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <Button 
          title="Agregar Nuevo Task"
          onPress={() => {}} 
        />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem description={item.description} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay tareas agregadas.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButtonContainer: {
    marginBottom: 20,
    width: '100%',
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  }
});

export default TasksScreen;