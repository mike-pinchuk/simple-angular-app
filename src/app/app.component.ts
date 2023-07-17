import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { Response } from '../interfaces/response.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  productsData: any;

  currency = "$";

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit() {
    this.appService.getData().subscribe(data => this.productsData = data);
  }

  scrollTo(target: HTMLElement, burger?: Product): void {
    target.scrollIntoView({ behavior: "smooth" });

    if (burger) {
      this.form.patchValue({ order: `${burger.title} (${burger.price} ${this.currency})` })
    }
  }

  confirmOrder(): void {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value)
        .subscribe({
          next: (response: Partial<Response>) => {
            alert(response.message)
            this.form.reset();
          },
          error: (response: HttpErrorResponse) => {
            alert(response.error.message)
          }
        });
    }
  }

  changeCurrency(): void {
    let coefficient = 1;

    if (this.currency === "$") {
      this.currency = "₽";
      coefficient = 80;
    } else if (this.currency === "₽") {
      this.currency = "BYN";
      coefficient = 3;
    } else if (this.currency === 'BYN') {
      this.currency = '€';
      coefficient = 0.9;
    } else if (this.currency === '€') {
      this.currency = '¥';
      coefficient = 6.9;
    } else {
      this.currency = "$";
      coefficient = 1;
    }

    this.productsData.forEach((item: Product) => {
      item.price = +(item.basePrice * coefficient).toFixed(1);
    });
  }
}


