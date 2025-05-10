import reducer, {
  setCurrentIngredient,
  getIngredients,
  initialState
} from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

const PENDING_STATE = { ...initialState, loading: true };
const FULFILLED_STATE = (data: TIngredient[]) => ({
  ...initialState,
  data,
  loading: false
});
const REJECTED_STATE = (error: string) => ({
  ...initialState,
  error,
  loading: false
});

describe('Ингредиенты', () => {
  const ingredient1: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const ingredient2: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  it('Должен инициализировать стейт ingredients', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Должен добавить в стейт выбранный ингредиент', () => {
    expect(reducer(initialState, setCurrentIngredient(ingredient1))).toEqual({
      ...initialState,
      currentIngredient: ingredient1
    });
  });

  it('Должен обработать состояние pending в получении ингредиентов', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual(PENDING_STATE);
  });

  it('Должен обработать состояние fulfilled в получении ингредиентов', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: [ingredient1, ingredient2]
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(FULFILLED_STATE([ingredient1, ingredient2]));
  });

  it('Должен обработать ошибку в получении ингредиентов', () => {
    const action = {
      type: getIngredients.rejected.type,
      payload: 'Fetch failed'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(REJECTED_STATE('Fetch failed'));
  });
});
