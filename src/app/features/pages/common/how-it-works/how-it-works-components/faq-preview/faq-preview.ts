import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonPages } from "../../../../../../shared/components/buttons/button-pages/button-pages";
import { ICONS_HOW_IT_WORKS } from '../../../../../../core/ui/icons/icons-common/icons-how-it-works/icons.how-it-works';
import { TextTitle } from "../../../../../../shared/components/text-title/text-title";

@Component({
  selector: 'app-faq-preview',
  standalone: true,
  imports: [CommonModule, ButtonPages, TextTitle],
  templateUrl: './faq-preview.html',
})
export class FaqPreview {
  private router = inject(Router);

  icon = ICONS_HOW_IT_WORKS;

  handleAction = () => {
    this.router.navigate(['/help-and-support']);
  }
}
