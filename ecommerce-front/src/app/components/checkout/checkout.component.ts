import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

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
    } else {
      console.log("Handling the submit button");
      console.log("Customer Information:", this.checkoutFormGroup.get('customer')?.value);
      console.log("Shipping Address:", this.checkoutFormGroup.get('shippingAddress')?.value);
      console.log("Billing Address:", this.checkoutFormGroup.get('billingAddress')?.value);
      console.log("Credit Card Details:", this.checkoutFormGroup.get('creditCard')?.value);
      console.log("The email address is " + this.checkoutFormGroup.get('customer')?.value.email);
    }
  }
}
