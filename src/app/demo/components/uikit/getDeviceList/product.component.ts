import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, FilterService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from 'src/app/demo/api/company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Device } from 'src/app/demo/api/deviceDetails';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService, ConfirmationService , DatePipe]
})
export class ProductComponent implements OnInit{
  cities: any[] | undefined;

  selectedDevice: any | undefined;

  productDialog: boolean = false;

  products: Device[];

  product: Device=null;

  selectedProducts!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];
  data1:any=[]
  data2:any=[]
  fromDate:any='';
  toDate:any='';
  device:any='';
  reportData:FormGroup;
  spinner:boolean=false;
  fastLoading:number=0
  user_type:any;
  DeviceUrl:any;
  constructor( private authservice:AuthenticationService,private filterService: FilterService,private fb: FormBuilder,private http:HttpClient ,private productService: ProductService, private messageService: MessageService,private datePipe: DatePipe, private confirmationService: ConfirmationService,private api:ApiService) { }

  ngOnInit() {
    this.user_type=localStorage.getItem('u_type')
    if(this.user_type=='0'){
        this.DeviceUrl='/'
    }
    else{
        this.DeviceUrl='/origination/'
    }
    this.reportData = this.fb.group({
      d_id: ['', Validators.required],
      fdate: ['', Validators.required],
      tdate: ['', [Validators.required]]
    });
  this.getDeviceDATA();
  this.openNew();
 
  setInterval(() => {
    this.device ? this.saveProduct() : console.log('No Data');
  }, 10000);
  }
  convertToISTDateTime(utcDatetime: string) {
    const utcDateTime = new Date(utcDatetime);
    const istTime = this.datePipe.transform(utcDateTime, 'HH:mm:ss', '+0530');
    return istTime || '';
  }
  getDeviceDATA(){
const apiUrl = this.api.baseUrl;
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

  this.http.get(apiUrl+this.DeviceUrl+'device/list', { headers }).subscribe(
      (response) => {
        console.log(response);
        
        this.data2=response
        this.cities=this.data2.data 
        
      },
      (error) => {
        console.error(error);
      }
    );
}

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((product_id) => !this.selectedProducts?.includes(product_id));
              this.selectedProducts = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  editProduct(product: Device) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: Company) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.user_name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.DeleteCompany(product.user_id);
          
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  

  saveProduct() {
    this.fromDate='';
    this.toDate='';
    this.device='';
    
      this.submitted = true;
      this.selectedDevice;
      this.device=this.reportData.controls['d_id'].value.device_name;
      this.fromDate=this.reportData.controls['fdate'].value;
      this.toDate=this.reportData.controls['tdate'].value;
      const credentials = {
        start_date_time:this.reportData.controls['fdate'].value,
        end_date_time:this.reportData.controls['tdate'].value,
        device_id:this.device
      };
      if(this.device){
        this.fastLoading+=1
        this.fastLoading==1?this.spinner=true:this.spinner=false;
      }
      const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      
      this.productDialog = false;
      this.http.post(apiUrl+this.DeviceUrl+'device-data/list', credentials,{ headers }).subscribe(
        (response) => {
          this.spinner=false;
          console.log(response);
          this.data1=response
          this.products=this.data1.data
          this.products.forEach(e=>{
            e.time=this.convertToISTDateTime(e.created_at)
          })
          this.products = [...this.products];
          
          this.product = {};
          
          // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Get All Data', life: 3000 });
          
        },
        (error) => {
        
          console.error(error);
        }
      );
      
  }

  


  updateCompany(id,name){
      const credentials = {
          product_id:id,
          product_name:name
        };
      const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      
      this.http.post(apiUrl+'/master/edit_product_name', credentials,{ headers }).subscribe(
          (response) => {
            console.log(response);
            
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Updated', life: 3000 });
            this.getDeviceDATA();
          },
          (error) => {
            console.error(error);
          }
        );
  } 
  AddCompany(name){
      const credentials = {
          product_name:name
        };
      const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      
      this.http.post(apiUrl+'/master/add_product_name', credentials,{ headers }).subscribe(
          (response) => {
            console.log(response);
            
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Created', life: 3000 });
            this.getDeviceDATA();
          },
          (error) => {
            console.error(error);
          }
        );
  }   
  DeleteCompany(id){
      const credentials = {
          product_id:id
        };
      const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      
      this.http.post(apiUrl+'/master/delete_product_name', credentials,{ headers }).subscribe(
          (response) => {
            console.log(response);
            
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Deleted', life: 3000 });
            this.getDeviceDATA();
          },
          (error) => {
            console.error(error);
          }
        );
  }
  exportToExcel() {
    const data: any[] = []; // Your table data array
  
    // Add header row
    const header = ['Sl No.', 'DATE', 'TIME', 'DEVICE ID', 'DC BUS VOLTAGE (V)', 'OUTPUT CURRENT (A)', 'SETTINGS FREQ. (HZ)', 'RUNNING FREQ. (HZ)', 'RPM', 'FLOW (%)'];
    data.push(header);
  
    // Add data rows
    for (let i = 0; i < this.products.length; i++) {
      const rowData = [
        i + 1,
        this.products[i].date,
        this.products[i].time,
        this.products[i].device_id,
        this.products[i].dc_bus_voltage,
        this.products[i].output_current,
        this.products[i].settings_freq,
        this.products[i].running_freq,
        this.products[i].rpm,
        this.products[i].flow
      ];
      data.push(rowData);
    }
  
    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
  
    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'Report_data.xlsx');
  }
  
}
