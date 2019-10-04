const { I } = inject();

Given("я нахожусь на странице авторизации", () => {
  I.amOnPage('/login');
});

When("я ввожу {string} в поле {string}", (text, inputName) => {
  I.fillField({data: inputName}, text);
});

When("я ввожу {string} в поле {string}", (text, inputName) => {
  I.fillField({data: inputName}, text);
});

When('я надимаю кнопку {string}', (buttonName) => {
  I.click(buttonName);
});

Then('я попадаю на страницу созданых матчей', () => {
  I.amOnPage('/my/matches');
});