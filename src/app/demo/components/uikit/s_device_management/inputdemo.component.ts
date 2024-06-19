import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { CountryService } from 'src/app/demo/service/country.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  last:number;
  pageCount: number;
}
@Component({
    templateUrl: './inputdemo.component.html',
    providers: [MessageService]
})
export class InputDemoComponent implements OnInit {
    
    selectedCountryAdvanced:any
    filteredCountries: any[] = [];
    countries: any[] = [];
    selectedState: any = null;
    stockIn: FormGroup;
    stockIn2: FormGroup;
    modelList:any=[];
    userList:any=[];
    product_n:string;
    company_n:string;
    lastAddedIndex: number = -1;
    warr_in_month:any;
    modelID:any
    models!: any[];
    users!: any[];
    users2!: any[];
    ct:any;
    stockListAll:any;
    stockList:any[]=[]
    stockApi:any
    product_store_id:number;
    spinner:boolean=false;

    first: number = 0;
    rows: number = 20;
    totalPGNO:number;
    goingPage:number;
    companyList:any;
    companys:any[]=[]
    constructor(private authservice:AuthenticationService,private api:ApiService,private countryService: CountryService,private fb: FormBuilder,private http:HttpClient, private messageService: MessageService) { 
        this.stockIn = this.fb.group({
            org_id: ['', Validators.required],
            device_id: ['', [Validators.required]],
            user_id: ['', [Validators.required]],
            as_device_id:['']
          });
          this.stockIn2 = this.fb.group({
            org_id: ['', Validators.required],
            device_id: ['', [Validators.required]],
            user_id: ['', [Validators.required]],
            as_device_id:['']
          });
    }
    
    ngOnInit() {
        this.ct=this.stockIn.controls;
        this.getuser();
          this.getDevice(); 
          this.getOrganization();
          this.getAllStock();
       

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
          
            this.http.get(apiUrl+'/stock/stock_product?page='+pageNo, { headers }).subscribe(
                (response) => {
                  this.spinner=false;
                  this.stockApi=response;
                  this.stockListAll=this.stockApi.data;
                  this.stockList=this.stockListAll.data;
                  // this.totalPGNO=this.stockListAll.last_page;
                  debugger
                })
    }
    
    selectProduct(stock) {
      this.users=this.users2.filter(e=>e.origination_id==stock.origination_id)
      debugger
      // model_id: this.modelID,
      this.stockIn.patchValue({
        device_id:stock.device_id,
        org_id:stock.origination_id,
        user_id:stock.id,
        as_device_id:stock.assign_device_id
      });
      debugger
        // this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: cities.name });
    }
    
    resetData(){
        this.stockIn.reset();
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
              this.models=this.modelList.data 
              
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
      setUser(){
        this.users=[];
        this.users=this.users2.filter(e=>e.origination_id==this.ct.org_id.value)
        debugger
        // this.ct.org_id.value
      }
      getAllStock(){
            this.spinner=true;
            this.totalPGNO=0;
            const apiUrl = this.api.baseUrl;
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
          
            this.http.get(apiUrl+'/assign-device/list-origination', { headers }).subscribe(
                (response) => {
                  this.spinner=false;
                  console.log(response);
                  this.stockApi=response
                  this.stockList=this.stockApi.data;
                  debugger
                },
                (error) => {
                  this.spinner=false;
                  console.error(error);
                }
                
              );
      }
      insertStockData(){
        debugger
                  this.spinner=true;
                  const credentials = {
                    origination_id:this.ct.org_id.value,
                    device_id:this.ct.device_id.value,
                    user_id:this.ct.user_id.value,
                    assign_device_id:this.ct.as_device_id.value?this.ct.as_device_id.value:''
                  };
        if(this.ct.as_device_id.value){
          debugger
          const apiUrl = this.api.baseUrl;
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
          debugger
          this.http.post(apiUrl+'/assign-device/edit-origination', credentials,{ headers }).subscribe(
              (response) => {
                console.log(response);
                      this.spinner=false;
                      debugger
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Updated', life: 3000 });
                this.resetData();
                this.getAllStock();
              },
              (error) => {
                      this.spinner=false;
                      console.log(error);
                      
              }
            );
        }
        else{
          debugger
          const apiUrl = this.api.baseUrl;
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
          debugger
          this.http.post(apiUrl+'/assign-device/add-origination', credentials,{ headers }).subscribe(
              (response) => {
                console.log(response);
                      this.spinner=false;
                      debugger
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device created', life: 3000 });
                this.resetData();
                this.getAllStock();
              },
              (error) => {
                      this.spinner=false;
                      console.error(error);
              }
            );
        }
       
      }
      
      filterCountry(event: any) {
          const filtered: any[] = [];
          const query = event.query;
          for (let i = 0; i < this.models.length; i++) {
              const country = this.models[i];
              if (country.model_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                  filtered.push(country);
                  debugger
              }
          }
  
          this.filteredCountries = filtered;
          
      }
      setWarranty(){
          this.warr_in_month=this.warr_in_month?this.warr_in_month:0;
          const inputDateObject = new Date(this.ct.purchase_date.value);
          if (!isNaN(inputDateObject.getTime())) {
            inputDateObject.setMonth(inputDateObject.getMonth() + Number(this.warr_in_month));
      
            this.stockIn.get('warranty_expired').setValue(inputDateObject);
          } else {
            console.error('Invalid date input');
          }
          debugger
      }
      calculateOutputDate() {
          
        }
      selected(){
          console.log(this.selectedCountryAdvanced);
          this.modelID=this.selectedCountryAdvanced.model_id;
          this.product_n=this.selectedCountryAdvanced.product_name;
          this.company_n=this.selectedCountryAdvanced.company_name;
          debugger
      }
      get skillsFormArray() {
        return this.stockIn.get('sl_no') as FormArray;
      }
      addSkill() {
        this.skillsFormArray.push(this.fb.control(''));
      }
    
      removeSkill(index: number) {
        this.skillsFormArray.removeAt(index);
      }
      addItem(i:any){
        if (i.keyCode === 13) {
          this.addSkill();
  
         this.lastAddedIndex=this.skillsFormArray.length;
          const ln = this.skillsFormArray.length;
          this.lastAddedIndex=ln-1
          // this.removeSkill(ln-1);
          debugger
        }
      }
      formatedDate(dt:any){
        const originalDateStr = dt;
        const originalDate = new Date(originalDateStr);
        
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with 0 if needed
        const day = String(originalDate.getDate()).padStart(2, "0");
        
        const formattedDate = `${year}-${month}-${day}`;
        
        console.log(formattedDate); 
        return formattedDate;
      }
      stockDelete(stock){
       
        debugger
        const credentials = {
          product_store_id: stock.product_store_id
        };
        debugger
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      debugger
      this.http.post(apiUrl+'/stock/delete', credentials,{ headers }).subscribe(
          (response) => {
            console.log(response);
            this.spinner=false;
            debugger
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Stock Deleted', life: 3000 });
            this.resetData();
            this.getAllStock();
          },
          (error) => {
                  this.spinner=false;
                  console.error(error);
          }
        );
      }

  
     
      
}