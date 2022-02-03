import { NgModule } from '@angular/core';
   import { RouterModule, Routes } from '@angular/router';
import { PriceCalculatorComponent } from '../Pages/Views/price-calculator/price-calculator.component';

   const routes: Routes = [
   {
   path: '',
   component: PriceCalculatorComponent,
   },
   ];

   @NgModule({
   imports: [
   RouterModule.forRoot(routes)
   ],
   exports: [
   RouterModule
   ],
   declarations: []
   })
   export class AppRoutingModule { }