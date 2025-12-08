describe('Prueba de Login', () => {

  it('Debe permitir iniciar sesión con credenciales correctas', () => {

    cy.visit('http://localhost:3000');  // Abre tu app

    cy.get('input').eq(0).type('camilo');     // Usuario
    cy.get('input').eq(1).type('camilo');     // Password

    cy.get('button').click();               // Botón Entrar

    cy.url().should('include', '/menu');   // Debe ir al menú
    cy.contains('Finanzas personales');              // Verifica texto del menú

  });

});