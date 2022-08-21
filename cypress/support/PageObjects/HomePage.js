class HomePage {

getLinkOntdekdecollectie() {

    return cy.get('a[href*="/nl/collectie"]').contains('collectie');
}
getCookiesAcceptButton() {
    return cy.get('body').find("button[class='cookie-banner-button btn']")
}

}
export default HomePage