declare var AdminLTE:any;

import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements AfterViewInit{
  ngAfterViewInit(): void {
    // Re-initialize AdminLTE after sidebar is rendered
    setTimeout(() => {
      // Only required if sidebar doesn't respond to toggle
      (window as any).AdminLTE?.Layout?.init();
      (window as any).AdminLTE?.PushMenu?.init(); // for sidebar toggle button
    }, 0);
  }
}
