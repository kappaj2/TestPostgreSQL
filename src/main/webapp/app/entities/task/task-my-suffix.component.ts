import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { TaskMySuffix } from './task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-task-my-suffix',
    templateUrl: './task-my-suffix.component.html'
})
export class TaskMySuffixComponent implements OnInit, OnDestroy {
tasks: TaskMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private taskService: TaskMySuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['task']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.taskService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.tasks = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.taskService.query().subscribe(
            (res: Response) => {
                this.tasks = res.json();
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
        this.registerChangeInTasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: TaskMySuffix) {
        return item.id;
    }



    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe('taskListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
