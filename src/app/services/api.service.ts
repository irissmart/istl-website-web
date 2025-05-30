import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'environments/environment.development';

interface ClientServicesParams {
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = `${environment.baseUrl}`;

  getAllPages(): Observable<any[]> {
    return this.http.get<any>(`${this.apiBaseUrl}/Pages`).pipe(
      map(response => response.data)
    );
  }

  getSectionsByPageId(pageId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }

    );

    return this.http.get<any>(
      `${this.apiBaseUrl}/Sections?pageId=${pageId}`,
      { headers }
    ).pipe(
      map(response => response.data)
    );
  }

  getAllHomeTestimonials(
    pageNumber?: number,
    pageSize?: number,
    searchText?: string
  ): Observable<any[]> {

    let params = new HttpParams();

    if (pageNumber !== undefined && pageNumber !== null) {
      params = params.append('PageNumber', pageNumber.toString());
    }

    if (pageSize !== undefined && pageSize !== null) {
      params = params.append('PageSize', pageSize.toString());
    }

    if (searchText !== undefined && searchText !== null && searchText.trim() !== '') {
      params = params.append('Text', searchText.trim());
    }

    return this.http.get<any>(`${this.apiBaseUrl}/Testimonials`, { params })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching testimonials:', error);
          return of([]);
        })
      );
  }

  getAllClientServiceCategories(
    pageNumber?: number,
    pageSize?: number,
    searchText?: string
  ): Observable<any[]> {
    let params = new HttpParams();

    if (pageNumber !== undefined && pageNumber !== null) {
      params = params.append('PageNumber', pageNumber.toString());
    }

    if (pageSize !== undefined && pageSize !== null) {
      params = params.append('PageSize', pageSize.toString());
    }

    if (searchText !== undefined && searchText !== null && searchText.trim() !== '') {
      params = params.append('Text', searchText.trim());
    }

    return this.http.get<any>(`${this.apiBaseUrl}/ClientServiceCategorys`, { params })
      .pipe(
        map(response => response.data)
      );
  }

  getAllClients(
    pageNumber?: number,
    pageSize?: number,
    searchText?: string
  ): Observable<any[]> {
    let params = new HttpParams();

    if (pageNumber !== undefined && pageNumber !== null) {
      params = params.append('PageNumber', pageNumber.toString());
    }

    if (pageSize !== undefined && pageSize !== null) {
      params = params.append('PageSize', pageSize.toString());
    }

    if (searchText !== undefined && searchText !== null && searchText.trim() !== '') {
      params = params.append('Text', searchText.trim());
    }
    return this.http.get<any>(`${this.apiBaseUrl}/Clients`, { params })
      .pipe(
        map(response => response.data)
      );
  }

  getAllPartners(
    pageNumber?: number,
    pageSize?: number,
    searchText?: string
  ): Observable<any[]> {
    let params = new HttpParams();

    if (pageNumber !== undefined && pageNumber !== null) {
      params = params.append('PageNumber', pageNumber.toString());
    }

    if (pageSize !== undefined && pageSize !== null) {
      params = params.append('PageSize', pageSize.toString());
    }

    if (searchText !== undefined && searchText !== null && searchText.trim() !== '') {
      params = params.append('Text', searchText.trim());
    }
    return this.http.get<any>(`${this.apiBaseUrl}/Partners`, { params })
      .pipe(
        map(response => response.data)
      );
  }

  getAllServiceCategory(
    pageNumber?: number,
    pageSize?: number,
    searchText?: string
  ): Observable<any[]> {
    let params = new HttpParams();

    if (pageNumber !== undefined && pageNumber !== null) {
      params = params.append('PageNumber', pageNumber.toString());
    }

    if (pageSize !== undefined && pageSize !== null) {
      params = params.append('PageSize', pageSize.toString());
    }

    if (searchText !== undefined && searchText !== null && searchText.trim() !== '') {
      params = params.append('Text', searchText.trim());
    }

    return this.http.get<any>(`${this.apiBaseUrl}/ClientServiceCategorys`, { params })
      .pipe(
        map(response => response.data)
      );
  }

  getAllTeamMembers(
    pageNumber?: number,
    pageSize?: number,
    searchText?: string
  ): Observable<any[]> {
    let params = new HttpParams();

    if (pageNumber !== undefined && pageNumber !== null) {
      params = params.append('PageNumber', pageNumber.toString());
    }

    if (pageSize !== undefined && pageSize !== null) {
      params = params.append('PageSize', pageSize.toString());
    }

    if (searchText !== undefined && searchText !== null && searchText.trim() !== '') {
      params = params.append('Text', searchText.trim());
    }

    return this.http.get<any>(`${this.apiBaseUrl}/TeamMembers`, { params })
      .pipe(
        map(response => response.data)
      );
  }


  getAllClientServicesByCategoryId(
    id: number,
    params?: ClientServicesParams
  ): Observable<any[]> {
    let httpParams = new HttpParams().set('categoryId', id.toString());

    if (params) {
      if (params.pageNumber !== undefined && params.pageNumber !== null) {
        httpParams = httpParams.append('PageNumber', params.pageNumber.toString());
      }

      if (params.pageSize !== undefined && params.pageSize !== null) {
        httpParams = httpParams.append('PageSize', params.pageSize.toString());
      }

      if (params.searchText !== undefined && params.searchText !== null && params.searchText.trim() !== '') {
        httpParams = httpParams.append('Text', params.searchText.trim());
      }
    }

    return this.http.get<any>(`${this.apiBaseUrl}/ClientServices`, { params: httpParams })
      .pipe(
        map(response => response.data)
      );
  }

  getClientServiceCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/ClientServiceCategory?id=${id}`).pipe(
      map(response => response.data)
    );
  }

  getClientServiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/ClientService?id=${id}`).pipe(
      map(response => response.data)
    );
  }

  getClientRelatedService(id: number, serviceName: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/ClientServices/related?id=${id}&serviceName=${serviceName}`).pipe(
      map(response => response.data)
    );
  }

  getAllJobs(
    filter: string | null,
    categoryId: number | null,
    isEnabled: boolean | null,
    isAdmin: boolean | null,
    pageNumber: number | null,
    pageSize: number | null
  ): Observable<any> {
    const params: any = {};

    if (filter) {
      params.Text = filter;
    }

    if (categoryId) {
      params.categoryId = categoryId;
    }

    if (isEnabled !== null) {
      params.isEnabled = isEnabled;
    }

    if (isAdmin !== null) {
      params.isAdmin = isAdmin;
    }

    if (pageNumber !== null) {
      params.PageNumber = pageNumber;
    }

    if (pageSize !== null) {
      params.PageSize = pageSize;
    }

    return this.http.get<any>(`${this.apiBaseUrl}/Jobs`, { params }).pipe(
      map(response => response.data)
    );
  }

  getAllJobsLookup(filter: string | null, categoryId: number | null): Observable<any> {
    const params: any = {};

    if (filter) {
      params.Text = filter;
    }

    if (categoryId) {
      params.categoryId = categoryId;
    }

    return this.http.get<any>(`${this.apiBaseUrl}/Jobs/Lookup`, { params }).pipe(
      map(response => response.data)
    );
  }

  getAllJobCategories(
    pageNumber: number | null = null,
    pageSize: number | null = null,
    text: string | null = null
  ): Observable<any[]> {
    const params: any = {};

    if (pageNumber !== null) {
      params.PageNumber = pageNumber;
    }

    if (pageSize !== null) {
      params.PageSize = pageSize;
    }

    if (text) {
      params.Text = text;
    }

    return this.http.get<any>(`${this.apiBaseUrl}/JobCategorys`, { params }).pipe(
      map(response => response.data)
    );
  }

  AddUserContactInformation(body: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/ContactRequest`, body).pipe(
      map(response => response)
    );
  }

  AddJobApplication(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/JobApplication`, formData).pipe(
      map(response => response)
    );
  }
}
