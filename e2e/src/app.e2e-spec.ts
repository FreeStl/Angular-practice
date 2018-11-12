import { AppPage } from './app.po';
import {CustomerPage} from './pages/customers.page';
import {browser, by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let customerPage: CustomerPage;

  beforeEach(() => {
    page = new AppPage();
    customerPage = new CustomerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to sombra-angular-test!');
  });

  it('The list head should present', () => {
    customerPage.navigateTo();
    expect(customerPage.getliTitle()).toBeTruthy('Expected to be truth');
  });

  it('Add Customer button should open new customer form', () => {
    customerPage.navigateTo();
    expect(customerPage.getFormStatus()).toBeFalsy('Expected to be false');
    customerPage.pressAddButton();
    expect(customerPage.getFormStatus()).toBeTruthy('Expected to be truth');
  });
/*
  it('should display  message', () => {
    customerPage.pressAddButton();
    const settingNewCustomer = customerPage.setNewCustomer('Max', 'Ukraine', 101);
    browser.wait(settingNewCustomer, 4000);
    const el = browser.switchTo().frame(element(by.css('message-position')).getWebElement());
    expect(el).toBeTruthy( 'Customer should be created');
  });
*/
});

