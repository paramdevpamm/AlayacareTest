
const { Section1 } = require('../objects/section-1')

describe('Section 1 DOM table', () => {
    beforeEach(async () => {
        await cy.visit('section-1');
    })


    it('Show Table Button is displayed', async () => {
        await Section1.actions.assertTableButtonIsPresentOrNot();
    })

    it('Assert Table is not present by default', async () => {
        await Section1.actions.assertTableIsPresentOrNot();
    })

    it('Assert Table has 5 Columns', async () => {
        await Section1.actions.clickOnShowTableButton();
        await Section1.actions.assertTableHasExpectedNumberOfColumns();
    })

    it('Assert Table has 10 rows', async () => {
        await Section1.actions.clickOnShowTableButton();
        await Section1.actions.assertTableHasExpectedNumberOfRows();
    })

    it('Validate that Admin has ID as 1', async () => {
        await Section1.actions.clickOnShowTableButton();
        await Section1.actions.assertIDAdminHasIDas1();
    })


    it('Validate that role user is assigned to greater than 5 user', async () => {
        await Section1.actions.clickOnShowTableButton();
        await Section1.actions.assertRoleUserIsAssignedToMoreThan5Users();
    })

    it('Validate exactly 3 people are older than 60', async () => {
        await Section1.actions.clickOnShowTableButton();
        await Section1.actions.assertExactly3PeopleAreOlderThan60();
    })
   })

  describe('Section 1 DOM Form', () => {
        beforeEach(async () => {
            await cy.visit('section-1');
        })

    it('Assert form is not visible', async () => {
        await Section1.actions.assertFormIsNotVisibleByDefault();
    })

    it('Validate form is visible after clicking on Show form button', async () => {
        await Section1.actions.clickOnShowFormButton();
        await Section1.actions.assertFormIsVisibleAfterClickingOnShowForm();
    })

    it('On Form section Fill in the Name and Age inputs, and assert that both inputs are filled', async() => {
        await Section1.actions.clickOnShowFormButton();
        await Section1.actions.enterNameInFormAndValidateItsPoplated('testing name');
        await Section1.actions.enterAgeInFormAndValidateItsPoplated('35');
    })

    it('On Form section Select Female from the select option, and assert that the value is female', async() => {
        await Section1.actions.clickOnShowFormButton();
        await Section1.actions.selectGenderInFormAndValidateItsValueIsSelectedProperly('female');
    })

    it('On Form section Tick the Nurse checkbox and assert that the value nurse is true', async() => {
        await Section1.actions.clickOnShowFormButton();
        await Section1.actions.clickOnCheckBoxOfNurseAndValidateItsValue();
    })

    it('On Form section Click on the Submit button and assert that there is an alert window showing with the text Form submitted!', async() => {
        await Section1.actions.clickOnShowFormButton();
        await Section1.actions.enterNameInFormAndValidateItsPoplated('testing name');
        await Section1.actions.enterAgeInFormAndValidateItsPoplated('35');
        await Section1.actions.clickOnCheckBoxOfNurseAndValidateItsValue('female');
        await Section1.actions.clickOnCheckBoxOfNurseAndValidateItsValue();
        await Section1.actions.clickOnSubmitButtonOnFormAndValidateThePopUp();
    })


})