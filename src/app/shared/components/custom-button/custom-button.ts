import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonInterface } from '../../../core/models/custom-button.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-custom-button',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss'
})
export class CustomButton {
  @Input() config!: CustomButtonInterface;
}
