describe('Registro de usuario', () => {

  it('Debe permitir registrar un nuevo usuario', () => {
    cy.visit('http://localhost:3000/register');

    const user = 'user' + Math.floor(Math.random() * 10000);

    cy.get('input').eq(0).type(user);
    cy.get('input').eq(1).type('1234');
    cy.get('button').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

});