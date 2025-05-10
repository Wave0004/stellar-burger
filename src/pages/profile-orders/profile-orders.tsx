import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state.orders.userOrders.orders);

  return <ProfileOrdersUI orders={orders} />;
};
