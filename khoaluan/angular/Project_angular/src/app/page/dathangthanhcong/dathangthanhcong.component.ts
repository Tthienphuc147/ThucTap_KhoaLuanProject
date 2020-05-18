import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-dathangthanhcong',
    templateUrl: './dathangthanhcong.component.html',
    styleUrls: ['./dathangthanhcong.component.css']
})
export class DathangthanhcongComponent implements OnInit {
    @Input() tongtien: number;
    constructor() {}

    ngOnInit() {}
}
