import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConvertToQueryString } from '../../helper/convertToQueryString';
import { VideoInforService } from './services/video-infor-service';
import { VideoInfo } from './models/videoInfo';
import { LabelingDetails } from '../components/labeling-details/labeling-details';

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
}
