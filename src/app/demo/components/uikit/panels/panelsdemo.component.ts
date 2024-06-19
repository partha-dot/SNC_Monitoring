import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as JsBarcode from 'jsbarcode';

@Component({
    templateUrl: './panelsdemo.component.html',
    styles: [`
    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      //grid-gap: 10px;
    }

    .grid-item {
      margin: 0;
     padding: 7px;
      
    }
  `]
})

export class PanelsDemoComponent implements OnInit {
    // @ViewChild('barcodeSVG') barcodeSVG: ElementRef;
    @ViewChild('barcodeContainer', { static: true }) barcodeContainer!: ElementRef;
    items: MenuItem[] = [];

    cardMenu: MenuItem[] = [];
    containerIds: string[] = [];
    ngOnInit() {
        this.containerIds = Array.from({ length: 84 }, (_, index) => `barcodeContainer${index + 1}`);
    }
    ngAfterViewInit() {
        this.generateBarcodes();
        debugger
        // if (this.barcodeSVG.nativeElement) {
        //   const barcd=`000000001`
        //   JsBarcode(this.barcodeSVG.nativeElement, barcd, {
        //     format: 'CODE128', // Specify the barcode format you want
        //     width:1,
        //     height:45,
        //   });
        // }
        
      }
      generateBarcodes(): void {
        // this.containerIds.forEach((containerId, index) => {
        //   const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        //   svgElement.setAttribute('id', `barcode${index + 1}`);
        //   svgElement.setAttribute('style', 'margin: 10px;');
    
        //   const container = document.getElementById(containerId);
        //   if (container) {
        //     container.appendChild(svgElement);
    
        //     const barcodeData = `MCS00000${index + 1}`.slice(-9);
    
        //     JsBarcode(`#${containerId} svg`, barcodeData, {
        //       format: 'CODE128',
        //       width: 1.5,
        //       height: 28,
        //       displayValue: false,
        //     });
        //   }
        // });
        const startingNumber = 6; // Manually set the starting barcode number
  this.containerIds.forEach((containerId, index) => {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('id', `barcode${index + startingNumber}`);

    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(svgElement);

      const barcodeData = `MCS00000${index + startingNumber}`.slice(-9);

      JsBarcode(`#${containerId} svg`, barcodeData, {
        format: 'CODE128',
        width: 1.5,
        height: 29,
        displayValue: false,
      });
    }
  });
      }
    //   generateBarcodes(): void {
    //     if (this.barcodeContainer.nativeElement) {
    //       for (let i = 1; i <= 84; i++) {
    //         const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //         svgElement.setAttribute('id', `barcode${i}`);
    //         svgElement.setAttribute('style', 'margin: 10px;');
    
    //         this.barcodeContainer.nativeElement.appendChild(svgElement);
    
    //         const barcodeData = `00000000${i}`.slice(-9);
    
    //         JsBarcode(`#barcode${i}`, barcodeData, {
    //           format: 'CODE128',
    //           width: 1,
    //           height: 45,
    //         });
    //       }
    //     }
    // }
    
}
