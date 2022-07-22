import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

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
import { MoreeventscartComponent } from './shared/modals/moreeventscart/moreeventscart.component'; 

@NgModule({
  declarations: [
    AppComponent,
    CalendarMonthViewComponent,
    DashboardComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthCellComponent,
    MoreeventscartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
