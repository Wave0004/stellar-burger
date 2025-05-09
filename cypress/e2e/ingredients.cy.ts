/// <reference types="cypress" />
import {
  BurgerConstructorSelectors,
  ModalSelectors
} from '../support/selectors';

const INGREDIENTS = {
  BUN: {
    name: 'Флюоресцентная булка R2-D3',
    calories: '643',
    proteins: '44',
    fat: '26',
    carbs: '85',
    price: '988'
  },
  MAIN: {
    name: 'Биокотлета из марсианской Магнолии',
    calories: '4242',
    proteins: '420',
    fat: '142',
    carbs: '242',
    price: '424'
  }
};

describe('Проверка Конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('fetchIngredients');

    cy.visit('/');
  });

  it('Должен добавить ингредиенты в конструктор с проверкой названий', () => {
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.IngredientBunTopEmpty).should(
      'contain',
      'Выберите булки'
    );
    cy.get(BurgerConstructorSelectors.IngredientMainEmpty).should(
      'contain',
      'Выберите начинку'
    );
    cy.get(BurgerConstructorSelectors.IngredientBunBottomEmpty).should(
      'contain',
      'Выберите булки'
    );

    cy.get(BurgerConstructorSelectors.ingredientTypeBun)
      .contains(INGREDIENTS.BUN.name)
      .parent()
      .find('button')
      .click();

    cy.get(BurgerConstructorSelectors.IngredientBunTop).should(
      'contain',
      `${INGREDIENTS.BUN.name} (верх)`
    );
    cy.get(BurgerConstructorSelectors.IngredientBunBottom).should(
      'contain',
      `${INGREDIENTS.BUN.name} (низ)`
    );

    cy.get(BurgerConstructorSelectors.IngredientBunTopEmpty).should(
      'not.exist'
    );
    cy.get(BurgerConstructorSelectors.IngredientBunBottomEmpty).should(
      'not.exist'
    );

    cy.get(BurgerConstructorSelectors.ingredientTypeMain)
      .contains(INGREDIENTS.MAIN.name)
      .parent()
      .find('button')
      .click();

    cy.get(BurgerConstructorSelectors.IngredientMain).should(
      'contain',
      INGREDIENTS.MAIN.name
    );
    cy.get(BurgerConstructorSelectors.IngredientMainEmpty).should('not.exist');
  });

  it('Должен открыть модальное окно с деталями конкретного ингредиента', () => {
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.ingredientTypeBun)
      .contains(INGREDIENTS.BUN.name)
      .click();

    cy.get(ModalSelectors.modal).should('exist');
    cy.get(ModalSelectors.modal).should('contain', INGREDIENTS.BUN.name);

    cy.get(ModalSelectors.modalClose).click();
    cy.get(ModalSelectors.modal).should('not.exist');
  });

  it('Должен открыть и закрыть модальное окно с ингредиентом через overlay', () => {
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.ingredientTypeMain)
      .contains(INGREDIENTS.MAIN.name)
      .click();

    cy.get(ModalSelectors.modal).should('exist');
    cy.get(ModalSelectors.modal).should('contain', INGREDIENTS.MAIN.name);

    cy.get(ModalSelectors.modalOverlay).click({ force: true });
    cy.get(ModalSelectors.modal).should('not.exist');
  });

  it('Должен отображать кнопку заказа и проверять её состояние', () => {
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.orderButton).should('not.exist');

    cy.get(BurgerConstructorSelectors.ingredientTypeBun)
      .contains(INGREDIENTS.BUN.name)
      .parent()
      .find('button')
      .click();

    cy.get(BurgerConstructorSelectors.orderButton).should('exist');
  });
});
