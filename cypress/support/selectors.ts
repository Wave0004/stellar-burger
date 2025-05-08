export const BurgerConstructorSelectors = {
  ingredientItem: '[data-cy="ingredient"]' as const,
  ingredientTypeBun: '[data-type="bun"]' as const,
  ingredientTypeMain: '[data-type="main"]' as const,
  orderButton: '[data-cy="order-button"]' as const
};

export const ModalSelectors = {
  modal: '[data-cy="modal"]' as const,
  modalClose: '[data-cy="modal-close"]' as const,
  modalOverlay: '[data-cy="modal-overlay"]' as const
};
