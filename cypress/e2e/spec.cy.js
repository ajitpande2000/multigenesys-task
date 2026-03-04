describe('Test Multigenesys Task', () => {
   beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.wait(2000)
  });
  it('Add New Employee.', () => {
   cy.fixture('employee.json').as('formData'); 
   cy.get('@formData').then((formData) => {   
    cy.contains('Add New Employee').click();
    cy.get('input[placeholder="Enter full name"]').type(formData.newEmployee.name); 
    cy.get('input[name="emailId"]').clear().type(formData.newEmployee.emailId);  
    cy.get('input[name="mobile"]').clear().type(formData.newEmployee.mobile); 
    cy.get('input[name="state"]').clear().type(formData.newEmployee.state); 
    cy.get('textarea[name="district"]').clear().type(formData.newEmployee.district);   
    cy.get('[name="countryId"]').parent().click(); 
    cy.get('[role="option"]').eq(2).click();
    cy.contains('Create Employee').click();
     cy.wait(1000)
    cy.contains('[aria-label="employee table"]', formData.newEmployee.name).should('exist');   
  });
  })

  it('Update Employee Data.',()=>{
       cy.fixture('employee.json').as('formData'); 
       cy.get('@formData').then((formData) => {  
       cy.wait(1000)
       cy.get('[aria-label="employee table"] tbody tr')
         .first().find('svg[data-testid="EditIcon"] path[d*="17.25V21"]').click({ force: true });
       cy.get('input[placeholder="Enter full name"]').clear()
       cy.get('input[placeholder="Enter full name"]').type(formData.editEmployee.name);
       cy.get('input[name="emailId"]').clear().type(formData.editEmployee.emailId);  
       cy.get('input[name="mobile"]').clear().type(formData.editEmployee.mobile); 
       cy.get('input[name="state"]').clear().type(formData.editEmployee.state); 
       cy.get('textarea[name="district"]').clear().type(formData.editEmployee.district); 
       cy.get('[name="countryId"]').parent().click(); 
       cy.get('[role="option"]').eq(2).click();
       cy.contains('Update Employee').click();
       cy.wait(1000)
       cy.contains('[aria-label="employee table"]', formData.editEmployee.name).should('exist');  
        })
  })

    it('Search By Id And Delete Employee Data.',()=>{  
        cy.wait(1000) 
        cy.fixture('employee.json').as('formData'); 
       cy.get('@formData').then((formData) => { 
          cy.get('input[placeholder="Search employee by Id"]').clear().type(formData.searchAndDeleteEmployee.id)
          cy.get('[aria-label="employee table"] tbody tr')
          cy.get('[data-testid="DeleteIcon"]').first().click();         
          cy.wait(1000)
          cy.contains('Delete Employee').click();
          cy.wait(1000)           
          cy.get('input[placeholder="Search employee by Id"]').clear().type(formData.searchAndDeleteEmployee.id)
          cy.contains('[aria-label="employee table"]', formData.searchAndDeleteEmployee.id).should('not.exist');  
        })  
         
         
  })  
})