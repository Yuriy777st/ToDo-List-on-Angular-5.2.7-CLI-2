import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './/app-routing.module';
import { EditComponent } from './edit/edit.component';
import { MyGuardGuard } from './my-guard.guard';
import { AuthenticationService } from './authentication-service.service';
import { TodoService } from './todo.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    NotFoundComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    OrderModule
  ],
  providers: [
      MyGuardGuard,
      AuthenticationService,
      TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
