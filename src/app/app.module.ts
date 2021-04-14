import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChartsModule } from 'ng2-charts';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LineChartComponent } from './body/dashboard/line-chart/line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GaugeChartComponent } from './body/dashboard/gauge-chart/gauge-chart.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './body/settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxLineComponent } from './body/dashboard/ngx-line/ngx-line.component';
import { ChartjsLineComponent } from './body/dashboard/chartjs-line/chartjs-line.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuBarComponent,
    BodyComponent,
    DashboardComponent,
    LineChartComponent,
    GaugeChartComponent,
    SettingsComponent,
    NgxLineComponent,
    ChartjsLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatTableModule,
    MatGridListModule,
    MatSidenavModule,
    MatTabsModule,
    NgApexchartsModule,
    NgxChartsModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    ChartsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
