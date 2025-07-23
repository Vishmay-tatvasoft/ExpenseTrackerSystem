import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements AfterViewInit {
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
