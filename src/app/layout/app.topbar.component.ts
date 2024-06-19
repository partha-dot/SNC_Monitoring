import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';

import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthenticationService } from '../demo/service/authentication.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    
    providers: [ConfirmationService, MessageService]
})
export class AppTopBarComponent implements OnInit{

    // items!: MenuItem[];
    menuItems: MenuItem[] = [];
    user:any;
    visible: boolean = false;
    date: Date[] | undefined;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService,public layoutService: LayoutService,private router: Router, private authService:AuthenticationService) { }
    
    ngOnInit(): void {
        
        this.menuItems = [
            {
                label: 'Save', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Update', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Delete', icon: 'pi pi-fw pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Home', icon: 'pi pi-fw pi-home'
            },
        ];
        this.user=localStorage.getItem('user')
    }
    logOut(){
       
        // localStorage.clear();
        // this.router.navigate(['/']);
    }
    

    showDialog() {
        this.visible = true;
    }
    
    confirm1(event: Event) {
        debugger
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to Logout?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.authService.logout();
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected Logout', life: 3000 });
            }
        });
    }

    
}
