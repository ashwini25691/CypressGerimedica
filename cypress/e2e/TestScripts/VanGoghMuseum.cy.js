// type definitions for Cypress object "cy"
// <reference types="cypress" />

import HomePage from '../../support/PageObjects/HomePage';
import Collectie from '../../support/PageObjects/Collectie';

//Object Creation for PageObject Page Class and assigning it to a constant variable
const homePage=new HomePage();
const collectie=new Collectie();

describe('Automation Test Suite ', function() {

    //this will execution before each function call
    beforeEach(function(){
    cy.fixture('Collectie').then(function(data)
    {
        //reading data from fixture
        this.data=data ;

        //Changing the timeout from 4 seconds to 20 seconds
        Cypress.config('defaultCommandTimeout',20000);
    })
    })

    it('Validate Van Gogh Museum Home Page', function() {

        //open the url
        cy.visit(this.data.HomePageUrl);   

        //accept cookies if exist, function is defined in commands.js
        cy.acceptcookies();

        //validate home page title
        cy.title().should('eq',this.data.HomePageName);   

        //click on collectie link
        homePage.getLinkOntdekdecollectie().click();

        //validate title of collectie page
        cy.title().should('eq',this.data.CollectiePageName);    

        //capture the screenshot
        cy.screenshot(); 

        //logs the text in report
        cy.log(this.data.CollectiePageName + " is displayed");
    })

    it('Validate Het Gele Huis search record count on Collectie page', function(){
        
        //search text on collectie page , function is defined in command.js
        cy.searchTextOnCollectiePage(this.data.CollectiePageUrl,this.data.SearchText);

        //get search item count , validate  count is greater than 700 and logs the text in report
        collectie.getSearchItemCount().invoke('text').then(parseFloat).should('be.gt', this.data.HetGeleHuisRecordCount);
        collectie.getSearchItemCount().invoke('text').as('recordcount')
        cy.get('@recordcount').then((recordcount) => {
            cy.log(this.data.SearchText + " record count is " + recordcount +" which is more than " + this.data.HetGeleHuisRecordCount) ;
          })

        //capture the screenshot
        cy.screenshot() ;
        
    })
    
    it('Validate  Objectgegevens section on Collectie page for the first searched painting', function(){
        
        //search text on collectie page , function is defined in command.js
        cy.searchTextOnCollectiePage(this.data.CollectiePageUrl,this.data.SearchText);     

        //click on first picture
        collectie.getFirstPicture().click({ force: true });

        //click on objectgegevens button and validate the length
        collectie.getobjectgegevensbtn().click({ force: true });
        collectie.getobjectgegebenslist().should('have.length',this.data.objectgegebenslist);

        //compare the value of objectgegevenslist value with value store in command.js file
            for(let i = 0; i < 3; i++){
                collectie.getobjectgegebenslist().eq(i).find('dt').eq(0).should('have.text',this.data.objectgegebenslistvalue[i][0]);
                collectie.getobjectgegebenslist().eq(i).find('dd').eq(0).should('have.text',this.data.objectgegebenslistvalue[i][1]);      
                                           }  

        //logs the report if all values are matched and capture the screenshot
        cy.log("Objectgegevens section  matched successfully");
        cy.screenshot () ;
    })
})