export const BurgerConstructorSelectors = {
  ingredientItem: '[data-cy="ingredient"]' as const,
  ingredientTypeBun: '[data-type="bun"]' as const,
  ingredientTypeMain: '[data-type="main"]' as const,
  ingredientTypeSauce: '[data-cy="ingredient-type-sauce"]' as const,
  orderButton: '[data-cy="order-button"]' as const,
  IngredientBunTop: '[data-cy="constructor-bun-top"]' as const,
  IngredientBunTopEmpty: '[data-cy="constructor-bun-top-empty"]' as const,
  IngredientMain: '[data-cy="constructor-main"]' as const,
  IngredientMainEmpty: '[data-cy="constructor-main-empty"]' as const,
  IngredientBunBottom: '[data-cy="constructor-bun-bottom"]' as const,
  IngredientBunBottomEmpty: '[data-cy="constructor-bun-bottom-empty"]' as const
};

export const ModalSelectors = {
  modal: '[data-cy="modal"]' as const,
  modalClose: '[data-cy="modal-close"]' as const,
  modalOverlay: '[data-cy="modal-overlay"]' as const
};

export const IngredientSelectors = {
  modalName: '[data-cy="ingredient-modal-name"]' as const
};
