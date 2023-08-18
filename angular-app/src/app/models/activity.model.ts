import { User } from './user.model';

export class Activity {
  id!: number;
  name!: string;
  startTime?: string;
  endTime?: string;
  user?: User;
}
