import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestPostgreSqlSharedModule } from '../../shared';

import {
    EmployeeMySuffixService,
    EmployeeMySuffixPopupService,
    EmployeeMySuffixComponent,
    EmployeeMySuffixDetailComponent,
    EmployeeMySuffixDialogComponent,
    EmployeeMySuffixPopupComponent,
    EmployeeMySuffixDeletePopupComponent,
    EmployeeMySuffixDeleteDialogComponent,
    employeeRoute,
    employeePopupRoute,
} from './';

let ENTITY_STATES = [
    ...employeeRoute,
    ...employeePopupRoute,
];

@NgModule({
    imports: [
        TestPostgreSqlSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EmployeeMySuffixComponent,
        EmployeeMySuffixDetailComponent,
        EmployeeMySuffixDialogComponent,
        EmployeeMySuffixDeleteDialogComponent,
        EmployeeMySuffixPopupComponent,
        EmployeeMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EmployeeMySuffixComponent,
        EmployeeMySuffixDialogComponent,
        EmployeeMySuffixPopupComponent,
        EmployeeMySuffixDeleteDialogComponent,
        EmployeeMySuffixDeletePopupComponent,
    ],
    providers: [
        EmployeeMySuffixService,
        EmployeeMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestPostgreSqlEmployeeMySuffixModule {}
