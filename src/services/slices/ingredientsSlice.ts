import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

interface IngredientsState {
  data: TIngredient[];
  error: unknown;
  loading: boolean;
  currentIngredient: TIngredient | null;
}

const initialState: IngredientsState = {
  data: [],
  error: null,
  loading: false,
  currentIngredient: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/fetchAllIngredients',
  (_, { rejectWithValue }) =>
    getIngredientsApi()
      .then((response) => response)
      .catch((err) => rejectWithValue(err.message))
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload ?? [];
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default ingredientsSlice.reducer;
export const { setCurrentIngredient } = ingredientsSlice.actions;
