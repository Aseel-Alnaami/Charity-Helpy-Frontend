import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShearedModule } from './sheared/sheared.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CharitiesComponent } from './charities/charities.component';
import { MapComponent } from './user/map/map.component';
import { UserModule } from './user/user.module';
import { HomeService } from './Services/home.service';
import { FAQComponent } from './faq/faq.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { tokenInterceptor } from 'src/Interceptor/token-Interceptor';
// import { tokenInterceptor } from 'src/Interceptor/token-Interceptor';
// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactusComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    CharitiesComponent,
    FAQComponent,
    PaymentSuccessComponent
    // AdminLayoutComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShearedModule,
    FormsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    UserModule
  ],
  providers: [
    HomeService,
    { 
        provide: HTTP_INTERCEPTORS,
        useClass: tokenInterceptor,
        multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
