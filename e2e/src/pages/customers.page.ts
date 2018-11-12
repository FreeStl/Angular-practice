import { element, browser, by, Key } from 'protractor';

export class CustomerPage {
  navigateTo() {
    return browser.get('/customers');
  }

  getliTitle() {
    return element(by.css('.li-title'));
  }
  getFormStatus() {
    return element(by.css('.show-page .form-display')).getCssValue('display')
      .then((val) => {
        if (val === 'none') return false;
        else return true;
      });
  }

  pressAddButton(): void {
    element(by.buttonText('Add customer')).click();
  }

  /*
  setNewCustomer(name: string, address: string, phone: number) {
    const nameField = element(by.name('name'));
    const addressField = element(by.name('address'));
    const phoneField = element(by.name('phone'));

    nameField.clear().then(() => {
      nameField.sendKeys(name);
    });

    addressField.clear().then(() => {
      addressField.sendKeys(address);
    });

    phoneField.clear().then(() => {
      phoneField.sendKeys(phone);
    });

    return element(by.buttonText('Submit')).click();
  }
  */
}
