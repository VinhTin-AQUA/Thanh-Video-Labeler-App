import { Routes } from '@angular/router';
import { UploadFile } from './pages/upload-file/upload-file';
import { DownloadVideo } from './pages/download-video/download-video';
import { Labeling } from './pages/labeling/labeling';
import { ServerDown } from './shared/pages/server-down/server-down';

export const routes: Routes = [
    { path: 'upload-video', component: UploadFile, title: 'Upload file' },
    { path: 'download-video', component: DownloadVideo, title: 'Download Video' },
    { path: 'labeling', component: Labeling, title: 'Labeling' },
    { path: 'server-down', component: ServerDown, title: 'Server Down' },
    { path: '', redirectTo: 'upload-video', pathMatch: 'full' },
];
