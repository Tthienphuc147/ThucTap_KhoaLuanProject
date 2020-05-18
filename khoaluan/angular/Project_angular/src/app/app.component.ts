import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyHelper } from './helper/MyHelper';
import { DanhMuc } from './models/danhmuc';
import { MobileService } from './services/mobile.service';
import { OtherService } from './services/other.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MyHelper]
})
export class AppComponent implements OnInit {
    constructor(
        private myHelper: MyHelper,
        private otherService: OtherService,
        private mobileService: MobileService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    mobileQuery: MediaQueryList;
    _mobileQueryListener: () => void;
    subscriptions: Subscription[] = [];
    opened = false;
    danhmucs: DanhMuc[] = [];
    is_loading = true;
    title = 'Phuc Store';
    ngOnInit(): void {
        this.is_loading = true;
        this.loadData();
        this.mobileService.setMobileSubject(this.mobileQuery.matches);
    }
    onResize(e) {
        this.mobileService.setMobileSubject(this.mobileQuery.matches);
    }
    loadData() {
        this.subscriptions.push(
            this.otherService.showmenuObser.subscribe(data => {
                this.opened = data;
            }),
            this.myHelper.is_loading_obs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
}
