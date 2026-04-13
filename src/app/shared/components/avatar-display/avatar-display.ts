import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-display.html',
})
export class AvatarDisplay {
  avatarUrl = input<string | null>(null);
  name      = input<string>('');
  size      = input<string>('w-24 h-24'); // customizável por contexto

  initials = computed(() =>
    this.name().split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
  );
}