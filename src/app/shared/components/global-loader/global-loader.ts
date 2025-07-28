import { Component, inject } from '@angular/core';
import { Loader } from '../../../core/services/global/loader';

@Component({
  selector: 'app-global-loader',
  imports: [],
  templateUrl: './global-loader.html',
  styleUrl: './global-loader.scss'
})
export class GlobalLoader {
  loaderService = inject(Loader);
}
