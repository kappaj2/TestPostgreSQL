import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { LocationMySuffix } from './location-my-suffix.model';
import { LocationMySuffixService } from './location-my-suffix.service';

@Component({
    selector: 'jhi-location-my-suffix-detail',
    templateUrl: './location-my-suffix-detail.component.html'
})
export class LocationMySuffixDetailComponent implements OnInit, OnDestroy {

    location: LocationMySuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private locationService: LocationMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['location']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.locationService.find(id).subscribe(location => {
            this.location = location;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
