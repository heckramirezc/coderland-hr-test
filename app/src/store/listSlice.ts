import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ListState, ItemList } from '../types/itemList';

const API_URL = 'https://6172cfe5110a740017222e2b.mockapi.io/elements';

export const fetchElements = createAsyncThunk(
  'listado/fetchElements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener la información.');
      }
      const data: ItemList[] = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Inconvenienes de conexión al API.');
    }
  }
);

const initialState: ListState = {
  data: [],
  loading: false,
  error: null,
};

const listadoSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchElements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchElements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Ha ocurrido un error desconocido.';
        state.data = [];
      });
  },
});

export default listadoSlice.reducer;