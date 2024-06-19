import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './demo/service/authentication.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
              provide: JWT_OPTIONS,
              useValue: {
                tokenGetter: () => {
                  return localStorage.getItem('token');
                },
              //  allowedDomains: ['your-api-domain.com'], // Optional: Specify the domain where your API is hosted
               // disallowedRoutes: ['example.com/auth/token'], // Optional: Specify routes where tokens should not be sent
              },
            },
          }),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,AuthenticationService,JwtHelperService
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
      ],
})
export class AppModule { }
