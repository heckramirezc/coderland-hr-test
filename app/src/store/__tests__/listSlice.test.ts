import listReducer, { fetchElements } from '../listSlice';
import { ListState, ItemList } from '../../types/itemList';
import configureStore from 'redux-mock-store';
import { Middleware } from 'redux'; 

const thunkModule = require('redux-thunk'); 

const unboxThunk = (module: any): Middleware => {
  if (typeof module === 'function') {
    return module as Middleware;
  }
  
  if (typeof module === 'object' && module !== null) {
    for (const key in module) {
      if (typeof module[key] === 'function') {
        return module[key] as Middleware;
      }
    }
  }

  return module.default as Middleware; 
};

const thunkMiddleware = unboxThunk(thunkModule);

const middlewares = [thunkMiddleware]; 
const mockStore = configureStore(middlewares);

describe('listSlice', () => {
  const API_URL = 'https://6172cfe5110a740017222e2b.mockapi.io/elements';
  
  const initialState: ListState = {
    data: [],
    loading: false,
    error: null,
  };

  const mockData: ItemList[] = [
    { id: 'a1', name: 'Hector Ramírez', avatar: 'url1' },
    { id: 'b2', name: 'Misael Colorado', avatar: 'url2' },
  ];

  beforeEach(() => {
    fetchMock.resetMocks();
  });


  // Test 1: Manejar el estado de éxito
  test('Debería enviar las acciones pendientes y completadas tras una recuperación exitosa.', async () => {
    fetchMock.once(JSON.stringify(mockData), { status: 200 });

    const store = mockStore({ list: initialState });    
    await store.dispatch(fetchElements() as any);

    const actions = store.getActions();
    expect(fetchMock).toHaveBeenCalledWith(API_URL);
    expect(actions[0].type).toEqual(fetchElements.pending.type);
    expect(actions[1].type).toEqual(fetchElements.fulfilled.type);
    expect(actions[1].payload).toEqual(mockData);

    let state = listReducer(initialState, actions[0]);
    expect(state.loading).toBe(true);
    
    state = listReducer(state, actions[1]);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  // Test 2: Manejar el estado de error
  test('Debería despachar las acciones pendientes y rechazadas en caso de fallo de recuperación.', async () => {
    // Simular un error del servidor (ej. código 500)
    fetchMock.once('', { status: 500 }); 

    const store = mockStore({ list: initialState });
    await store.dispatch(fetchElements() as any);
    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchElements.pending.type);
    expect(actions[1].type).toEqual(fetchElements.rejected.type);
    let state = listReducer(initialState, actions[0]);
    expect(state.loading).toBe(true);
    state = listReducer(state, actions[1]);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(actions[1].payload).toEqual('Inconvenienes de conexión al API.');
    expect(state.error).toEqual('Inconvenienes de conexión al API.');
  });
});
