import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { CrudComponent } from '../../pages/crud/crud.component';
import { Customer } from 'src/app/demo/api/customer';
import { TreeNode } from 'primeng/api';
interface PageEvent {
    first: number;
    rows: number;
    page: number;
    last:number;
    pageCount: number;
  }
  interface Column {
    field: string;
    header: string;
}
@Component({
    templateUrl: './floatlabeldemo.component.html',
    providers: [DialogService, MessageService]
})
export class FloatLabelDemoComponent implements OnInit,OnDestroy  {
  selectedProduct2:any;
    stockIn: FormGroup;
    modelList:any=[];
    product_n:string;
    company_n:string;
    lastAddedIndex: number = -1;
    warr_in_month:any;
    modelID:any
    models!: any[];
    ct:any;
    stockListAll:any;
    stockList:any[]=[]
    stockApi:any
    product_store_id:number;
    spinner:boolean=false;

    first: number = 0;
    rows: number = 2;
    totalPGNO:number;
    goingPage:number;
    productDialog: boolean = false;

    products!: Customer[];

    product!: Customer;

    selectedProducts!: Customer[] | null;

    submitted: boolean = false;

    statuses!: any[];
    data1:any=[]
    devices!: any[];
    editdevices: any[]=[];
    companyList:any;
    companys:any[]=[];
    userList:any;
    users:any[]=[];
    users2:any[]=[];
    formGroup!: FormGroup;
    files!: TreeNode[];
    cols!: Column[];
    ref: DynamicDialogRef | undefined;
    @ViewChild('view', { static: true }) view: TemplateRef<any>;
    constructor(private api:ApiService,private productService: ProductService,private http:HttpClient,private billID:ProductService,
      public dialogService: DialogService, public messageService: MessageService) { }

    ngOnInit() {
      
    this.formGroup = new FormGroup({
      selectedDevices: new FormControl<any[] | null>([],),
      org_id: new FormControl<any>(['', Validators.required]),
      user_id: new FormControl<any>(['', Validators.required]),
        
    });
    this.ct=this.formGroup.controls;
    this.getuser();
      this.getDevice(); 
      this.getOrganization();
       this.getAllStock();

    
    }
    setUser(){
      this.users=[];
      this.users=this.users2.filter(e=>e.origination_id==this.ct.org_id.value)
        debugger
    }
    getuser(){
      const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      
        this.http.get(apiUrl+'/master/list-user', { headers }).subscribe(
            (response) => {
              console.log(response);
              this.userList=response
              this.users=this.userList.data 
              this.users2=this.userList.data 
              debugger
            },
            (error) => {
              console.error(error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'From Server Side!!', life: 3000 });
            }
            
          );
      }
    getAllStock(){
      this.spinner=true;
      this.totalPGNO=0;
      const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    
      this.http.get(apiUrl+'/assign-device/list-origination-to-device', { headers }).subscribe(
          (response) => {
            this.spinner=false;
            console.log(response);
            this.stockApi=response
            this.stockList=this.stockApi.data;
            this.stockList = this.stockList.sort((a, b) => a.origination_id - b.origination_id);
            debugger
          },
          (error) => {
            this.spinner=false;
            console.error(error);
          }
          
        );
}
    getOrganization(){
      const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        this.http.get(apiUrl+'/master/list-origination', { headers }).subscribe(
            (response) => {
              console.log(response);
              this.companyList=response
              this.companys=this.companyList.data 
              debugger
            },
            (error) => {
              console.error(error);
            }
          );
      }
getDevice(){

  const apiUrl = this.api.baseUrl;
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

  this.http.get(apiUrl+'/device/list', { headers }).subscribe(
      (response) => {
        console.log(response);
        
        this.modelList=response
        this.devices=this.modelList.data 
        for(let i=0;i<this.devices.length;i++){
          this.devices[i].assign_device_id=0;          
        }
        
      },
      (error) => {
        console.error(error);
      }
    );
    // const apiUrl = this.api.baseUrl;
    //   const token = localStorage.getItem('token');
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    
    //   this.http.get(apiUrl+'/master/model_name', { headers }).subscribe(
    //       (response) => {
    //         console.log(response);
    //         this.modelList=response
    //         this.models=this.modelList.data;
    //         debugger
    //       },
    //       (error) => {
    //         console.error(error);
    //       }
          
    //     );
}
    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.goingPage=event.page+1;
        this.loadNewPage(this.goingPage);
        debugger
      }
      loadNewPage(pageNo:Number){
        // const url="https://billing-application.wrongcode.in/api/stock/stock_product?page=2"
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
              const token = localStorage.getItem('token');
              const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
            
              this.http.get(apiUrl+'/report/my_bill?page='+pageNo, { headers }).subscribe(
                  (response) => {
                  this.spinner=false;
                  this.stockApi=response;
                    this.stockList=this.stockApi.data;
                    // this.stockList=this.stockListAll.data;
                    // this.totalPGNO=this.stockListAll.last_page;
                    debugger
                  })
      }
      getAllCustomer(){
        this.totalPGNO=0;
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
          
            this.http.get(apiUrl+'/customer/customer_list', { headers }).subscribe(
                (response) => {
                  this.spinner=false;
                  console.log(response);
                  this.stockApi=response
                  this.stockListAll=this.stockApi.data;
                    this.stockList=this.stockListAll.data;
                  this.totalPGNO=this.stockApi.total
                  debugger
                },
                (error) => {
                  this.spinner=false;
                  console.error(error);
                }
                
              );
      }
      searchAll(i:any){
      
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
              const token = localStorage.getItem('token');
              const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
            
              this.http.get(apiUrl+'/report/my_bill?page=1&search='+i.target.value.toString(), { headers }).subscribe(
                  (response) => {
                  this.spinner=false;
                  this.stockApi=response;
                    this.stockList=this.stockApi.data;
                    // this.stockList=this.stockListAll.data;
                    this.totalPGNO=this.stockApi.total;
                    // if(this.stockListAll.last_page>1){
                    //   this.first= 0;
                    //   this.rows= 20;
      
                    // }
                    debugger
                  })
      }
      hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    editProduct(products: Customer) {
      debugger
      this.product = { ...products };
      debugger
      this.productDialog = true;
  }
      openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }
      AddCompany(name,address,mobile){
        const credentials = {
            name:name,
            adress:address,
            mobile_no:mobile
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.http.post(apiUrl+'/customer/customer_add', credentials,{ headers }).subscribe(
            (response) => {
              if(response){
                this.hideDialog();
                console.log(response);
                debugger
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Assigned', life: 3000 });
                this.getAllStock();
              }
             
            },
            (error) => {
              console.error(error);
            }
          );
    }   
    DeleteCompany(id){
        const credentials = {
            company_id:id
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.http.post(apiUrl+'/master/delete_company_name', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Deleted', life: 3000 });
              this.getAllCustomer();
            },
            (error) => {
              console.error(error);
            }
          );
    }
      show(i:any) {
        this.billID.cust_id=0;
        this.billID.cust_id=i.id;
        debugger
        this.ref = this.dialogService.open(CrudComponent, {
            header: 'Customer Full Details',
            data: {
              id: i.cust_id
          },
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.subscribe((product: Product) => {
            if (product) {
                this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
            }
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
        
    }
    saveProduct() {
      this.submitted = true;
      this.productDialog = false;
      debugger
      this.ct.selectedDevices.value
      this.ct.org_id.value
      const dt={
        all_device:this.ct.selectedDevices.value,
        organization_id:this.ct.org_id.value,
        user_id:this.ct.user_id.value
      }
      debugger
      const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      this.http.post(apiUrl+'/assign-device/add-multiple-origination', dt,{ headers }).subscribe(
        (response) => {
          if(response){
            this.hideDialog();
            console.log(response);
            debugger
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Assigned', life: 3000 });
            this.getAllStock();
          }
         
        },
        (error) => {
          console.error(error);
        }
      );
      
      // this.AddCompany(this.product.name,this.product.adress,this.product.mobile_no)

      // if (this.product.name?.trim()) {
      //     if (this.product.id) {
      //         debugger
      //         this.updateCompany(this.product.id,this.product.name,this.product.adress,this.product.mobile_no)
      //         // this.products[this.findIndexById(this.product.company_id)] = this.product;
      //     } else {
      //         this.AddCompany(this.product.name,this.product.adress,this.product.mobile_no)
              
      //     }

      //     this.products = [...this.products];
      //     this.productDialog = false;
      //     this.product = {};
      // }
  }
  selectProduct(i:any){
        this.editdevices=[];
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        const data=this.stockList.filter(e=>e.origination_id==i)[0]
        debugger
        for(let i=0;i<data.assign_devices.length;i++){
          data.assign_devices[i].device;
          const dt=data.assign_devices[i].assign_device_id;
          data.assign_devices[i].device.assign_device_id=dt;
          debugger
          this.editdevices.push(data.assign_devices[i].device)
          
        }
        console.log(this.editdevices);
        debugger
        this.formGroup.patchValue({
          org_id: i,
          selectedDevices:  this.editdevices
        });
    debugger
  }
  updateCompany(id,name,add,mob){
    const credentials = {
        id:id,
        name:name,
        adress:add,
        mobile_no:mob
      };
    const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    debugger
    this.http.post(apiUrl+'/customer/customer_edit', credentials,{ headers }).subscribe(
        (response) => {
          this.hideDialog();
          console.log(response);
          debugger
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Updated', life: 3000 });
          this.getAllCustomer();
        },
        (error) => {
          console.error(error);
        }
      );
} 

      ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }}}
