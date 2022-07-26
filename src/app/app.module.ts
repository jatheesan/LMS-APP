import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarMonthViewComponent } from './shared/modules/calendar-module/month/calendar-month-view/calendar-month-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarMonthViewHeaderComponent } from './shared/modules/calendar-module/month/calendar-month-view-header/calendar-month-view-header.component';
import { CalendarMonthCellComponent } from './shared/modules/calendar-module/month/calendar-month-cell/calendar-month-cell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MoreeventscartComponent } from './shared/modals/moreeventscart/moreeventscart.component';
import { AddLeaveComponent } from './shared/modals/leaves/add-leave/add-leave.component'; 
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    CalendarMonthViewComponent,
    DashboardComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthCellComponent,
    MoreeventscartComponent,
    AddLeaveComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
