// Angular imports
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Project components imports
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// Project imports
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';


const appRoutes: Routes = [
  /*{
    path: '',
    component: HomeComponent // Default Route
  },*/
  {
    path: 'home',
    component: HomeComponent,   // Home Route
    canActivate: [AuthGuard] // Customer must NOT be logged in to view this route
  },
  /*{
    path: 'dashboard',
    component: DashboardComponent, // Dashboard Route,
    canActivate: [AuthGuard]       // Customer must be logged in to view this route
  },*/
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    canActivate: [NotAuthGuard]   // Customer must NOT be logged in to view this route
  },
  {
    path: 'login',
    component: LoginComponent,  // Login Route
    canActivate: [NotAuthGuard] // Customer must NOT be logged in to view this route
  },
 // { path: '**', component: HomeComponent } // "Catch-All" Route*/
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
