import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-card-person',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './card-person.html',
})
export class CardPerson {

  avatar = input.required<string | undefined>();
  name = input.required<string>();
  role = input.required<string>();
  bio = input.required<string>();
  linkLinkedIn = input<string>();
  linkGitHub = input<string>();

  linkedin = faLinkedin;
  github = faGithub;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2); 
  }
}
