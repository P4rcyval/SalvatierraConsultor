import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecursosComponent } from './pages/recursos/recursos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: '**', redirectTo: '' }
];
