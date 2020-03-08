import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IbanComponent } from './iban/iban.component';

const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: 'home', component: IbanComponent },
{path: 'iban', component: IbanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
	}
