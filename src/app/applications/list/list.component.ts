import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApplicationsService } from '../applications-service';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ApplicationListItem } from '../models/application-list-item';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {float: 'never'}}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  public apps: ApplicationListItem[] = [];
  public isPending: boolean;

  public zapps: ApplicationListItem[] = [];

  currAppId = "";
  sub: Subscription = new Subscription();

  searchQuery: string = "";
  searchQueryChanged$: Subject<string> = new Subject<string>();


  @ViewChild('searchInput', { static: true }) searchInput?: ElementRef<HTMLInputElement>;

  constructor(private applicationsService: ApplicationsService,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private http: HttpClient) {
    this.isPending = false;



    this.searchQueryChanged$.pipe(
        debounceTime(250),              // wait 300ms after the last event before emitting last event
            distinctUntilChanged())     // only emit if value is different from previous value
            .subscribe(searchQuery =>{
              // get apps by search query

              this.applicationsService.getFilteredAppsByName(this.searchQuery)
              .pipe(take(1))
              .subscribe((apps: ApplicationListItem[]) => {
                this.apps = apps;
                this.isPending = false;
                this.cdr.markForCheck();
              });
            });
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy()");
    this.sub.unsubscribe();
  }


  ngOnInit(): void {
    this.isPending = true;

    this.applicationsService.getApplications()
      .pipe(take(1))
      .subscribe((apps: ApplicationListItem[]) => {
        this.apps = apps;
        this.isPending = false;
        this.cdr.markForCheck();
      });

      this.sub = this.applicationsService.appDeleted$.subscribe(appId => {
        this.applicationsService.deleteApplications(appId).subscribe(res =>{
        this.isPending = false;
        const updatedApps = this.apps.filter(app => app.id.toString() !== appId);
        this.apps = updatedApps;
        this.cdr.markForCheck();
        });
      });
  }

  ngAfterViewInit(): void {

  }


  onTextChanged():void{

    this.searchQuery = this.searchInput!.nativeElement.value;
    this.searchQueryChanged$.next(this.searchQuery);
  }

  public navigateToDetails(app: ApplicationListItem) {
    this.router.navigate([`applications/${app.id}/details`]);
  }

  onDestroy(): void {
    console.log("onDestroy()");
  }
}
