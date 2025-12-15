describe('Login con usuario inexistente', () => {
  it('Login con usuario inexistente', () => {

    cy.visit('http://localhost:3000')

    // Usuario correcto
    cy.get('input').eq(0).type('usuario falso')

    cy.get('input').eq(1).type('123456')

    // Capturar el alert del navegador
    cy.on('window:alert', (mensaje) => {
      expect(mensaje).to.contain('Usuario no existe') 
    })

    cy.get('button').click()

    // Verificar que NO redirige al menú
    cy.url().should('not.include', '/menu')
  })
})
