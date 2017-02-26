import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { RegionMySuffix } from './region-my-suffix.model';
import { RegionMySuffixService } from './region-my-suffix.service';

@Component({
    selector: 'jhi-region-my-suffix-detail',
    templateUrl: './region-my-suffix-detail.component.html'
})
export class RegionMySuffixDetailComponent implements OnInit, OnDestroy {

    region: RegionMySuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private regionService: RegionMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['region']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.regionService.find(id).subscribe(region => {
            this.region = region;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
