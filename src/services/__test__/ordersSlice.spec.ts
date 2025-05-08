import reducer, {
  fetchFeeds,
  fetchUserOrders,
  fetchOrderByNumber,
  createOrder,
  clearOrderModal,
  initialState
} from '../slices/ordersSlice';
import { TOrder } from '@utils-types';

const PENDING_STATE_FEED = {
  ...initialState,
  feed: { ...initialState.feed, loading: true, error: null }
};
const FULFILLED_STATE_FEED = (
  orders: TOrder[],
  total: number,
  totalToday: number
) => ({
  ...initialState,
  feed: { ...initialState.feed, orders, total, totalToday, loading: false }
});
const REJECTED_STATE_FEED = (error: string) => ({
  ...initialState,
  feed: { ...initialState.feed, loading: false, error }
});

const PENDING_STATE_USER_ORDERS = {
  ...initialState,
  userOrders: { ...initialState.userOrders, loading: true, error: null }
};
const FULFILLED_STATE_USER_ORDERS = (orders: TOrder[]) => ({
  ...initialState,
  userOrders: { ...initialState.userOrders, orders, loading: false }
});
const REJECTED_STATE_USER_ORDERS = (error: string) => ({
  ...initialState,
  userOrders: { ...initialState.userOrders, loading: false, error }
});

const PENDING_STATE_CURRENT_ORDER = {
  ...initialState,
  currentOrder: { ...initialState.currentOrder, loading: true, error: null }
};
const FULFILLED_STATE_CURRENT_ORDER = (order: TOrder) => ({
  ...initialState,
  currentOrder: { ...initialState.currentOrder, data: order, loading: false }
});
const REJECTED_STATE_CURRENT_ORDER = (error: string) => ({
  ...initialState,
  currentOrder: { ...initialState.currentOrder, loading: false, error }
});

const PENDING_STATE_ORDER_CREATION = {
  ...initialState,
  orderCreation: {
    ...initialState.orderCreation,
    orderRequest: true,
    error: null
  }
};
const FULFILLED_STATE_ORDER_CREATION = (orderModalData: TOrder | null) => ({
  ...initialState,
  orderCreation: {
    ...initialState.orderCreation,
    orderRequest: false,
    orderModalData
  }
});
const REJECTED_STATE_ORDER_CREATION = (error: string) => ({
  ...initialState,
  orderCreation: { ...initialState.orderCreation, orderRequest: false, error }
});

describe('Orders', () => {
  const order1: TOrder = {
    _id: '1',
    number: 123,
    ingredients: ['ingredient1'],
    status: 'done',
    createdAt: '2025-05-08T00:00:00.000Z',
    updatedAt: '2025-05-08T00:00:00.000Z',
    name: 'Order 1'
  };

  const order2: TOrder = {
    _id: '2',
    number: 124,
    ingredients: ['ingredient2'],
    status: 'done',
    createdAt: '2025-05-08T00:00:00.000Z',
    updatedAt: '2025-05-08T00:00:00.000Z',
    name: 'Order 2'
  };

  it('Должен инициализировать стейт orders', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Должен очистить модальное окно заказа', () => {
    expect(reducer(initialState, clearOrderModal())).toEqual({
      ...initialState,
      orderCreation: { ...initialState.orderCreation, orderModalData: null }
    });
  });

  it('Должен обработать состояние pending в fetchFeeds', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual(PENDING_STATE_FEED);
  });

  it('Должен обработать состояние fulfilled в fetchFeeds', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: { orders: [order1, order2], total: 2, totalToday: 1 }
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(FULFILLED_STATE_FEED([order1, order2], 2, 1));
  });

  it('Должен обработать ошибку в fetchFeeds', () => {
    const action = { type: fetchFeeds.rejected.type, payload: 'Fetch failed' };
    const state = reducer(initialState, action);
    expect(state).toEqual(REJECTED_STATE_FEED('Fetch failed'));
  });

  it('Должен обработать состояние pending в fetchUserOrders', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual(PENDING_STATE_USER_ORDERS);
  });

  it('Должен обработать состояние fulfilled в fetchUserOrders', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: [order1, order2]
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(FULFILLED_STATE_USER_ORDERS([order1, order2]));
  });

  it('Должен обработать ошибку в fetchUserOrders', () => {
    const action = {
      type: fetchUserOrders.rejected.type,
      payload: 'Fetch failed'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(REJECTED_STATE_USER_ORDERS('Fetch failed'));
  });

  it('Должен обработать состояние pending в fetchOrderByNumber', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual(PENDING_STATE_CURRENT_ORDER);
  });

  it('Должен обработать состояние fulfilled в fetchOrderByNumber', () => {
    const action = { type: fetchOrderByNumber.fulfilled.type, payload: order1 };
    const state = reducer(initialState, action);
    expect(state).toEqual(FULFILLED_STATE_CURRENT_ORDER(order1));
  });

  it('Должен обработать ошибку в fetchOrderByNumber', () => {
    const action = {
      type: fetchOrderByNumber.rejected.type,
      payload: 'Fetch failed'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(REJECTED_STATE_CURRENT_ORDER('Fetch failed'));
  });

  it('Должен обработать состояние pending в createOrder', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual(PENDING_STATE_ORDER_CREATION);
  });

  it('Должен обработать состояние fulfilled в createOrder', () => {
    const action = { type: createOrder.fulfilled.type, payload: order1 };
    const state = reducer(initialState, action);
    expect(state).toEqual(FULFILLED_STATE_ORDER_CREATION(order1));
  });

  it('Должен обработать ошибку в createOrder', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Order creation failed'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(
      REJECTED_STATE_ORDER_CREATION('Order creation failed')
    );
  });
});
