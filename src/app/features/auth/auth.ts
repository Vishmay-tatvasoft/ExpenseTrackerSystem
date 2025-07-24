import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth implements AfterViewInit {
  @ViewChild('bgVideo') bgVideoRef!: ElementRef<HTMLVideoElement>;
  ngAfterViewInit() {
    const video = this.bgVideoRef.nativeElement;

    video.muted = true;
    video.play().then(() => {
      console.log("Autoplay started");
    }).catch((err) => { console.warn('Autoplay failed:', err); }
    );
  }
}
