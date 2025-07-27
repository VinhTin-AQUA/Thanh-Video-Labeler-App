import { Routes } from '@angular/router';
import { UploadFile } from './pages/upload-file/upload-file';
import { DownloadVideo } from './pages/download-video/download-video';
import { Labeling } from './pages/labeling/labeling';
import { ServerDown } from './shared/pages/server-down/server-down';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
    { path: 'upload-video', component: UploadFile, title: 'Upload file' },
    { path: 'download-video', component: DownloadVideo, title: 'Download Video' },
    { path: 'labeling', component: Labeling, title: 'Labeling' },
    { path: 'server-down', component: ServerDown, title: 'Server Down' },
    { path: 'settings', component: Settings, title: 'Settings' },
    { path: '', redirectTo: 'upload-video', pathMatch: 'full' },
];
