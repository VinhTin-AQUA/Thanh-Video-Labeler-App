import { Component, Input } from '@angular/core';
import { VideoInfo } from '../labeling/models/videoInfo';
import { FormsModule } from '@angular/forms';
import { VideoInforService } from '../labeling/services/video-infor-service';
import { showGlobalDialog } from '../../shared/signals/dialog-signal';
import { environment } from '../../../environments/environment.development';

@Component({
    selector: 'app-labeling-details',
    imports: [FormsModule],
    templateUrl: './labeling-details.html',
    styleUrl: './labeling-details.scss',
})
export class LabelingDetails {
    @Input() videoInfo!: VideoInfo;
    videoUrl = environment.videoBaseUrl + '/VideoFolder'

    constructor(private videoInforService: VideoInforService) {}

    update() {
        this.videoInforService
            .update({ id: this.videoInfo.id, label: this.videoInfo.label })
            .subscribe({
                next: (res: any) => {
                    showGlobalDialog('Update', res.message, true);
                },
                error: (err: any) => {
                    showGlobalDialog('Update', err.error.message, false);
                },
            });
    }
}
