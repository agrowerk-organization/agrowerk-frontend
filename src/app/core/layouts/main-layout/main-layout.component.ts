import { Component } from '@angular/core';
import { FooterLayout } from '../../../shared/layouts-components/footer/footer.layout';
import { NavbarLayout } from "../../../shared/layouts-components/navbar/navbar.layout";

@Component({
  selector: 'app-main-layout',
  imports: [FooterLayout, NavbarLayout],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {

}
