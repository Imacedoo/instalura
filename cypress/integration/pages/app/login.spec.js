describe('/pages/app/login/', () => {
  it('Preencha os campos e vá para a página de perfil/profile', () => {
    cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app/api/login')
      .as('userLogin');

    cy.visit('/app/login/');

    // preencher o input usuario
    cy.get('#formCadastro input[name="usuario"]').type('LuckPou');

    // preencher o input senha
    cy.get('#formCadastro input[name="senha"]').type('123456');

    // clica no botao de login
    cy.get('#formCadastro button[type="submit"]').click();

    // o que esperamos? ir para /app/profile
    cy.url().should('include', '/app/profile');

    // temos o token?
    cy.wait('@userLogin')
      .then((intercept) => {
        // token server
        const { token } = intercept.response.body.data;

        cy.getCookie('APP_TOKEN')
          .should('exist')
          // é igual ao do server
          .should('have.property', 'value', token);
      });
  });
});
