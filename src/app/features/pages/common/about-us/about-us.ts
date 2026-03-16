import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Breadcrumb } from "../../../../shared/components/breadcrumb/breadcrumb";
import { ICONS_ABOUT_US } from '../../../../core/ui/icons/icons-common/icons-about-us/icons.about-us';
import { Title } from "../../../../shared/components/title/title";
import { Subtitle } from "../../../../shared/components/subtitle/subtitle";
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";
import { MissionVision } from "./about-us-components/mission-vision/mission-vision";
import { Value } from '../../../../core/ui/types/about-us/value';
import { ValuesGrid } from "./about-us-components/values-grid/values-grid";
import { Timeline } from "./about-us-components/timeline/timeline";
import { Milestone } from '../../../../core/ui/types/about-us/milestone';
import { TeamMember } from '../../../../core/ui/types/about-us/team-member';
import { TextTitle } from "../../../../shared/components/text-title/text-title";
import { Team } from './about-us-components/team/team';
import { Actions } from '../../../../shared/components/actions/actions';
import { Content } from '../../../../core/ui/types/generic/content.initial-cta';
import ABOUT_DATA from './../.././../../../assets/files/about-us/about-us.json';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    Breadcrumb,
    Title,
    Subtitle,
    MeshGradient,
    Pattern,
    MissionVision,
    ValuesGrid,
    Team,
    Timeline,
    TextTitle,
    Actions
  ],
  templateUrl: './about-us.html'
})
export class AboutUs {
  icons = ICONS_ABOUT_US;

  private readonly actionMap: Record<string, () => void> = {
    goToRegister: () => this.goToRegister(),
    goToContact: () => this.goToContact()
  };

  actions: Content[] = ABOUT_DATA.actions.map(action => ({
    ...action,
    icon: this.icons[action.iconKey as keyof typeof ICONS_ABOUT_US],
    action: this.actionMap[action.actionKey]
  }));

  values: Value[] = ABOUT_DATA.values.map(value => ({
    ...value,
    icon: this.icons[value.iconKey as keyof typeof ICONS_ABOUT_US]
  }));

  milestones: Milestone[] = ABOUT_DATA.milestones;

  team: TeamMember[] = ABOUT_DATA.team;

  stats = ABOUT_DATA.stats;

  goToRegister(): void {
    return;
  }

  goToContact(): void {
    return;
  }
}