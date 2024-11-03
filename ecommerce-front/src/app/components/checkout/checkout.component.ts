import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CheckoutFormService } from '../../services/checkout-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private checkoutFormService: CheckoutFormService) { }
  ngOnInit(): void {

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years

    this.checkoutFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    this.checkoutFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

    
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  checkoutFormGroup = new FormGroup({
    customer: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    }),
    shippingAddress: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
    }),
    billingAddress: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
    }),
    creditCard: new FormGroup({
      cardType: new FormControl('', Validators.required),
      nameOnCard: new FormControl('', Validators.required),
      cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
      securityCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)]),
      expirationMonth: new FormControl('', Validators.required),
      expirationYear: new FormControl('', Validators.required)
    })
  });

  totalPrice: number = 0;
  totalQuantity: number = 0;

  copyShippingAddressToBillingAddress(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log("Checkbox changed:", target.checked);

    if (target.checked) {
      const shippingAddressValue = this.checkoutFormGroup.get('shippingAddress')?.value || {
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      };
      console.log("Copying shipping address to billing address:", shippingAddressValue);
      this.checkoutFormGroup.get('billingAddress')?.setValue(shippingAddressValue);
    } else {
      console.log("Resetting billing address");
      this.checkoutFormGroup.get('billingAddress')?.reset();
    }
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      console.log("Invalid form");
      console.log("this.checkoutFormGroup.markAllAsTouched()=");
      console.log(this.checkoutFormGroup.markAllAsTouched());
    } else {
      console.log("Handling the submit button");
      console.log("Customer Information:", this.checkoutFormGroup.get('customer')?.value);
      console.log("Shipping Address:", this.checkoutFormGroup.get('shippingAddress')?.value);
      console.log("Billing Address:", this.checkoutFormGroup.get('billingAddress')?.value);
      console.log("Credit Card Details:", this.checkoutFormGroup.get('creditCard')?.value);
      console.log("The email address is " + this.checkoutFormGroup.get('customer')?.value.email);
    }
  }
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    if (!creditCardFormGroup) {
      console.error('creditCardFormGroup is null');
      return;
    }
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    if (!formGroup) {
      console.error(`${formGroupName} formGroup is null`);
      return;
    }
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.checkoutFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup.get('state')!.setValue(data[0]);
      }
    );
  }


}
