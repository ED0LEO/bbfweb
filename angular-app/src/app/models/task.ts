import { User } from './user.model';

export class Task {
  id!: number;
  title!: string;
  description!: string;
  completion!: boolean;
  completionDate?: string;
  user?: User;
}
