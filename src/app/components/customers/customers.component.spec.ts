import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import { CustomersComponent } from './customers.component';
import {CustomerService} from '../../services/customer/customer.service';
import {Customer} from './customer';
import {Observable, of} from 'rxjs';
import {DebugElement, Directive, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {AppComponent} from '../../app.component';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let getCustomerSpy: jasmine.Spy;
  let testEl: HTMLElement;
  let linkDes: DebugElement[];
  let routerLinks: RouterLinkDirectiveStub[];
  const customersList = [
    {id: 1, name: 'Max', address: 'Ukraine', phone: '102', createdAt: null, updatedAt: null},
    {id: 2, name: 'Bob', address: 'Poland', phone: '103', createdAt: null, updatedAt: null}
  ] as Customer[];

  beforeEach(() => {
    // Create a fake TwainService object with a `getQuote()` spy
    const customerService = jasmine.createSpyObj('CustomerService', {
      'getCustomers': new Observable()
    });
    // Make the spy return a synchronous Observable with the test data
    getCustomerSpy = customerService.getCustomers.and.returnValue( of(customersList) );

    TestBed.configureTestingModule({
      declarations: [
        CustomersComponent,
        AppComponent
      ],
      providers:    [
        { provide: CustomerService, useValue: customerService }
      ],
      imports: [
         FormsModule,
        RouterTestingModule,
        ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    testEl = fixture.nativeElement.querySelector('.test');
    fixture.detectChanges();
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('Can get RouterLinks from template', () => {
    fixture.detectChanges();
    expect(routerLinks[0].linkParams).toBeTruthy('should be true');

  });
});
