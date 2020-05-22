import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-baocao-list',
    templateUrl: './baocao-list.component.html',
    styleUrls: ['./baocao-list.component.css']
})
export class BaocaoListComponent implements OnInit, OnDestroy {
    api_url = environment.api_url
    ngOnDestroy(): void {

    }

    constructor (

    ) { }

    ngOnInit() {

    }






}
