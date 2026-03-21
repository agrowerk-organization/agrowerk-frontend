import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { UserType } from '@core/ui/types/user/user-type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-type-selector',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './user-type-selector.html',
})
export class UserTypeSelector {
  userTypes = input.required<UserType[]>();

  activeId = input.required<string>();

  typeChanged = output<string>();

  onSelect(id: string) {
    this.typeChanged.emit(id);
  }
}
