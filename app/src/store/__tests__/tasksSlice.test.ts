import tasksReducer, { addTask } from '../tasksSlice';
import { TasksState, Task } from '../../types/task';
import 'react-native-get-random-values'; 

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-12345'),
}));

describe('tasksSlice', () => {
  const initialState: TasksState = {
    tasks: [],
  };

  test('Debería devolver el estado inicial', () => {
    // Prueba si el reducer devuelve el estado inicial cuando no hay acción
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('Debería poder gestionar agregar de una nueva task.', () => {
    const taskDescription = 'Prueba técnica de Hector Ramírez';
    const newState = tasksReducer(initialState, addTask(taskDescription));
    const expectedTask: Task = {
      id: 'mock-uuid-12345',
      description: taskDescription,
    };
    const expectedState: TasksState = {
      tasks: [expectedTask],
    };
    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0].description).toEqual(taskDescription);
    expect(newState).toEqual(expectedState);
    const secondTaskDescription = 'Prueba técnica de Misael Ramírez';    
    const mockUuid = require('uuid');
    mockUuid.v4.mockImplementationOnce(() => 'mock-uuid-67890');
    const finalState = tasksReducer(newState, addTask(secondTaskDescription));
    expect(finalState.tasks).toHaveLength(2);
    expect(finalState.tasks[1].description).toEqual(secondTaskDescription);
    expect(finalState.tasks[1].id).toEqual('mock-uuid-67890');
  });
});