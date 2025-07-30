import { Component } from '@angular/core';
import { Sidebar } from './pages/sidebar/sidebar';
import { Header } from './pages/header/header';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar,Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
