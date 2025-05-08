import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { TOrder, TOrdersData } from '@utils-types';

type OrdersState = {
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
    loading: boolean;
    error: string | null;
  };
  userOrders: {
    orders: TOrder[];
    loading: boolean;
    error: string | null;
  };
  currentOrder: {
    data: TOrder | null;
    loading: boolean;
    error: string | null;
  };
  orderCreation: {
    orderRequest: boolean;
    orderModalData: TOrder | null;
    error: string | null;
  };
};

export const initialState: OrdersState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  },
  userOrders: {
    orders: [],
    loading: false,
    error: null
  },
  currentOrder: {
    data: null,
    loading: false,
    error: null
  },
  orderCreation: {
    orderRequest: false,
    orderModalData: null,
    error: null
  }
};

export const fetchFeeds = createAsyncThunk(
  'orders/fetchFeeds',
  (_, { rejectWithValue }) =>
    getFeedsApi()
      .then((response) => response)
      .catch((err) => rejectWithValue(err.message))
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  (_, { rejectWithValue }) =>
    getOrdersApi()
      .then((response) => response)
      .catch((err) => rejectWithValue(err.message))
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchByNumber',
  (number: number, { rejectWithValue }) =>
    getOrderByNumberApi(number)
      .then((response) => response.orders[0])
      .catch((err) => rejectWithValue(err.message))
);

export const createOrder = createAsyncThunk(
  'orders/create',
  (ingredients: string[], { rejectWithValue }) =>
    orderBurgerApi(ingredients)
      .then((response) => response.order)
      .catch((err) => rejectWithValue(err.message))
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderCreation.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.feed.loading = true;
        state.feed.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feed.loading = false;
        state.feed.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.feed.loading = false;
        state.feed.error = action.payload as string;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrders.loading = true;
        state.userOrders.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders.loading = false;
        state.userOrders.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrders.loading = false;
        state.userOrders.error = action.payload as string;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.currentOrder.loading = true;
        state.currentOrder.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder.loading = false;
        state.currentOrder.data = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.currentOrder.loading = false;
        state.currentOrder.error = action.payload as string;
      })

      .addCase(createOrder.pending, (state) => {
        state.orderCreation.orderRequest = true;
        state.orderCreation.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderCreation.orderRequest = false;
        state.orderCreation.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderCreation.orderRequest = false;
        state.orderCreation.error = action.payload as string;
      });
  }
});

export const { clearOrderModal } = ordersSlice.actions;
export default ordersSlice.reducer;
