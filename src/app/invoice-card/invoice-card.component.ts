import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.css']
})
export class InvoiceCardComponent {
  @Input() transactions: any;

  invoice!: any
  invoiceState: boolean = false

  constructor(private api:ApiServiceService, private auth:AuthService){}

  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
  )

  GetInvoice(data: any){
    this.api.SellInvoice(data,this.headers).subscribe(
      response=>{
        this.invoice=response.body
        this.invoiceState=true
      }
    )
  }


  downloadInvoice() {
    const element = document.getElementById('invoice');
    const options = {
      margin: 1,
      filename: `Invoice_${this.invoice.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  }

}
