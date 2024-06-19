import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import { CountryService } from 'src/app/demo/service/country.service';
import { EmptyDemoComponent } from '../../pages/viewBill/emptydemo.component';
import { ProductService } from 'src/app/demo/service/product.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';

@Component({
    templateUrl: './buttondemo.component.html',
    providers: [MessageService,DialogService]
})
export class ButtonDemoComponent implements OnInit {
constructor(private api:ApiService,private countryService: CountryService,private fb: FormBuilder,private http:HttpClient, 
  private messageService: MessageService,private billID:ProductService,public dialogService: DialogService){
    this.G_Bill = this.fb.group({
        c_id: [''],
        p_num: ['', Validators.required],
        c_name: ['', [Validators.required]],
        c_add: ['', [Validators.required]], 
        bar_code:[],
        paid_status:['',[Validators.required]],
        total_amt:['',[Validators.required]],
        paid_amt:['',[Validators.required]],
        sl_no: this.fb.array([]) 
      });
}
categories: any[] = [
    { name: 'paid' },
    { name: 'unpaid'}
  ];
    ct:any;
    G_Bill:FormGroup;
    existingCustomer:any;
    stockListAll:any;
    stockList:any[]=[];
    stockApi:any;
    bar_code:any;
    productDtls:any[]=[];
    spinner:boolean=false;
    tot_ant=0;
    existItem:boolean=false;
    ref: DynamicDialogRef | undefined;
    printData:any;
    BillId:any;
    showPrintButton:boolean=true;
    fullPaid:boolean=false;
    ngOnInit() {
        this.ct=this.G_Bill.controls
    }
    get skillsFormArray() {
      return this.G_Bill.get('sl_no') as FormArray;
    }
    getCustomerDtls(i:any){
        const credentials = {
            mobile_no:i.target.value
          };
          debugger
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.spinner=true;
        this.http.post(apiUrl+'/customer/serch_customer_mobile', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);
              this.existingCustomer=response
              this.spinner=false;
              if(this.existingCustomer.status==true){
                this.ct.c_name.setValue(this.existingCustomer.data.name);
              this.ct.c_add.setValue(this.existingCustomer.data.adress);
              this.ct.c_id.setValue(this.existingCustomer.data.id);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Get Existing Customer', life: 3000 });
              }
              else{
              this.ct.c_id.setValue(0);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Old Customer Found', life: 3000 });
              }
              
              
            },
            (error) => {
              this.spinner=false;
              console.error(error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'From Server Side !!', life: 3000 });
            }
          );
    }
    searchProduct(i:any){
        if (i.keyCode === 13) {
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
          debugger
            this.http.get(apiUrl+'/stock/stock_product?page=1&search='+i.target.value.toString(), { headers }).subscribe(
                (response) => {
                  this.spinner=false;
                  this.stockApi=response;
                  this.stockListAll=this.stockApi.data;
                  this.stockList=this.stockListAll.data;
                  if(this.stockList.length>0 && this.skillsFormArray.value.length>0){
                    // for(var i of this.skillsFormArray.value){

                    // }
                    for(let i=0;i<this.skillsFormArray.value.length;i++){
                      debugger
                      if(this.skillsFormArray.value[i].barcode_no==this.stockList[0].serial_number){
                        this.existItem=true;
                        break;
                        debugger
                      }
                      else{
                        this.existItem=false;
                        debugger
                      }
                    }
                    if(this.existItem){
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You Can not Scan Same BarCode in the Bill Section', life: 3000 });
                      debugger
                    }
                    else{
                      this.skillsFormArray.push(this.fb.group({
                        company_name: this.stockList[0].company_name,
                        product_name: this.stockList[0].product_name,
                        product_store_id: this.stockList[0].product_store_id,
                        model_name: this.stockList[0].model_name,
                        model_id: this.stockList[0].model_id,
                        barcode_no: this.stockList[0].serial_number,
    
                        price: this.stockList[0].sales_rate,
                        discount: '0',
                        warranty: '0'
                      }));
                this.productDtls= this.skillsFormArray.value;

                    }
                    
                    
                  }
                  else if(this.stockList.length>0 && this.skillsFormArray.value.length==0){
                    debugger
                    this.skillsFormArray.push(this.fb.group({
                      company_name: this.stockList[0].company_name,
                      product_name: this.stockList[0].product_name,
                      product_store_id: this.stockList[0].product_store_id,
                      model_name: this.stockList[0].model_name,
                      model_id: this.stockList[0].model_id,
                      barcode_no: this.stockList[0].serial_number,
  
                      price: this.stockList[0].sales_rate,
                      discount: '0',
                      warranty: '0'
                    }));
                this.productDtls= this.skillsFormArray.value;

                  }
                  else{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Product Found,', life: 3000 });
                  }
                  
                })
                debugger
                this.ct.bar_code.setValue("");

                
          }
        
    }
    
    addSkill() {
      this.skillsFormArray.push(this.fb.control(''));
    }
  
    removeSkill(index: number) {
      this.skillsFormArray.removeAt(index);
    }
    saveData(){
      for(let i=0;i<this.skillsFormArray.value.length;i++){
        const dt=this.formatedDate(this.skillsFormArray.value[i].warranty)
        debugger
        this.skillsFormArray.value[i].warranty=dt
      debugger
      }
      this.G_Bill
      debugger
    const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    console.log(this.G_Bill.value);
    
    debugger
    this.spinner=true;
    this.http.post(apiUrl+'/billing/new', this.G_Bill.value,{ headers }).subscribe(
        (response) => {
          console.log(response);
          this.printData=response;
          this.spinner=false;
          debugger
          if(this.printData.status=='success'){
            // this.showPrintButton=false;
            this.BillId=this.printData.bill_id;
            debugger
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'New Bill Create', life: 3000 });
            if(this.BillId>0){
              this.show();
              this.resetData();
            }
          }
          else{
            this.showPrintButton=true
             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed in bill creation', life: 3000 });
          }
          
          
        },
        (error) => {
          debugger
          this.spinner=false;
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'From Server Side !!', life: 3000 });
        }
      );

    }
   resetData(){
      this.G_Bill.reset();
      this.skillsFormArray.removeAt(0);
      for (let i = 0; i <= this.skillsFormArray.length; i++) {
        this.skillsFormArray.removeAt(i);
          }
        }
    priceChange(MRP:any,i:any){
     debugger
      this.skillsFormArray.controls[i].get('discount').setValue((100-(Number(MRP.target.value)*100 / Number(this.productDtls[i].price))).toFixed(2));
      debugger
    }
    disChange(dis:any,i:any){
      debugger
      this.skillsFormArray.controls[i].get('price').setValue((Number(this.productDtls[i].price)-((Number(this.productDtls[i].price)*(Number(dis.target.value)))/100 )).toFixed(2));
      debugger
    }
    formatedDate(numberToAdd) {
      const currentDate = new Date();
  
      // Extract the current year and month
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1; // Months are 0-based, so add 1 to get the current month.

      // Add the number of months
      month += Number(numberToAdd);

      // Calculate the new year and month
      const newYear = year + Math.floor((month - 1) / 12);
      const newMonth = ((month - 1) % 12) + 1;

      // Create a new Date object with the adjusted year and month
      const finalDate = new Date(newYear, newMonth - 1, currentDate.getDate());

      // Format the final date as "yyyy-mm-dd"
      const formattedDate = finalDate.toISOString().split('T')[0];
      debugger
      return formattedDate;
    }
    
    setTotPrice(){
      this.tot_ant=0;
      for(let i=0;i<this.skillsFormArray.value.length;i++){
        this.tot_ant+=Number(this.skillsFormArray.value[i].price);
      }
      this.ct.total_amt.setValue(this.tot_ant);
      if(this.ct.paid_status.value=="paid"){
        debugger
        this.ct.paid_amt.setValue(0);
        this.fullPaid=true
      }
      else{
        debugger
        this.fullPaid=false
      }
    }
    show() {
      this.billID.billing_id=0;
      this.billID.billing_id=this.BillId
      debugger
      this.ref = this.dialogService.open(EmptyDemoComponent, {
          header: 'Full Billing Details',
          data: {
            id: this.BillId
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
}

















