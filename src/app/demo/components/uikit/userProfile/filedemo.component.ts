import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './filedemo.component.html',
    styleUrls: ['./filedemo.component.css'],
    providers: [MessageService]
})
export class FileDemoComponent implements OnInit {

    uploadedFiles: any[] = [];
    username:any;
    mobile:any;
    email:any;
    constructor(private messageService: MessageService) {}
    ngOnInit(): void {
        this.username=localStorage.getItem('user');
        this.email=localStorage.getItem('email');
        this.mobile=localStorage.getItem('phone');
    }
    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

}
