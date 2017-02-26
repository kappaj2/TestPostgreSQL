import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestPostgreSqlCountryMySuffixModule } from './country/country-my-suffix.module';
import { TestPostgreSqlDepartmentMySuffixModule } from './department/department-my-suffix.module';
import { TestPostgreSqlEmployeeMySuffixModule } from './employee/employee-my-suffix.module';
import { TestPostgreSqlJobMySuffixModule } from './job/job-my-suffix.module';
import { TestPostgreSqlJobHistoryMySuffixModule } from './job-history/job-history-my-suffix.module';
import { TestPostgreSqlLocationMySuffixModule } from './location/location-my-suffix.module';
import { TestPostgreSqlRegionMySuffixModule } from './region/region-my-suffix.module';
import { TestPostgreSqlTaskMySuffixModule } from './task/task-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TestPostgreSqlCountryMySuffixModule,
        TestPostgreSqlDepartmentMySuffixModule,
        TestPostgreSqlEmployeeMySuffixModule,
        TestPostgreSqlJobMySuffixModule,
        TestPostgreSqlJobHistoryMySuffixModule,
        TestPostgreSqlLocationMySuffixModule,
        TestPostgreSqlRegionMySuffixModule,
        TestPostgreSqlTaskMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestPostgreSqlEntityModule {}
