import { Component, inject, signal } from '@angular/core';
import { UploadService } from './upload-service';
import {
    globalLoadingSignal,
    hideGlobalLoading,
    showGlobalLoading,
} from '../../shared/signals/loading-signal';
import { showGlobalDialog } from '../../shared/signals/dialog-signal';

@Component({
    selector: 'app-upload-file',
    imports: [],
    templateUrl: './upload-file.html',
    styleUrl: './upload-file.scss',
})
export class UploadFile {
    selectedFile: File | null = null;
    uploadService = inject(UploadService);
    isAccepted = signal<boolean>(false);

    onFileSelected(event: any): void {
        const file = event.target.files?.[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        const file = event.dataTransfer?.files?.[0];
        if (file) {
            this.selectedFile = file;
            this.uploadFile();
        }
    }

    uploadFile() {
        showGlobalLoading();
        if (this.selectedFile) {
            this.uploadService.upload(this.selectedFile, false).subscribe({
                next: (res: any) => {
                    showGlobalDialog('Upload file', res.message, true);
                    hideGlobalLoading();
                },
                error: (err) => {
                    if (err.error.data.isAccepted) {
                        this.isAccepted.set(err.error.data.isAccepted);
                    }
                    showGlobalDialog('Upload file', err.error.message, false);
                    hideGlobalLoading();
                },
            });
        }
    }

    acceptUploadFile() {
        showGlobalLoading();
        if (this.selectedFile) {
            this.uploadService.upload(this.selectedFile, true).subscribe({
                next: (res: any) => {
                    showGlobalDialog('Upload file', res.message, true);
                    hideGlobalLoading();
                },
                error: (err) => {
                    showGlobalDialog('Upload file', err.error.message, false);
                    hideGlobalLoading();
                },
            });
        }
    }
}
