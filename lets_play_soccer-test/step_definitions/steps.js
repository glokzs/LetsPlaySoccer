const { I } = inject();
// Add in your custom step files

Given('I have a defined step', () => {
  // TODO: replace with your own step
});

Given('я нахожусь на странице авторизации', () => {
  I.amOnPage('/login');
});


When('я ввожу {string} в поле {string}', (text, inputName) => {
  I.fillField({id: inputName}, text);
});

When('я нажимаю на кнопку {string}', (buttonName) => {
  I.click(buttonName);
});

Then('я вижу текст {string}', (text) => {
  I.see(text);
});
