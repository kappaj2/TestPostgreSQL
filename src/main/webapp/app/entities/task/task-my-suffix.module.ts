import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestPostgreSqlSharedModule } from '../../shared';

import {
    TaskMySuffixService,
    TaskMySuffixPopupService,
    TaskMySuffixComponent,
    TaskMySuffixDetailComponent,
    TaskMySuffixDialogComponent,
    TaskMySuffixPopupComponent,
    TaskMySuffixDeletePopupComponent,
    TaskMySuffixDeleteDialogComponent,
    taskRoute,
    taskPopupRoute,
} from './';

let ENTITY_STATES = [
    ...taskRoute,
    ...taskPopupRoute,
];

@NgModule({
    imports: [
        TestPostgreSqlSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TaskMySuffixComponent,
        TaskMySuffixDetailComponent,
        TaskMySuffixDialogComponent,
        TaskMySuffixDeleteDialogComponent,
        TaskMySuffixPopupComponent,
        TaskMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TaskMySuffixComponent,
        TaskMySuffixDialogComponent,
        TaskMySuffixPopupComponent,
        TaskMySuffixDeleteDialogComponent,
        TaskMySuffixDeletePopupComponent,
    ],
    providers: [
        TaskMySuffixService,
        TaskMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestPostgreSqlTaskMySuffixModule {}
