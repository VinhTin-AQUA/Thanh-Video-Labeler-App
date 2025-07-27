import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DownloadVideoService {
    readonly baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    getRemainingVideos() {
        return this.http.get(`${this.baseUrl}/video/GetRemainingVideos`);
    }

    initVideo() {
        return this.http.post(`${this.baseUrl}/video/InitDownloadVideo`, {});
    }

    startDownloadVideo() {
        return this.http.post(`${this.baseUrl}/video/StartDownload`, {});
    }

    stopDownloadVideo() {
        return this.http.post(`${this.baseUrl}/video/StopDownload`, {});
    }
}
