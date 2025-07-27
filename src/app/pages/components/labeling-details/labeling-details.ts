import { Component, Input } from '@angular/core';
import { VideoInfo } from '../../labeling/models/videoInfo';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-labeling-details',
    imports: [FormsModule],
    templateUrl: './labeling-details.html',
    styleUrl: './labeling-details.scss',
})
export class LabelingDetails {
    @Input() videoInfo!: VideoInfo;
}
