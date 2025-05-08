/// <reference types="cypress" />
import {
  BurgerConstructorSelectors,
  ModalSelectors
} from '../support/selectors';

describe('Проверка Конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('fetchIngredients');

    cy.visit('/');
  });
  it('Должен добавить ингредиент в конструктор', () => {
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.ingredientTypeBun)
      .first()
      .find('button')
      .click();

    cy.get(BurgerConstructorSelectors.ingredientTypeMain)
      .first()
      .find('button')
      .click();

    cy.getReduxState((state) => state.constructorBurger).then((constructor) => {
      expect(constructor.buns.name).to.equal('Флюоресцентная булка R2-D3');
    });
    cy.getReduxState((state) => state.constructorBurger).then((constructor) => {
      expect(constructor.ingredients).to.exist;
    });
  });
  it('Должен открыть и закрыть модальное окно с ингредиентом', () => {
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.ingredientTypeBun).first().click();

    cy.get(ModalSelectors.modal).should('exist');
    cy.get(ModalSelectors.modalClose).click();
    cy.get(ModalSelectors.modal).should('not.exist');
  });

  it('Должен открыть и закрыть модальное окно с ингредиентом через overlay', () => {
    cy.wait('@fetchIngredients');

    cy.get(BurgerConstructorSelectors.ingredientTypeBun).first().click();

    cy.get(ModalSelectors.modal).should('exist');
    cy.get(ModalSelectors.modalOverlay).click({ force: true });
    cy.get(ModalSelectors.modal).should('not.exist');
  });
});
