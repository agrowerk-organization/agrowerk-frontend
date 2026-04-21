import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './back-button.html'
})
export class BackButton {
  readonly link = input<string>();
  readonly icon = faArrowLeft;
}
