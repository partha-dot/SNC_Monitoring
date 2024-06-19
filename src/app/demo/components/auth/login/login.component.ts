import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/demo/service/api.service';
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit{

    valCheck: string[] = ['remember'];
    userForm: FormGroup;
    spinner:boolean=false;
    password!: string;
    ct:any

    constructor( private messageService: MessageService, public layoutService: LayoutService,private apiService: ApiService,private fb: FormBuilder,private router: Router) { 
        this.userForm = this.fb.group({
            // Define your form controls here
            mail: ['', Validators.required],
            pass: ['', Validators.required]
            // Add more controls as needed
          });
    }
    ngOnInit(): void {
        localStorage.clear();
        this.ct=this.userForm.controls
    }
    
    loginCall() {
        const requestData = {
          email:this.ct.mail.value,
          password:this.ct.pass.value,
        };
        this.spinner=true;
        this.apiService.login(requestData).subscribe(
          (response) => {
            if(response.success==true){
              this.spinner=false;
              const data=response.data;
              this.apiService.token=data.token;
              localStorage.setItem('token',data.token);
              localStorage.setItem('user',data.user.name);
              localStorage.setItem('email',data.user.email);
              localStorage.setItem('phone',data.user.mobile_no);
              localStorage.setItem('u_type',data.user.user_type);
              this.router.navigate(['/app/dashboard']);
              debugger
            }
            else{
                  this.spinner=false;
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong username or password !!', life: 3000 });
              
            }
            console.log('Response:', response);
            // Handle response here
          },
          (error) => {
            console.error('Error:', error);
            this.spinner=false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong username or password !!', life: 3000 });

          }
        );
      }
}
