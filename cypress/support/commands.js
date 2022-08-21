// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import HomePage from '../support/PageObjects/HomePage';
import Collectie from '../support/PageObjects/Collectie';

Cypress.Commands.add("acceptcookies", () => { 
    const homePage=new HomePage();
    homePage.getCookiesAcceptButton().then(items => {
        if(items.length) {
            homePage.getCookiesAcceptButton().click();
        }
      }); 

Cypress.Commands.add("searchTextOnCollectiePage", (url, SearchText) => { 
        const collectie=new Collectie();
        cy.visit(url);
        cy.acceptcookies(); 
        collectie.getSearchInputBox().clear(); 
        collectie.getSearchInputBox().type(SearchText)       
        collectie.getSearchInputBox().should('have.value',SearchText);
        collectie.getSubmitbutton().click();
 })
})
