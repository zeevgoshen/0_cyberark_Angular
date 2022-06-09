import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { ApplicationsService } from "../applications-service";

@Component({
  selector: 'app-ddl',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DropDownComponent
{
  @Input() appId: string = "";

  ngOnInit(): void {}

  constructor(private applicationsService: ApplicationsService) {}

  onDeleteClick(appId: string) {
    this.applicationsService.appDeleted$.next(appId);
  }
}
