import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TaskMySuffix } from './task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';

@Component({
    selector: 'jhi-task-my-suffix-detail',
    templateUrl: './task-my-suffix-detail.component.html'
})
export class TaskMySuffixDetailComponent implements OnInit, OnDestroy {

    task: TaskMySuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private taskService: TaskMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['task']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.taskService.find(id).subscribe(task => {
            this.task = task;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
