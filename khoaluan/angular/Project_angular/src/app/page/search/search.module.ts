import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShareModule } from '../../share/share.module';
import { BoxFilterComponent } from '../filter/box-filter/box-filter.component';
import { SanphambanchayComponent } from '../filter/sanphambanchay/sanphambanchay.component';
import { SearchComponent } from './search.component';

const routing: Routes = [{ path: '', component: SearchComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
    declarations: [
        SearchComponent,
        BoxFilterComponent,
        SanphambanchayComponent
    ],
    imports: [ShareModule, Routing, SlickCarouselModule, RouterModule],
    exports: [SearchComponent, BoxFilterComponent, SanphambanchayComponent]
})
export class SearchModule {}
