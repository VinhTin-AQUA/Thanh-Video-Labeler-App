import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { VideoService } from './video-service';
import { showGlobalDialog } from '../../shared/signals/dialog-signal';
import {
    hideGlobalLoading,
    showGlobalLoading,
} from '../../shared/signals/loading-signal';
import { VideoInfo } from './models/video-info';

@Component({
    selector: 'app-download-video',
    imports: [CommonModule],
    templateUrl: './download-video.html',
    styleUrl: './download-video.scss',
})
export class DownloadVideo {
    videos: VideoInfo[] = [];
    totalVideos: number = 0;
    downloadedCount: number = 0;

    isDownloading: boolean = false;
    isLoading: boolean = false;
    downloadInterval: any;
    inited = signal<boolean>(false);
    isDisabled = computed(() => this.videos.length === 0 && !this.isLoading);
    sheetName: string = '';
    startRowInSheet: number = 1;


    constructor(private videoService: VideoService) {}

    initVideos() {
        showGlobalLoading();
        this.videoService.initVideo().subscribe({
            next: (res: any) => {
                showGlobalDialog('Init download', res.message, true);

                this.videos = res.data.listNewVideo;
                this.totalVideos = res.data.total;
                this.downloadedCount = 0;
                this.sheetName = res.data.sheetName;
                this.startRowInSheet = res.data.startRowInSheet;
                hideGlobalLoading();
            },
            error: (err) => {
                showGlobalDialog('Init download', err.error.message, false);
                hideGlobalLoading();
            },
        });
    }

    toggleDownload() {
        if (this.isDownloading) {
            // Giả lập stop
            clearInterval(this.downloadInterval);
            this.isDownloading = false;
            this.isLoading = false;
            return;
        }

        this.startDownload();
    }

    startDownload() {
        this.isDownloading = true;
        this.isLoading = true;

        let count = 0;
        this.downloadedCount = 0;

        // Giả lập tải video mỗi 200ms
        this.downloadInterval = setInterval(() => {
            if (count >= this.totalVideos) {
                clearInterval(this.downloadInterval);
                this.isDownloading = false;
                this.isLoading = false;
            } else {
                this.downloadedCount++;
                count++;
            }
        }, 200);
    }
}
