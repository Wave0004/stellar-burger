/// <reference types="cypress" />

import {
  BurgerConstructorSelectors,
  ModalSelectors
} from '../support/selectors';

describe('Проверка оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('fetchIngredients');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');
  });

  it('Должен создать заказ и отобразить номер заказа в модальном окне и очистить конструктор', () => {
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.ingredientTypeBun)
      .first()
      .find('button')
      .click();

    cy.get(BurgerConstructorSelectors.ingredientTypeMain)
      .first()
      .find('button')
      .click();

    let constructorIngredients: string[] = [];
    cy.getReduxState((state) => state.constructorBurger).then((constructor) => {
      expect(constructor.buns).to.exist;
      expect(constructor.ingredients).to.have.length.greaterThan(0);

      constructorIngredients = [
        constructor.buns._id,
        ...constructor.ingredients.map((i) => i._id),
        constructor.buns._id
      ];
    });

    cy.intercept(
      'POST',
      'https://norma.nomoreparties.space/api/orders',
      (req) => {
        expect(req.body.ingredients).to.deep.equal(constructorIngredients);

        req.reply({
          fixture: 'order.json'
        });
      }
    ).as('createOrder');

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
      cy.getReduxState((state) => state.constructorBurger).then(
        (constructor) => {
          expect(constructor.buns).to.be.null;
          expect(constructor.ingredients).to.be.an('array').that.is.empty;
        }
      );
    });
  });
});
