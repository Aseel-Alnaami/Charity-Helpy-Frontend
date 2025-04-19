import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthModule } from './auth/auth.module';
import { ContactusComponent } from './contactus/contactus.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './user/profile/profile.component';
import { UserModule } from './user/user.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CharitiesComponent } from './charities/charities.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { athurizationGuard } from './authorization.guard';

// import { AppRoutingModule } from './app-routing.module';

// const routes: Routes = [
//   {
//     path:'',
//     component:HomeComponent
    
//     }
//     ,{
//       path:'about',
//       component:AboutComponent
      
//      },{
//       path:'contactus',
//       component:ContactusComponent
      
//      } ,{

//       path:'auth',
//       loadChildren:()=>AuthModule
//       }
  
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactusComponent },
      { path: 'charity', component: CharitiesComponent},{
        path:'payment-success',
        component:PaymentSuccessComponent
      }
      ,{
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [athurizationGuard]
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
    { path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      canActivate: [athurizationGuard]
    }
    ]
  }
  // ,{
  //   path:'user',
  //   loadChildren:()=>UserModule
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

