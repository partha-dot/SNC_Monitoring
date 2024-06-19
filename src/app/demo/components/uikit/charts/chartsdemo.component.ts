import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription, switchMap, timer } from 'rxjs';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
@Component({
    templateUrl: './chartsdemo.component.html',
    styleUrls:['./chartsdemo.component.css'],
    
  providers: [MessageService, ConfirmationService, DatePipe]
})
export class ChartsDemoComponent implements OnInit, OnDestroy {

    rpm: any;
    flow: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    subscription: Subscription;

    selectedCountryAdvanced:any
    selectedDealer:any
    filteredCountries: any[] = [];
    filteredDealer: any[] = [];
    countries: any[] = [];
    selectedState: any = null;
    dealer!: any[];
    data1:any=[];
    cities:any=[];
    liveData:any=[];
    liveData2:any;
    currTm:any;
    currDt:any;
    flowData:any[]=[];
    flowDate:any[]=[];
    rpmData:any[]=[];
    rpmDate:any[]=[];
    user_type:any='';
    lastUpdateTime:any='';
    DeviceUrl:any='';
    deviceStatus:boolean=false;
    constructor(private datePipe: DatePipe,public layoutService: LayoutService, private authservice:AuthenticationService,
        private fb: FormBuilder,private http:HttpClient ,private productService: ProductService, 
        private messageService: MessageService, private confirmationService: ConfirmationService,private api:ApiService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts();
        });
    }
    convertToISTDateTime(utcDatetime: string) {
        const utcDateTime = new Date(utcDatetime);
        const istTime = this.datePipe.transform(utcDateTime, 'dd-MM-yyyy HH:mm:ss', '+0530');
        return istTime || '';
      }
   
    ngOnInit() {
        this.user_type=localStorage.getItem('u_type')
        if(this.user_type=='0'){
            this.DeviceUrl='/'
        }
        else{
            this.DeviceUrl='/origination/'
        }
        
        debugger
        this.initCharts();
        this.getDevice();

        setInterval(()=>{
            this.currTm= ' '+ '| '+ new Date().toString().substring(16,24)+ ' '
            this.currDt= new Date().toString().substring(0,15)   
          ,1000})

          setInterval(() => {
            this.selectedDealer?.device_name ? this.getDeviceLiveData(this.selectedDealer?.device_name) : console.log('hii');
            this.getDevice();
          }, 20000);
          
         
      
    }
    
    getDevice(){

    const apiUrl = this.api.baseUrl;
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

  this.http.get(apiUrl+this.DeviceUrl+'device/list', { headers }).subscribe(
      (response) => {
        console.log(response);
        
        this.data1=response
        this.cities=this.data1.data 
        
      },
      (error) => {
       
        console.error(error);
      }
    );
}

dateConvt(timestamp:any){
const dateObject = new Date(timestamp);

// Extract month and day
const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(dateObject.getDate()).padStart(2, '0');

// Create the desired format
const result = `${month}/${day}`;

console.log(result); 
return result
}
getDeviceLiveData(name:any){
    // const apiUrl = this.api.baseUrl;
//   baseUrl = 'https://iot.wrongcode.in/backend/api';

  
         if(name){
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
            
            this.liveData=[];
            this.liveData2=null;
    
            const credentials = {
                device_id:name
            };
            this.deviceStatus=false
            this.http.post(this.api.baseUrl+ this.DeviceUrl+'device-data/last', credentials, { headers }).subscribe(
                (response) => {
                    
                    console.log(response);
                    
                    this.data1=response
                    this.data1=this.data1.data
                    this.deviceStatus=this.data1.device_status=="Online"?true:false
                    if(this.data1) {
                        this.flowDate=[]
                        this.flowData=[]
                        this.rpmDate=[]
                        this.rpmData=[]
                        this.liveData=this.data1.chart_data_list
                        this.liveData2=this.data1.device_data_list
                        this.liveData.forEach(e => {
                            
                            this.flowDate.push(this.dateConvt(e.created_at))
                            this.flowData.push(e.flow)
                            this.rpmDate.push(this.dateConvt(e.created_at))
                            this.rpmData.push(e.rpm.toString())

                            
                            console.log(this.flowDate);
                            console.log(this.flowData);
                            console.log(this.rpmDate);
                            console.log(this.rpmData);
                            
                        });
                        
                        if(this.flowDate && this.flowData && this.rpmDate && this.rpmData){
                            this.lastUpdateTime=''
                            this.lastUpdateTime=this.convertToISTDateTime(this.liveData2.created_at)
                            console.log(this.lastUpdateTime);
                            
                            // this.flowDate = this.flowDate.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                            // this.flowData = this.flowData.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                            // this.rpmDate = this.rpmDate.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                            // this.rpmData = this.rpmData.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                            
                            this.initCharts();
                            
                        }
                        
                    }
                   
                    
                },
                (error) => {
                    console.error(error);
                }
                );
         }
  
}
        dateChange(i:any){
            const utcTimestamp = i;

            // Convert UTC timestamp to Date object
            const date = new Date(this.liveData2.created_at);

            // Set the desired timezone (in this case, +05:30)
            const timeZone = "Asia/Kolkata"; // Time zone identifier for Indian Standard Time

            // Options for formatting
            const options:any = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false, // 24-hour format
            timeZone: timeZone,
            };

            // Format the date
            const formattedDate = date.toLocaleString('en-US', options);

            console.log(formattedDate); 
            return formattedDate
        }
    setDevice(){
        console.log(this.selectedDealer);
        
        this.getDeviceLiveData(this.selectedDealer.device_name);


    }
    filterDealer(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.cities.length; i++) {
            const dealer = this.cities[i];
            if (dealer.device_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(dealer);
                
            }
        }
  
        this.filteredDealer = filtered;
        
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        

        this.flow = {
            labels: this.flowDate,
            datasets: [
                {
                    label: 'flow',
                    data: this.flowData,
                    fill: false,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    tension: .4
                }
            ]
        };
        
        this.rpm = {
            
            labels: this.rpmDate,
            datasets: [
                
                {
                    label: 'RPM',
                    data: this.rpmData,
                    fill: false,
                    backgroundColor:'red',
                    borderColor: 'red',
                    tension: .4
                }
            ]
        };
        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
}
