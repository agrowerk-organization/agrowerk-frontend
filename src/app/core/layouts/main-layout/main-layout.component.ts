import { Component } from '@angular/core';
import { FooterLayout } from '../../../shared/layouts-components/footer/footer.layout';
import { NavbarLayout } from "../../../shared/layouts-components/navbar/navbar.layout";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [FooterLayout, NavbarLayout, RouterOutlet],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {

}
