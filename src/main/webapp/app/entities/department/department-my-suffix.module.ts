import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestPostgreSqlSharedModule } from '../../shared';

import {
    DepartmentMySuffixService,
    DepartmentMySuffixPopupService,
    DepartmentMySuffixComponent,
    DepartmentMySuffixDetailComponent,
    DepartmentMySuffixDialogComponent,
    DepartmentMySuffixPopupComponent,
    DepartmentMySuffixDeletePopupComponent,
    DepartmentMySuffixDeleteDialogComponent,
    departmentRoute,
    departmentPopupRoute,
} from './';

let ENTITY_STATES = [
    ...departmentRoute,
    ...departmentPopupRoute,
];

@NgModule({
    imports: [
        TestPostgreSqlSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DepartmentMySuffixComponent,
        DepartmentMySuffixDetailComponent,
        DepartmentMySuffixDialogComponent,
        DepartmentMySuffixDeleteDialogComponent,
        DepartmentMySuffixPopupComponent,
        DepartmentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DepartmentMySuffixComponent,
        DepartmentMySuffixDialogComponent,
        DepartmentMySuffixPopupComponent,
        DepartmentMySuffixDeleteDialogComponent,
        DepartmentMySuffixDeletePopupComponent,
    ],
    providers: [
        DepartmentMySuffixService,
        DepartmentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestPostgreSqlDepartmentMySuffixModule {}
