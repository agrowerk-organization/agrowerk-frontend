import { Component } from '@angular/core';
import { InitialCta } from "./initial-cta/initial-cta";

@Component({
  selector: 'app-home.page',
  imports: [InitialCta],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

}
