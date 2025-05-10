import reducer, {
  addIngredient,
  addBuns,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructorBurger
} from '../slices/constructorBurgerSlice';

import { TConstructorIngredient } from '@utils-types';

const mockBun: TConstructorIngredient = {
  id: 'asddfsafa',
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mockMainIngredient: TConstructorIngredient = {
  id: '23932rewf',
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
};

describe('Проверка constructorBurger slice', () => {
  const initialState = reducer(undefined, { type: '@@INIT' });

  it('Должен добавить булку', () => {
    const state = reducer(initialState, addBuns(mockBun));
    expect(state.buns).toEqual(mockBun);
  });

  it('Должен добавить ингредиент', () => {
    const state = reducer(initialState, addIngredient(mockMainIngredient));
    expect(state.ingredients).toContainEqual(mockMainIngredient);
  });

  it('Должен удалить ингредиент', () => {
    const state = {
      ...initialState,
      ingredients: [mockMainIngredient]
    };
    const updatedState = reducer(state, deleteIngredient(mockMainIngredient));
    expect(updatedState.ingredients).not.toContainEqual(mockMainIngredient);
  });

  it('Должен перенести ингредиент вверх', () => {
    const state = {
      ...initialState,
      ingredients: [mockMainIngredient, mockBun]
    };
    const updatedState = reducer(state, moveIngredientUp(1));
    expect(updatedState.ingredients).toEqual([mockBun, mockMainIngredient]);
  });

  it('Должен перенести ингредиент вниз', () => {
    const state = {
      ...initialState,
      ingredients: [mockBun, mockMainIngredient]
    };
    const updatedState = reducer(state, moveIngredientDown(0));
    expect(updatedState.ingredients).toEqual([mockMainIngredient, mockBun]);
  });

  it('Должен очистить конструктор', () => {
    const state = {
      ...initialState,
      buns: mockBun,
      ingredients: [mockMainIngredient]
    };
    const updatedState = reducer(state, clearConstructorBurger());
    expect(updatedState.buns).toBeNull();
    expect(updatedState.ingredients).toEqual([]);
  });
});
