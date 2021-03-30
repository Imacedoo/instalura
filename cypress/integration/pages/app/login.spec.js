describe('/pages/app/login/', () => {
  it('Preencha os campos e vá para a página de perfil/profile', () => {
    cy.visit('/app/login/');

    cy.get('#formCadastro input[name="usuario"]').type('LuckPou');

    cy.get('#formCadastro input[name="senha"]').type('123456');

    cy.get('#formCadastro button[type="submit"]').click();

    cy.url().should('include', '/app/profile');
  });
});
