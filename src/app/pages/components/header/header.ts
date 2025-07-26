import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
    readonly menuItems: any = [
        {
            name: 'Upload Video',
            routerLink: '/upload-video',
        },
        {
            name: 'Init Download',
            routerLink: '/init-download',
        },
        {
            name: 'Download Video',
            routerLink: '/download-video',
        },
        {
            name: 'Labeling',
            routerLink: '/labeling',
        },
    ];
}
