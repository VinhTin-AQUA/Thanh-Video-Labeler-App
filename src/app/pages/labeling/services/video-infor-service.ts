import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class VideoInforService {
    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    getVideo(query: string) {
        return this.http.get(`${this.baseUrl}/video/Filter?${query}`);
    }
}
