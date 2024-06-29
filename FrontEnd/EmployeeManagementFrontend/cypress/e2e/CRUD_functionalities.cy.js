describe("USER CRUD", () => {
	it("Logs in succesfully as admin Luca and perform CRUD on users", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-cy="formname"]').type("Luca");
		cy.get("#formBasicPassword").type("parola123");

		cy.contains("Submit").click();
		cy.contains("Luca");

		cy.get("#uLuca").click();
		cy.get("#formBasicAge").clear().type("150");
		cy.contains("Update").click();
		cy.contains("Luca").click();
		cy.contains("150");

		cy.contains("Back").click();

		//revert the update
		cy.get("#uLuca").click();
		cy.get("#formBasicAge").clear().type("200");
		cy.contains("Update").click();
	});

	it("A user should fail to make changes", () => {
		cy.visit("http://localhost:3000/auth");

		cy.get("#formBasicName").type("User");
		cy.get("#formBasicAge").type("30");
		cy.get("#formBasicSalary").type("50000");
		cy.get("#formBasicPassword").type("password123");

		cy.contains("Submit").click();
		cy.url().should("include", "/home");

		//user tries to make a change on an admin
		cy.contains("Luca");
		cy.get("#dLuca").click();
		cy.contains("Luca");
	});

	it("A manager should successfully make changes to a user and unsuccessfully to an admin", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-cy="formname"]').type("Manager");
		cy.get("#formBasicPassword").type("123");

		cy.contains("Submit").click();
		cy.url().should("include", "/home");
		cy.contains("User");
		cy.contains("Luca");

		cy.get("#dUser").click();
		cy.contains("User").should("not.exist");

		cy.get("#dLuca").click();
		cy.contains("Luca").should("exist");
	});
});

describe("PET CRUD", () => {
	it("Logs in succesfully as admin Luca and perform CRUD on pet", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-cy="formname"]').type("Luca");
		cy.get("#formBasicPassword").type("parola123");

		cy.contains("Submit").click();

		//for testing that the user has landed on the main page
		cy.contains("Luca").click();

		cy.contains("Id: 1");

		cy.contains("Create").click();

		cy.get("#formBasicUid").type("1");
		cy.get("#formBasicName").type("Test dog");
		cy.contains("Submit").click();

		cy.contains("Test dog").click();
		cy.contains("Name: Test dog");

		cy.go("back");

		cy.get("#uTest\\ dog").click();
		cy.get("#formBasicName").clear().type("Doggo");
		cy.contains("Submit").click();

		cy.get("#dDoggo").click();
	});
});
