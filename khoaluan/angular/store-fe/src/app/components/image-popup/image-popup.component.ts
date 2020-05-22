import { Component, OnInit, Input, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent implements OnInit {

  image: string;
  api_url = environment.api_storage;
  constructor(
    private dialogRef: MatDialogRef<ImagePopupComponent>,@Inject(MAT_DIALOG_DATA) data) {
        this.image = data.image;
    }

  ngOnInit() {

  }
  close() {
    this.dialogRef.close();
}
}
