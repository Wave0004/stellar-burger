import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import authReducer from './slices/authSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorBurgerReducer from './slices/constructorBurgerSlice';
import ordersReducer from './slices/ordersSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ingredients: ingredientsReducer,
    constructorBurger: constructorBurgerReducer,
    orders: ordersReducer
  }
});

if (process.env.NODE_ENV === 'development') {
  (window as any).store = store;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
