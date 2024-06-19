import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsDemoRoutingModule } from './chartsdemo-routing.module';
import { ChartModule } from 'primeng/chart'
import { ChartsDemoComponent } from './chartsdemo.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
@NgModule({
	imports: [
		CommonModule,
		ChartsDemoRoutingModule,
		ChartModule,
		CalendarModule,
		InputTextModule,
		ButtonModule,
		AutoCompleteModule,
		FormsModule,
		ReactiveFormsModule,
		ConfirmDialogModule,
		ToastModule,
		ToggleButtonModule
	],
	declarations: [ChartsDemoComponent]
})
export class ChartsDemoModule { }
