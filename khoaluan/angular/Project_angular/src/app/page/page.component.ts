import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DanhMuc } from '../models/danhmuc';
import { DanhmucService } from '../services/danhmuc.service';
import { OtherService } from '../services/other.service';
import { LoadingService } from '../services/loading.service';
import { HomePageService } from '../services/home-page.service';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    providers: []
})
export class PageComponent implements OnInit, OnDestroy {
    @ViewChild('MatExpansionPanel', { static: true })
    _matExpansionPanel: MatExpansionPanel;
    subscriptions: Subscription[] = [];
    opened = true;
    opened_filter = true;
    danhmucs: DanhMuc[] = [];
    loading = false;
    constructor(
        private otherService: OtherService,
        private danhmucService: DanhmucService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private loadingService: LoadingService
    ) {}
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.otherService.showmenuObser.subscribe(data => {
                this.opened = !this.opened;
            }),
            this.otherService.show_filter_obser.subscribe(data => {
                this.opened_filter = !this.opened_filter;
            }),
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data
                        .filter(e => {
                            return e.idParent == null;
                        })
                        .slice(0, 8);
                },
                err => {}
            )
        );
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    getsub_danhmuc(id: number, sl: number) {
        let dm;
        this.danhmucService.itemsObs.subscribe(data => {
            dm = data
                .filter(e => {
                    return e.idParent === id;
                })
                .slice(0, sl);
        });
        return dm;
    }
    onClickDanhMuc(e) {
        this.otherService.toggle_showmenu();
        this.router.navigate(['/search'], { queryParams: { cat: e.id } });
    }
    expandPanel(event): void {
        event.stopPropagation(); // Preventing event bubbling
    }
    onDeactivate() {
        // var el = document.getElementById('my_content')
        // el.scrollTop = 0
        document.body.scrollTop = 0;
    }
}
