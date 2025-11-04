import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  description: string;
}

const TaskItem: React.FC<Props> = ({ description }) => (
  <View style={styles.card}>
    <Text style={styles.text}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  text: { fontSize: 16, color: '#333' },
});

export default TaskItem;
