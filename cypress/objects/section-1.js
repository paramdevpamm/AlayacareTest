const Section1 = {
    /**
     * A literal is considered static, stable strings (eg. titles, form labels, ...)
     */
    literals: {
        SAMPLE_LITERAL: 'This is a sample literal. You can safely delete it.',
    },

    /**
     * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
     */
    elements: {        
        showTableButton: "#table-toggle-button",
        tableID: "#alaya-table",
        tableHeader: ".table-header",
        countColumns: "#alaya-table>tbody>tr.table-header>th",
        countRows: "#alaya-table>tbody>tr",
        totalColumns: "#alaya-table>tbody>tr>th",
        roleColumn: "#alaya-table>tbody>tr th:nth-child(4)",
        DOBColumn: "#alaya-table>tbody>tr th:nth-child(3)",
        formID: "#alaya-form",
        showFormButton: "#form-toggle-button",
        formNameInput: "#fullName",
        formAgeInput: "#age",
        formGenderDropDown: "#gender",
        formNurseCheckBox: "#nurse",
        formSubmitButton:"#submit"
    },

    /**
     * An action should be pretty self explanatory! It consists of all the method performing
     * a particular action from clicking a simple button to doing complex assertions.
     */
    actions: {
        /**
         * Example of action.
         * In this example, we are grabbing a sample element, clicking on it and asserting the api answer.
         *
         * This is only used as an example and can be safely deleted.
         */
        async clickOnShowTableButton() {
                await cy.get(Section1.elements.showTableButton).click()
        },

        async clickOnShowFormButton() {
            await cy.get(Section1.elements.showFormButton).click()
        },

        async enterNameInFormAndValidateItsPoplated(name) {
            await cy.get(Section1.elements.formID).within(($form) => {
                cy.get(Section1.elements.formNameInput).type('testing').should('have.value', 'testing')
            })
           
        },

        async enterAgeInFormAndValidateItsPoplated(age) {
            await cy.get(Section1.elements.formID).within(($form) => {
                cy.get(Section1.elements.formNameInput).type(age).should('have.value', age)
            })
        },

        async selectGenderInFormAndValidateItsValueIsSelectedProperly(gender) {
            await cy.get(Section1.elements.formID).within(($form) => {
                cy.get('select').select(gender)
                cy.get('select#gender option:selected').should('have.text', gender)
            })
        },      

        async clickOnCheckBoxOfNurseAndValidateItsValue() {
            await cy.get(Section1.elements.formID).within(($form) => {
                cy.get(Section1.elements.formNurseCheckBox).check({
                    force: true
                }).should('be.checked')
            })
        },

        async clickOnSubmitButtonOnFormAndValidateThePopUp() {
            await cy.get(Section1.elements.formID).within(($form) => {
                cy.get(Section1.elements.formSubmitButton).click()
                cy.on('window:alert', 'Form submitted!')
            })
        },

        async assertTableButtonIsPresentOrNot() {
            await cy.get(Section1.elements.showTableButton).should('be.visible')
        },

        async assertTableIsPresentOrNot() {
            await cy.get(Section1.elements.tableID).should('not.be.visible')
        }, 
        async assertTableHasExpectedNumberOfColumns() {            
           await cy.get(Section1.elements.countColumns).should('have.length', 5)
        },

        async assertTableHasExpectedNumberOfRows() {
            await cy.get((Section1.elements.countRows)-1).should('have.length', 10)
        },

        async assertIDAdminHasIDas1() {
            await cy.get(Section1.elements.countRows).contains('admin').parent().within(function ()
            {
                cy.get('th').eq(0).should('contain.text', '1')
            }
            )
        },

        async assertRoleUserIsAssignedToMoreThan5Users()
        {
            var count = 0;
            await cy.get(Section1.elements.totalColumns).each(($e) => {
                console.log($e.text())
                if (cy.get($e).should('contain.text', 'user')) {
                    count++
                }

            })
            expect(count).to.be.greaterThan(5)
        },

        async assertExactly3PeopleAreOlderThan60() {
            var count = 0;
            const dateToday = new Date()
            const timestamp = epoch(dateToday)
            await cy.get(Section1.elements.countRows).parent().within(function () {
                cy.get('th').eq(3).each(($e) => {
                    var dob = epoch(new Date($e.text))
                    if ((timestamp - dob > 1893415560)) {
                        count ++
                    }
                })
            }
            )
            expect(count).to.be(3)
        },

        async assertFormIsNotVisibleByDefault() {
            await cy.get(Section1.elements.formID).should('not.be.visible')
        },

        async assertFormIsVisibleAfterClickingOnShowForm() {
            await cy.get(Section1.elements.formID).should('be.visible')
        },
    },
}

module.exports = { Section1 }