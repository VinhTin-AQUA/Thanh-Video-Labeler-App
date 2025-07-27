import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConvertToQueryString } from '../../helper/convertToQueryString';
import { VideoInforService } from './services/video-infor-service';
import { VideoInfo } from './models/videoInfo';
import { LabelingDetails } from '../labeling-details/labeling-details';
import { hideGlobalLoading, showGlobalLoading } from '../../shared/signals/loading-signal';
import { hideGlobalDialog } from '../../shared/signals/dialog-signal';

@Component({
    selector: 'app-labeling',
    imports: [FormsModule, LabelingDetails],
    templateUrl: './labeling.html',
    styleUrl: './labeling.scss',
})
export class Labeling {
    filters = {
        transIdOrPayment: '',
        label: false,
        noLabel: false,
        page: 1,
        pageSize: 20,
    };

    showPopup = false;
    clearAllData = false;

    videos = signal<VideoInfo[]>([]);

    constructor(private videoInforService: VideoInforService) {}

    ngOnInit() {
        this.filter();
    }

    private filter() {
        this.videoInforService
            .getVideo(ConvertToQueryString(this.filters))
            .subscribe({
                next: (res: any) => {
                    this.videos.update((x) => res.data);
                },
                error: (err) => {
                    console.log(err.error);
                },
            });
    }

    applyFilter() {
        this.filter();
    }

    nextPage() {
        this.filters.page++;
        this.filter();
    }

    prevPage() {
        if (this.filters.page > 1) {
            this.filters.page--;
            this.filter();
        }
    }

    selectedVideo: VideoInfo | null = null;

    openVideoModal(video: VideoInfo) {
        this.selectedVideo = video;

        if (this.selectedVideo) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }

    closeModal() {
        this.selectedVideo = null;
        document.body.classList.remove('overflow-hidden');
    }

    // export excel
    openExportExcelPopup() {
        this.showPopup = true;
    }

    closeExportExcelPopup() {
        this.showPopup = false;
        this.clearAllData = false;
    }

    downloadExcel() {
        console.log(this.clearAllData);
        showGlobalLoading();
        this.videoInforService
            .exportExcel({ clearAllData: this.clearAllData })
            .subscribe({
                next(value) {
                    const fileName = 'Export.xlsx';
                    const url = window.URL.createObjectURL(value);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url); // dọn dẹp
                    hideGlobalLoading();
                },
                error(err) {
                    hideGlobalLoading();
                    console.error('Lỗi khi tải file:', err);
                    
                },
            });
    }
}
