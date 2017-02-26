import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { DepartmentMySuffix } from './department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-department-my-suffix',
    templateUrl: './department-my-suffix.component.html'
})
export class DepartmentMySuffixComponent implements OnInit, OnDestroy {
departments: DepartmentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private departmentService: DepartmentMySuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['department']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.departmentService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.departments = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.departmentService.query().subscribe(
            (res: Response) => {
                this.departments = res.json();
                this.currentSearch = '';
            },
            (res: Response) => this.onError(res.json())
        );
    }

    search (query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDepartments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: DepartmentMySuffix) {
        return item.id;
    }



    registerChangeInDepartments() {
        this.eventSubscriber = this.eventManager.subscribe('departmentListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
