describe('Prueba de Login', () => {

  it('Debe permitir iniciar sesión con credenciales correctas', () => {

    cy.visit('http://localhost:3000'); 

    cy.get('input').eq(0).type('camilo');    
    cy.get('input').eq(1).type('camilo');     

    cy.get('button').click();              

    cy.url().should('include', '/menu');  
    cy.contains('Finanzas personales');            

  });

});