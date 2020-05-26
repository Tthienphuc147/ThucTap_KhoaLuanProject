import { Component, OnInit, Input, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ads-popup',
  templateUrl: './ads-popup.component.html',
  styleUrls: ['./ads-popup.component.css']
})
export class AdsPopupComponent implements OnInit {

  image: string;
  id: string;
  api_url = environment.api_storage;
  constructor(
    private dialogRef: MatDialogRef<AdsPopupComponent>,@Inject(MAT_DIALOG_DATA) data) {
        this.image = data.image;
        this.id = data.idSanPham;
    }

  ngOnInit() {

  }
  close() {
    this.dialogRef.close();
}
}
