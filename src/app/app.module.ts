import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarMonthViewComponent } from './shared/modules/calendar-module/month/calendar-month-view/calendar-month-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarMonthViewHeaderComponent } from './shared/modules/calendar-module/month/calendar-month-view-header/calendar-month-view-header.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarMonthViewComponent,
    DashboardComponent,
    CalendarMonthViewHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
