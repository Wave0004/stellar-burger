import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrderModal,
  createOrder
} from '../../services/slices/ordersSlice';
import { useNavigate } from 'react-router-dom';
import { clearConstructorBurger } from '../../services/slices/constructorBurgerSlice';

export const BurgerConstructor: FC = () => {
  const { buns, ingredients } = useSelector((state) => state.constructorBurger);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const { orderRequest, orderModalData } = useSelector(
    (state) => state.orders.orderCreation
  );
  const dispatch = useDispatch();
  const constructorItems = {
    bun: buns,
    ingredients: ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) return navigate('/login');
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModal());
    dispatch(clearConstructorBurger());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
