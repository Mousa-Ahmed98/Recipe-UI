import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}

// Thanks to : https://danielk.tech/home/angular-how-to-add-a-loading-spinner
