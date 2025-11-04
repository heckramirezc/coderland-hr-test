import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { addTask } from '../../store/tasksSlice';
import TaskItem from '../../components/TaskItem';
import AddTaskModal from '../../components/AddTaskModal';

const TasksScreen: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = () => {
    if (newTaskDescription.trim() === '') {
      Alert.alert('Error', 'La descripción del task no puede estar vacía.');
      return;
    }
    dispatch(addTask(newTaskDescription.trim()));
    setNewTaskDescription('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Agregar Nuevo Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem description={item.description} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay tareas agregadas.</Text>}
      />

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        value={newTaskDescription}
        onChangeText={setNewTaskDescription}
        onSubmit={handleAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20, backgroundColor: '#F4F5F7' },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
    color: '#222',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#888', fontSize: 15 },
});

export default TasksScreen;
