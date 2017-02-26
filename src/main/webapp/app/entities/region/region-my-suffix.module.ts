import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestPostgreSqlSharedModule } from '../../shared';

import {
    RegionMySuffixService,
    RegionMySuffixPopupService,
    RegionMySuffixComponent,
    RegionMySuffixDetailComponent,
    RegionMySuffixDialogComponent,
    RegionMySuffixPopupComponent,
    RegionMySuffixDeletePopupComponent,
    RegionMySuffixDeleteDialogComponent,
    regionRoute,
    regionPopupRoute,
} from './';

let ENTITY_STATES = [
    ...regionRoute,
    ...regionPopupRoute,
];

@NgModule({
    imports: [
        TestPostgreSqlSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegionMySuffixComponent,
        RegionMySuffixDetailComponent,
        RegionMySuffixDialogComponent,
        RegionMySuffixDeleteDialogComponent,
        RegionMySuffixPopupComponent,
        RegionMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RegionMySuffixComponent,
        RegionMySuffixDialogComponent,
        RegionMySuffixPopupComponent,
        RegionMySuffixDeleteDialogComponent,
        RegionMySuffixDeletePopupComponent,
    ],
    providers: [
        RegionMySuffixService,
        RegionMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestPostgreSqlRegionMySuffixModule {}
