import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  @Input() text: string;
  @Input() isLoading: boolean;

  constructor() {
    this.text = '';
    this.isLoading = false;
  }

  ngOnInit() {

  }
}

