import { ApplicationStatus } from './application-status';

export interface ApplicationListItem {
  id: string;
  name: string;
  logo: string;
  url: string;
  status: ApplicationStatus;
  countOfUseLastHour: number;
}
