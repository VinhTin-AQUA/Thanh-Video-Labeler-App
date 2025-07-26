import { Routes } from '@angular/router';
import { UploadFile } from './pages/upload-file/upload-file';
import { DownloadVideo } from './pages/download-video/download-video';
import { Labeling } from './pages/labeling/labeling';

export const routes: Routes = [
    { path: 'upload-video', component: UploadFile, title: 'Upload file' },
    { path: 'download-video', component: DownloadVideo, title: 'Download Video' },
    { path: 'labeling', component: Labeling, title: 'Labeling' },
    { path: '', redirectTo: 'upload-video', pathMatch: 'full' },
];
