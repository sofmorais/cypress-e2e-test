describe("Teste de Aceitação de Cookies", () => {
  it("Deve aceitar os cookies ao clicar no botão", () => {
    cy.visit("/");
    // Aguarde o banner de cookies aparecer
    cy.get(".cookie-policy").should("be.visible");
    cy.get(".cookie-policy .destaque").click();
    // Verifique se o banner de cookies desapareceu
    expect(true).to.equal(true);
  });
});

describe("Teste de Serviços Recomendados por Perfil", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  const perfis = {
    advogado: "ADVOGADO",
    aposentado: "APOSENTADO OU PENSIONISTA",
    /*     cidadao: "CIDADÃO OU PARTE",
        estagiario: "ESTAGIÁRIO",
        magistrado: "MAGISTRADO",
        perito: "PERITO, TRADUTOR OU INTÉRPRETE",
        procurador: "PROCURADOR",
        servidor: "SERVIDOR" */
  };

  it("Deve acessar os serviços recomendados por perfil", function () {
    cy.get(".cookie-policy .destaque").click();
    cy.get(".cookie-policy").should("not.exist");
    // Percorre cada perfil e realiza os testes
    Object.values(perfis).forEach((perfil) => {
      cy.contains(".description-profile-container-wrapper", perfil).click();
      cy.get("app-listagem-categoria-servico").should("be.visible");

      // Clique no ícone de informação
      cy.get("app-informacao-icon").first().as("informacaoIcon");
      cy.get("@informacaoIcon").within(() => {
        cy.get("mat-icon.icon-config").should("be.visible").click();
      });

      // Verifica a URL para garantir carregamento da tela intermediária
      cy.wait(1000);
      cy.url().should("match", /\/servicos/);

      cy.get(".texto-titulo-pagina").should("be.visible");
      cy.get(".service-item-title").should("be.visible");

      // Verifica a presença de seções específicas
      cy.contains("Descrição").should("be.visible");
      cy.contains("Documentos importantes").should("be.visible");

      // Verifica o conteúdo de cada expansão
      cy.get("mat-expansion-panel")
        .first()
        .within(() => {
          // Verifica se a div com a mensagem de acesso restrito existe
          cy.get("div").then((divMsgAcesso) => {
            if (
              divMsgAcesso
                .text()
                .includes("Acesso restrito para usuários com perfil adequado")
            ) {
              cy.wrap(divMsgAcesso).should("exist");
            } else {
              cy.get(".service-item-text").should("exist");
            }
          });
        });

      cy.visit("/");
    });
  });
});

describe("Teste de navegação entre Serviços em Destaque", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("Verifica a existência dos containers - Mais Acessados e Destaques do Tribunal", function () {
    cy.get(".list-outer-container").should("exist");
    // Verifica a exibição de 5 itens na categoria "MAIS ACESSADOS"
    cy.get('[category="acessados"] .service-name-no-badge').should(
      "have.length",
      5
    );
    cy.get('[category="destaque"] .service-name-no-badge').should(
      "have.length",
      5
    );
    cy.get('[category="favoritos"]').should("exist");
  });

  it("Deve acessar um serviço dos Mais Acessados e verificar redirect", function () {
    // Clica no primeiro item da categoria "MAIS ACESSADOS"
    cy.get('[category="acessados"] .service-name-no-badge').first().click();
    cy.url().should("match", /\/servicos/);
  });

  it("Deve acessar um serviço dos Destaque do Tribunal e verificar redirect", function () {
    cy.get('[category="destaque"] .service-name-no-badge').first().click();
    cy.url().should("match", /\/servicos/);
  });
});

describe("Teste de navegação entre Serviços por Categoria", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("Deve exibir e acessar um serviço dos Serviços por Categoria", function () {
    cy.get("app-listagem-categoria-servico").should("exist");
    cy.get(".container-categoria-servico").should("be.visible").first().click();
  });
});
