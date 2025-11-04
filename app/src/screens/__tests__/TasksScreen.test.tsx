import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TasksScreen from '../Tasks/TasksScreen'; 
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Task, TasksState } from '../../types/task'; 
import { addTask } from '../../store/tasksSlice'; 

const mockStore = configureStore([]); 

const mockNavigation = { navigate: jest.fn() } as any;

describe('Pruebas de componentes de pantalla de Tasks', () => {
  const initialState: TasksState = {
    tasks: [{ id: '1', description: 'Tarea preexistente' }],
  };

  jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid-new-task'),
  }));


  test('1. Debe mostrar las tareas existentes y el botón de agregar.', () => {
    const store = mockStore({ tasks: initialState });
    
    const { getByText } = render(
      <Provider store={store}>
        <TasksScreen navigation={mockNavigation} route={{} as any} />
      </Provider>
    );

    expect(getByText('Tarea preexistente')).toBeTruthy();
    expect(getByText('Agregar Nuevo Task')).toBeTruthy();
  });

  test('2. Debería mostrarse una ventana modal al pulsar el botón "Agregar Nuevo Task".', () => {
    const store = mockStore({ tasks: initialState });
    const inputPlaceholder = 'Descripción de la Task';
    
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <TasksScreen navigation={mockNavigation} route={{} as any} />
      </Provider>
    );

    expect(() => getByPlaceholderText(inputPlaceholder)).toThrow();
    fireEvent.press(getByText('Agregar Nuevo Task'));
    expect(getByPlaceholderText(inputPlaceholder)).toBeTruthy();
    expect(getByText('Agregar')).toBeTruthy(); 
  });

  test('3. Debería impedir el envío al intentar agregar un Task vacío y el botón de cierre funciona', () => {
    const store = mockStore({ tasks: initialState });

    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <TasksScreen navigation={mockNavigation} route={{} as any} />
      </Provider>
    );

    fireEvent.press(getByText('Agregar Nuevo Task'));
    const addButton = getByText('Agregar');
    const input = getByPlaceholderText('Descripción de la Task');    
    fireEvent.changeText(input, ' '); 
    fireEvent.press(addButton); 
    expect(store.getActions()).toHaveLength(0);
    fireEvent.press(getByText('Cerrar'));
    expect(() => getByText('Cerrar')).toThrow();
  });

  test('4. Se debe enviar la tarea al agregar una tarea válida.', async () => {
    const store = mockStore({ tasks: initialState });
    
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <TasksScreen navigation={mockNavigation} route={{} as any} />
      </Provider>
    );

    fireEvent.press(getByText('Agregar Nuevo Task'));
    const newTask = 'Tarea de prueba válida';
    const input = getByPlaceholderText('Descripción de la Task');
    const addButton = getByText('Agregar');
    fireEvent.changeText(input, newTask);
    fireEvent.press(addButton); 
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toEqual(addTask.type);
    expect(actions[0].payload).toEqual(newTask);    
    await waitFor(() => {
        expect(() => getByText('Agregar')).toThrow();
    });
  });
});