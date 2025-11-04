import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { addTask } from '../../store/tasksSlice';

const TaskItem: React.FC<{ description: string }> = ({ description }) => (
  <View style={styles.taskItem}>
    <Text>{description}</Text>
  </View>
);

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
      <View style={styles.addButtonContainer}>
        <Button 
          title="Agregar Nuevo Task"
          onPress={() => setModalVisible(true)} 
        />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem description={item.description} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay tareas agregadas.</Text>}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Nuevo Task</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Descripción de la Task"
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
            />

            <Button
              title="Agregar"
              onPress={handleAddTask}
              disabled={newTaskDescription.trim() === ''}
            />
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
                <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButtonText: {
    color: 'gray',
  }
});

export default TasksScreen;