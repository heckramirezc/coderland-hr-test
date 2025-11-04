import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStack } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStack, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Tasks"
          onPress={() => navigation.navigate('Tasks')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Listado"
          onPress={() => navigation.navigate('List')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
});

export default HomeScreen;