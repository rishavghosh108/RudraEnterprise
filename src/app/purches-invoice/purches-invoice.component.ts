import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-purches-invoice',
  templateUrl: './purches-invoice.component.html',
  styleUrls: ['./purches-invoice.component.css']
})
export class PurchesInvoiceComponent implements OnInit{
    @Input() Date_id: any

    invoice: any

    constructor(private api: ApiServiceService, private auth:AuthService){
    }

    headers=new HttpHeaders(
        {'auth':this.auth.GetToken()}
    )

    ngOnInit() {
        this.api.PurchesInvoice(this.headers,this.Date_id).subscribe(
            response=>{
                this.invoice=response.body
            },error=>{
                console.log(error)
            }
        )
    }
    
    exportToExcel(): void {
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
        const wsData: any[][] = [
          ["Date", this.invoice.date],
          ["Invoice No", this.invoice.id],
          [],
          ["Product name", "Volume", "Quantity"]
        ];
    
        this.invoice.products.forEach((product: { product_name: any; qty: any; type: any; volume: any; }) => {
          wsData.push([product.product_name, `${product.qty} ${product.type}`, product.volume]);
        });
    
        for (let i = 0; i < 6; i++) {
          wsData.push(["", "", ""]);
        }
    
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Invoice');
        XLSX.writeFile(wb, `invoice_${this.invoice.id}.xlsx`);
      }
}
