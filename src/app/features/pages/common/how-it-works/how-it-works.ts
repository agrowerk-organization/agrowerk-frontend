import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Title } from "../../../../shared/components/title/title";
import { Subtitle } from "../../../../shared/components/subtitle/subtitle";
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { UserType } from '../../../../core/ui/types/user/user-type';
import { ICONS_HOW_IT_WORKS } from '../../../../core/ui/icons/icons-common/icons-how-it-works/icons.how-it-works';
import { HowItWorksSchema } from '../../../../core/ui/schemas/how-it-works.schema';
import howItWorksData from '../../../../../assets/files/how-it-works/how-it-works.json';
import { UserTypeSelector } from "./how-it-works-components/user-type-selector/user-type-selector";
import { TextTitle } from "../../../../shared/components/text-title/text-title";
import { UserSteps } from "./how-it-works-components/user-steps/user-steps";
import { FaqPreview } from './how-it-works-components/faq-preview/faq-preview';
@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    Subtitle,
    MeshGradient,
    Pattern,
    Breadcrumb,
    UserTypeSelector,
    TextTitle,
    UserSteps,
    FaqPreview
],
  templateUrl: './how-it-works.html'
})
export class HowItWorks {
  icons = ICONS_HOW_IT_WORKS;
  private data = HowItWorksSchema.parse(howItWorksData);
  
  activeUserType = signal<string>('producer');

  userTypes = signal<UserType[]>(this.data.userTypes.map(type => ({
    ...type,
    icon: this.icons[type.iconKey as keyof typeof ICONS_HOW_IT_WORKS],
    steps: type.steps.map(step => ({
      ...step,
      icon: this.icons[step.iconKey as keyof typeof ICONS_HOW_IT_WORKS],
    }))
  })));

  currentUserType = computed(() =>
    this.userTypes().find(type => type.id === this.activeUserType())
  );

  currentStep = computed(() =>
    this.currentUserType()?.steps ?? []
  );

  selectUserType(typeId: string) : void {
    this.activeUserType.set(typeId);
  }
}
