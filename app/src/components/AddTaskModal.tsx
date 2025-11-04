import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

const AddTaskModal: React.FC<Props> = ({ visible, onClose, value, onChangeText, onSubmit }) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Nuevo Task</Text>

        <TextInput
          style={styles.input}
          placeholder="Descripción..."
          value={value}
          onChangeText={onChangeText}
        />

        <TouchableOpacity
          style={[styles.addButton, value.trim() === '' && styles.disabled]}
          onPress={onSubmit}
          disabled={value.trim() === ''}
        >
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.35)' },
  modal: { backgroundColor: 'white', padding: 26, borderRadius: 14, width: '80%', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 16, color: '#222' },
  input: { width: '100%', backgroundColor: '#F2F2F2', borderRadius: 8, padding: 12, marginBottom: 18 },
  addButton: { backgroundColor: '#3B82F6', paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  addButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  disabled: { opacity: 0.5 },
  closeButton: { marginTop: 14 },
  closeText: { color: '#666', fontSize: 15 },
});

export default AddTaskModal;
