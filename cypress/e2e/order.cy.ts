/// <reference types="cypress" />
import {
  BurgerConstructorSelectors,
  ModalSelectors
} from '../support/selectors';

const INGREDIENTS = {
  BUN_TOP: 'Флюоресцентная булка R2-D3 (верх)',
  BUN_BOTTOM: 'Флюоресцентная булка R2-D3 (низ)',
  MAIN: 'Биокотлета из марсианской Магнолии'
};

const INGREDIENT_IDS = {
  BUN_TOP_ID: '643d69a5c3f7b9001cfa093d',
  MAIN_ID: '643d69a5c3f7b9001cfa0941',
  BUN_BOTTOM_ID: '643d69a5c3f7b9001cfa093d'
};

describe('Проверка оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('fetchIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');
  });

  it('Должен создать заказ и отобразить номер заказа в модальном окне и очистить конструктор', () => {
    cy.wait('@getUser').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.IngredientBunTopEmpty).should('exist');
    cy.get(BurgerConstructorSelectors.IngredientMainEmpty).should('exist');
    cy.get(BurgerConstructorSelectors.IngredientBunBottomEmpty).should('exist');

    cy.get(BurgerConstructorSelectors.ingredientTypeBun)
      .first()
      .find('button')
      .click();

    cy.get(BurgerConstructorSelectors.ingredientTypeMain)
      .first()
      .find('button')
      .click();

    cy.get(BurgerConstructorSelectors.IngredientBunTop).should(
      'contain',
      INGREDIENTS.BUN_TOP
    );
    cy.get(BurgerConstructorSelectors.IngredientBunBottom).should(
      'contain',
      INGREDIENTS.BUN_BOTTOM
    );
    cy.get(BurgerConstructorSelectors.IngredientMain).should(
      'contain',
      INGREDIENTS.MAIN
    );

    cy.get(BurgerConstructorSelectors.orderButton).should('exist');

    cy.intercept('POST', '**/api/orders', (req) => {
      const expectedIngredients = [
        INGREDIENT_IDS.BUN_TOP_ID,
        INGREDIENT_IDS.MAIN_ID,
        INGREDIENT_IDS.BUN_BOTTOM_ID
      ];

      expect(req.body.ingredients).to.deep.equal(expectedIngredients);

      req.reply({
        fixture: 'order.json'
      });
    }).as('createOrder');

    cy.get(BurgerConstructorSelectors.orderButton).click();

    cy.wait('@createOrder').then((interception) => {
      const orderNumber = interception.response?.body.order.number;

      cy.get(ModalSelectors.modal).should('exist');
      cy.get(ModalSelectors.modal).should('contain', orderNumber);

      cy.fixture('order.json').then((orderData) => {
        expect(orderNumber).to.equal(orderData.order.number);
      });

      cy.get(ModalSelectors.modalClose).click();
      cy.get(ModalSelectors.modal).should('not.exist');

      cy.get(BurgerConstructorSelectors.IngredientBunTopEmpty).should('exist');
      cy.get(BurgerConstructorSelectors.IngredientMainEmpty).should('exist');
      cy.get(BurgerConstructorSelectors.IngredientBunBottomEmpty).should(
        'exist'
      );
    });
  });
});
