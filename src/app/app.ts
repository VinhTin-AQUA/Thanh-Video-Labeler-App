import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './pages/components/header/header';
import { GlobalLoading } from "./shared/components/global-loading/global-loading";
import { GlobalDialog } from "./shared/components/global-dialog/global-dialog";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, GlobalLoading, GlobalDialog],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('ExcelVideoLabelerApp');
}
