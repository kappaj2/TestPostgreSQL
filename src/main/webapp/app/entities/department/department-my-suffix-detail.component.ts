import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { DepartmentMySuffix } from './department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';

@Component({
    selector: 'jhi-department-my-suffix-detail',
    templateUrl: './department-my-suffix-detail.component.html'
})
export class DepartmentMySuffixDetailComponent implements OnInit, OnDestroy {

    department: DepartmentMySuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private departmentService: DepartmentMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['department']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.departmentService.find(id).subscribe(department => {
            this.department = department;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
