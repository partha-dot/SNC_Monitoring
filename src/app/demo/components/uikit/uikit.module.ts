import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIkitRoutingModule } from './uikit-routing.module';
import { AuthenticationService } from '../../service/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
	imports: [
		CommonModule,
		UIkitRoutingModule,
		
	],
	declarations: [
	]
})
export class UIkitModule { }
