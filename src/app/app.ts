import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { GlobalLoading } from './shared/components/global-loading/global-loading';
import { GlobalDialog } from './shared/components/global-dialog/global-dialog';
import { HealthService } from './shared/services/health-service';
import { DownloadVideoService } from './pages/download-video/services/download-video-service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, GlobalLoading, GlobalDialog],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('ExcelVideoLabelerApp');

    constructor(
        private healthService: HealthService,
        private router: Router,
        private videoService: DownloadVideoService
    ) {}

    ngOnInit() {
        // this.healthService.ping().subscribe({
        //     next: (_) => {
        //         this.router.navigateByUrl('/');
        //     },
        //     error: (_) => {
        //         this.router.navigateByUrl('/server-down');
        //     },
        // });

        // this.videoService.stopDownloadVideo().subscribe({
        //     next: (_) => {},
        //     error: (_) => {},
        // });
    }
}
