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
        this.loadScripts();
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
    loadScripts() {
      const externalScriptArray = [
        '../assets/js/vendor/jquery-3.1.1.min.js',
              '../assets/js/bootstrap.min.js',
              '../assets/lib/js/jquery.nivo.slider.js',
              '../assets/js/plugins.js',
              '../assets/js/main.js'
      ];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < externalScriptArray.length; i++) {
        const scriptTag = document.createElement('script');
        scriptTag.src = externalScriptArray[i];
        scriptTag.type = 'text/javascript';
        scriptTag.async = false;
        scriptTag.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
      }
    }
}
