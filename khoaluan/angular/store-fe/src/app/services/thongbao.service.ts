import { Injectable } from '@angular/core';
import { ThongbaoComponent } from '../components/thongbao/thongbao.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ThongbaoService {
    constructor(private _snackBar: MatSnackBar) {}
    open(data?: string, color?: string): void {
        this._snackBar.openFromComponent(ThongbaoComponent, {
            duration: 4000,
            data,
            verticalPosition: 'top',
            panelClass: [color]
        });
    }
}
