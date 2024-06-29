describe("Log in", () => {
	it("Logs in succesfully", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-cy="formname"]').type("Luca");
		cy.get("#formBasicPassword").type("parola123");

		cy.contains("Submit").click();

		//for testing that the user has landed on the main page
		cy.contains("Luca");
	});

	it("Logs in incorectly", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-cy="formname"]').type("Luca");
		cy.get("#formBasicPassword").type("parolaGresita");

		cy.contains("Submit").click();

		cy.contains("Sign Up");
	});
});

describe("Sign Up", () => {
	it("Should navigate to Sign up page", () => {
		cy.visit("http://localhost:3000");

		cy.contains("Sign Up").click();
		cy.url().should("include", "/auth");
	});

	it("Should sign up correctly", () => {
		cy.visit("http://localhost:3000/auth");

		cy.get("#formBasicName").type("John Doe");
		cy.get("#formBasicAge").type("30");
		cy.get("#formBasicSalary").type("50000");
		cy.get("#formBasicPassword").type("password123");

		cy.contains("Submit").click();

		cy.url().should("include", "/home");
	});

	it("Should sign up incorrectly", () => {
		cy.visit("http://localhost:3000/auth");

		cy.get("#formBasicName").type("Jane Doe");
		cy.get("#formBasicAge").type("25");
		// Omitting salary
		cy.get("#formBasicPassword").type("password123");

		cy.contains("Submit").click();

		cy.url().should("include", "/auth");
	});
});

describe("Main page as a user", () => {
	it("Should log in as the new user created", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-cy="formname"]').type("John Doe");
		cy.get("#formBasicPassword").type("password123");

		cy.contains("Submit").click();
		cy.contains("John Doe");
	});

	it("Logs in as Admin and delete the last user added", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-cy="formname"]').type("Luca");
		cy.get("#formBasicPassword").type("parola123");

		cy.contains("Submit").click();

		cy.contains("Luca");
		cy.get("#dJohn\\ Doe").click();
	});
});
