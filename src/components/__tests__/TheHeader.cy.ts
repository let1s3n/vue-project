import TheHeader from "../TheHeader.vue";

describe("TheHeader", () => {
  it("playground", () => {
    cy.mount(TheHeader, { props: { msg: "Rick and Morty Finder" } });
  });

  it("renders properly", () => {
    cy.mount(TheHeader, { props: { msg: "Rick and Morty Finder" } });
    cy.get("h1").should("contain", "Rick and Morty Finder");
  });
});
