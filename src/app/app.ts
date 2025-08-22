import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationBar} from './components/navigation-bar/navigation-bar';
import {HomePage} from './pages/home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('VNI-Client');
}
