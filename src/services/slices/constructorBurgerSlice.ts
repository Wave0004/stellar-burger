import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface ConstructorBurgerState {
  buns: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorBurgerState = {
  buns: null,
  ingredients: []
};

const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    addBuns: (state, action) => {
      state.buns = action.payload;
    },
    deleteIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    moveIngredientUp: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        const [movedItem] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, movedItem);
      }
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const [movedItem] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, movedItem);
      }
    },
    clearConstructorBurger: (state) => {
      state.buns = null;
      state.ingredients = [];
    }
  }
});
export const {
  addIngredient,
  addBuns,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructorBurger
} = constructorBurgerSlice.actions;

export default constructorBurgerSlice.reducer;
