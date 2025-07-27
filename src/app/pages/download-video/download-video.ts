import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { VideoService } from './services/video-service';
import { showGlobalDialog } from '../../shared/signals/dialog-signal';
import {
    hideGlobalLoading,
    showGlobalLoading,
} from '../../shared/signals/loading-signal';
import { VideoInfo } from './models/video-info';
import { VideoHub } from './hubs/video-hub';
import { resultDownloadVideoSignal } from './signal/total-result-signal';

@Component({
    selector: 'app-download-video',
    imports: [CommonModule],
    templateUrl: './download-video.html',
    styleUrl: './download-video.scss',
})
export class DownloadVideo {
    totalVideos: number = 0;
    isDownloading: boolean = false;
    isLoading: boolean = false;
    sheetName: string = '';
    startRowInSheet: number = 1;
    resultDownloadVideoSignal = computed(() => resultDownloadVideoSignal());
    videos = signal<VideoInfo[]>([]);

    constructor(
        private videoService: VideoService,
        private videoSignalService: VideoHub
    ) {}

    ngOnInit(): void {
        this.videoSignalService.startConnection();
        this.getRemainingVideos();
    }

    getRemainingVideos() {
        showGlobalLoading();
        this.videoService.getRemainingVideos().subscribe({
            next: (res: any) => {
                hideGlobalLoading();
                if (res.data.total <= 0) {
                    return;
                }

                this.videos.set(res.data.listVideo);
                this.totalVideos = res.data.total;
                this.sheetName = res.data.sheetName;
                this.startRowInSheet = res.data.startRowInSheet;
            },
            error: (err) => {
                hideGlobalLoading();
            },
        });
    }

    initVideos() {
        showGlobalLoading();
        this.videoService.initVideo().subscribe({
            next: (res: any) => {
                showGlobalDialog('Init download', res.message, true);

                this.videos.set(res.data.listNewVideo);
                this.totalVideos = res.data.total;
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

    // stop
    toggleDownload() {
        if (this.isDownloading) {
            // Giả lập stop

            this.isDownloading = false;
            this.isLoading = false;

            this.videoService.stopDownloadVideo().subscribe({
                next: (res: any) => {
                    showGlobalDialog('Stop Dowload', res.message, true);
                },
                error: (err) => {
                    showGlobalDialog('Stop Dowload', err.error.message, false);
                },
            });
        } else {
            this.startDownload();
        }
    }

    // download
    startDownload() {
        this.isDownloading = true;
        this.isLoading = true;

        this.videoService.startDownloadVideo().subscribe({
            next: (res: any) => {
                showGlobalDialog('Dowload', res.message, true);
            },
            error: (err) => {
                showGlobalDialog('Dowload', err.error.message, false);
            },
        });
    }

    copyToClipboard(text: string) {
        navigator.clipboard
            .writeText(text)
            .then(() => {})
            .catch((err) => {});
    }
}
