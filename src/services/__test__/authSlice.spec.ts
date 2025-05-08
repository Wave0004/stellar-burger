import reducer, {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUser
} from '../slices/authSlice';
import type { TUser } from '@utils-types';

const REGISTER_PENDING = registerUser.pending.type;
const REGISTER_FULFILLED = registerUser.fulfilled.type;
const REGISTER_REJECTED = registerUser.rejected.type;

const LOGIN_PENDING = loginUser.pending.type;
const LOGIN_FULFILLED = loginUser.fulfilled.type;
const LOGIN_REJECTED = loginUser.rejected.type;

const FETCH_PENDING = fetchUser.pending.type;
const FETCH_FULFILLED = fetchUser.fulfilled.type;
const FETCH_REJECTED = fetchUser.rejected.type;

const UPDATE_PENDING = updateUser.pending.type;
const UPDATE_FULFILLED = updateUser.fulfilled.type;
const UPDATE_REJECTED = updateUser.rejected.type;

const LOGOUT_FULFILLED = logoutUser.fulfilled.type;

import userSlice from '../slices/authSlice';

const { getInitialState } = (() => {
  const reducerModule = require('../slices/authSlice');
  return {
    getInitialState: () => reducerModule.default(undefined, { type: '@@INIT' })
  };
})();

describe('Проверка auth slice', () => {
  const mockUser: TUser = {
    email: 'test',
    name: 'test@test.com'
  };

  it('Должен обрабатывать pending initial', () => {
    const state = reducer(getInitialState(), { type: REGISTER_PENDING });
    expect(state.loading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('Должен обрабатывать успешную регистрацию', () => {
    const state = reducer(getInitialState(), {
      type: REGISTER_FULFILLED,
      payload: mockUser
    });
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
  });

  it('Должен обратывать ошибку регистрации', () => {
    const state = reducer(getInitialState(), {
      type: REGISTER_REJECTED,
      payload: 'Registration error'
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Registration error');
  });

  it('Должен обрабатывать авторизацию пользователя loading', () => {
    const state = reducer(getInitialState(), { type: LOGIN_PENDING });
    expect(state.loading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('Должен обрабатывать успешную авторизацию пользователя', () => {
    const state = reducer(getInitialState(), {
      type: LOGIN_FULFILLED,
      payload: mockUser
    });
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
  });

  it('Должен обрабатывать очистку пользователя', () => {
    const state = reducer(getInitialState(), {
      type: LOGIN_FULFILLED,
      payload: null
    });
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });

  it('Должен обрабатывать ошибку авторизации пользователя', () => {
    const state = reducer(getInitialState(), {
      type: LOGIN_REJECTED,
      payload: 'Login error'
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Login error');
  });

  it('Должен обрабатывать загрузку пользователя loading', () => {
    const state = reducer(getInitialState(), { type: FETCH_PENDING });
    expect(state.loading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('Должен обрабатывать успешную загрузку пользователя', () => {
    const state = reducer(getInitialState(), {
      type: FETCH_FULFILLED,
      payload: mockUser
    });
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
  });

  it('Должен обрабатывать очистку загрузки пользователя', () => {
    const state = reducer(getInitialState(), {
      type: FETCH_FULFILLED,
      payload: null
    });
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });

  it('Должен обрабатывать ошибку получения пользователя', () => {
    const state = reducer(getInitialState(), {
      type: FETCH_REJECTED,
      payload: 'Fetch error'
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Fetch error');
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });

  it('Должен обрабатывать изменение данных пользователя loading', () => {
    const state = reducer(getInitialState(), { type: UPDATE_PENDING });
    expect(state.loading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('Должен успешно обновлять пользователя', () => {
    const state = reducer(getInitialState(), {
      type: UPDATE_FULFILLED,
      payload: mockUser
    });
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
  });

  it('Должен обрабатывать очистку обновления пользователя', () => {
    const state = reducer(getInitialState(), {
      type: UPDATE_FULFILLED,
      payload: null
    });
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });

  it('Должен обрабатывать ошибку обновления данных пользователя', () => {
    const state = reducer(getInitialState(), {
      type: UPDATE_REJECTED,
      payload: 'Update error'
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Update error');
  });

  it('Должен делать успешный logout', () => {
    const state = reducer(getInitialState(), { type: LOGOUT_FULFILLED });
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeUndefined();
  });
});
