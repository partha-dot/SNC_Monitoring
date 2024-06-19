import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { EmptyDemoComponent } from '../../pages/viewBill/emptydemo.component';
import { Router } from '@angular/router';
interface PageEvent {
    first: number;
    rows: number;
    page: number;
    last:number;
    pageCount: number;
  }
@Component({
    templateUrl: './listdemo.component.html',
    providers: [DialogService, MessageService]
})

export class ListDemoComponent implements OnInit,OnDestroy {
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
    ref: DynamicDialogRef | undefined;
    @ViewChild('view', { static: true }) view: TemplateRef<any>;
    constructor(private api:ApiService,private productService: ProductService,private router: Router,private http:HttpClient,private billID:ProductService,
      public dialogService: DialogService, public messageService: MessageService) { }

    ngOnInit() {
       this.getAllBill();
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
      getAllBill(){
        this.totalPGNO=0;
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
          
            this.http.get(apiUrl+'/report/my_bill', { headers }).subscribe(
                (response) => {
                  this.spinner=false;
                  console.log(response);
                  this.stockApi=response
                  this.stockList=this.stockApi.data;
                //   this.stockList=this.stockListAll.data;
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
      editBill(i:any){
        this.billID.billing_id=0;
        this.billID.billing_id=i.billing_id;
        debugger
        this.router.navigate(['app/pages/edit_bill']);
      }
      show(i:any) {
        this.billID.billing_id=0;
        this.billID.billing_id=i.billing_id;
        debugger
        this.ref = this.dialogService.open(EmptyDemoComponent, {
            header: 'Full Billing Details',
            data: {
              id: i.billing_id
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

      ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
    
}
