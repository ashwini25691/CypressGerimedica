class Collectie {

getPageHeader() {

    //return cy.get('h1[class*="heading-1 page-header-heading"]');
    return cy.get('h1[class*="heading-1 page-header-heading"]');
}
getSearchInputBox() {
    return cy.get('input[aria-label="Zoek een kunstwerk"]')
}
getSubmitbutton() {
   // return cy.get('[data-component="tab"][data-value="first_tab"]')
    return cy.get('button[type="submit"]')
}
getSearchItemCount(){
    return cy.get('p[class="collection-art-object-list-results"]').find('span').eq(0)
}
getFirstPicture(){
    return cy.get('div[class="collection-art-object-list columns-3"]').find('picture').eq(0)
}
getobjectgegevensbtn() {
    return cy.get('button[aria-label="Open Objectgegevens"]').find('svg').eq(0)
}
getobjectgegebenslist() {
    return cy.get('div[class="accordion-item-content accordion-item-content-expanded"]').find('section').eq(0).find('dl').eq(0).find('div')  ;
}

}
export default Collectie