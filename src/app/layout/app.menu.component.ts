import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    u_type:any
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.u_type=localStorage.getItem("u_type");
        if(this.u_type!="0"){
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Live Data', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] },
    
                        { label: 'Report', icon: 'pi pi-book', routerLink: ['/app/outlet/report'] },
                    ]
                }]
        }
        else{
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Live Data', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] },
    
                        { label: 'Report', icon: 'pi pi-book', routerLink: ['/app/outlet/report'] },
                    ]
                },
                {
                    label: 'Master',
                    items: [
                       {
                            label: 'Master',
                            icon: 'pi pi-spin pi-cog',
                            items: [
                                {
                                    label: 'Add Organization',
                                    icon: 'pi pi-building',
                                    routerLink: ['/app/outlet/org'] 
                                },
                                {
                                    label: 'Add User',
                                    icon: 'pi pi-users',
                                    routerLink: ['/app/outlet/usr'] 
                                },
                                
                                // {
                                //     label: 'Model',
                                //     icon: 'pi pi-box',
                                //     routerLink: ['/app/outlet/model'] 
                                // },
                                // { label: 'Barcode Generate', 
                                // icon: 'pi pi-qrcode', 
                                // routerLink: ['/app/outlet/barcode'] },
                            ]
                        }
                    ]
                },
                {
                    label: 'Device Management',
                    items: [
                        {label: 'Device Management',
                            icon: 'pi pi-desktop',
                            items: [
                                {
                                    label: 'Single',
                                    icon: 'pi pi-stop',
                                    routerLink: ['/app/outlet/device_s']
                                },
                                // {
                                //     label: 'Multiple',
                                //     icon: 'pi pi-clone',
                                //     routerLink: ['/app/outlet/device_m'] 
                                // }
                            ]}
    
                    ]
                },
                // {
                //     label: 'Billing',
                //     items: [
                //         { label: 'Bill Generate', icon: 'pi pi-book', routerLink: ['/app/outlet/bill_generator'] },
                //         { label: 'View & Edit Bill', icon: 'pi pi-file-edit', routerLink: ['/app/outlet/mybill'] },
                        // {label: 'Report',
                        //     icon: 'pi pi-book',
                        //     items: [
                        //         {
                        //             label: 'My Bill',
                        //             icon: 'pi pi-copy',
                        //             routerLink: ['/app/outlet/mybill'] 
                        //         },
                        //         {
                        //             label: 'Product Summary',
                        //             icon: 'pi pi-gift',
                        //             routerLink: ['/app/outlet/product'] 
                        //         }]}
    
                    // ]
                // }
                // ,{
                //     label: 'Customer',
                //     items: [
                //         { label: 'Customers Details', icon: 'pi pi-users', routerLink: ['/app/outlet/All_Customer'] },
                //         // { label: 'Add Customer',icon: 'pi pi-users',routerLink: ['/app/outlet/AddCustomer'] },
                //         {
                //             label: 'Dealer Details',
                //             icon: 'pi pi-user',
                //             routerLink: ['/app/outlet/AddDealer'] 
                //         }
                    //     { label: 'Edit Bill', icon: 'pi pi-file-edit', routerLink: ['/app/outlet/charts'] },
                    //     {label: 'Report',
                    //         icon: 'pi pi-book',
                    //         items: [
                    //             {
                    //                 label: 'My Bill',
                    //                 icon: 'pi pi-copy',
                    //                 routerLink: ['/app/outlet/mybill'] 
                    //             },
                    //             {
                    //                 label: 'Product Summary',
                    //                 icon: 'pi pi-gift',
                    //                 routerLink: ['/app/outlet/product'] 
                    //             }]}
    
                //      ]
                // },
                // {
                //     label: 'Utilities',
                //     items: [
                //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                //     ]
                // },
                // {
                //     label: 'Pages',
                //     icon: 'pi pi-fw pi-briefcase',
                //     items: [
                //         {
                //             label: 'Landing',
                //             icon: 'pi pi-fw pi-globe',
                //             routerLink: ['/landing']
                //         },
                //         {
                //             label: 'Auth',
                //             icon: 'pi pi-fw pi-user',
                //             items: [
                //                 {
                //                     label: 'Login',
                //                     icon: 'pi pi-fw pi-sign-in',
                //                     routerLink: ['/auth/login']
                //                 },
                //                 {
                //                     label: 'Error',
                //                     icon: 'pi pi-fw pi-times-circle',
                //                     routerLink: ['/auth/error']
                //                 },
                //                 {
                //                     label: 'Access Denied',
                //                     icon: 'pi pi-fw pi-lock',
                //                     routerLink: ['/auth/access']
                //                 }
                //             ]
                //         },
                //         {
                //             label: 'Crud',
                //             icon: 'pi pi-fw pi-pencil',
                //             routerLink: ['/app/pages/crud']
                //         },
                //         {
                //             label: 'Timeline',
                //             icon: 'pi pi-fw pi-calendar',
                //             routerLink: ['/app/pages/timeline']
                //         },
                //         {
                //             label: 'Not Found',
                //             icon: 'pi pi-fw pi-exclamation-circle',
                //             routerLink: ['/notfound']
                //         },
                //         {
                //             label: 'Empty',
                //             icon: 'pi pi-fw pi-circle-off',
                //             routerLink: ['/app/pages/empty']
                //         },
                //     ]
                // },
                // {
                //     label: 'Hierarchy',
                //     items: [
                //         {
                //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                //             items: [
                //                 {
                //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                //                     items: [
                //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                //                     ]
                //                 },
                //                 {
                //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                //                     items: [
                //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                //                     ]
                //                 },
                //             ]
                //         },
                //         {
                //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                //             items: [
                //                 {
                //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                //                     items: [
                //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                //                     ]
                //                 },
                //                 {
                //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                //                     items: [
                //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                //                     ]
                //                 },
                //             ]
                //         }
                //     ]
                // },
                // {
                //     label: 'Get Started',
                //     items: [
                //         {
                //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                //         },
                //         {
                //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                //         }
                //     ]
                // }
            ];
        }
        
    }
}
