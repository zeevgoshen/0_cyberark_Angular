import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

import { ApplicationListItem } from './models/application-list-item';

const baseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})

export class ApplicationsService {

  public appDeleted$ = new Subject<string>();

  public allApps: Observable<ApplicationListItem[]>;
  public filteredApps: Observable<ApplicationListItem[]>;


  constructor(private http: HttpClient) {
    this.filteredApps = new Observable<ApplicationListItem[]>();
    this.allApps = new Observable<ApplicationListItem[]>();

  }

  getApplications(): Observable<ApplicationListItem[]> {
    return this.http.get<ApplicationListItem[]>(`${baseUrl}/applications`);
  }

  deleteApplications(id: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/applications/${id}`);
  }

  getFilteredAppsByName(searchText: string): Observable<ApplicationListItem[]> {
    return this.http.get<ApplicationListItem[]>(`${baseUrl}/applications`)
    .pipe(map(items => items.filter(item => item.name.toLowerCase().indexOf(searchText) > -1)) )
  }
}
