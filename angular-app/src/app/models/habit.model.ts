import { User } from './user.model';

export class Habit {
  id!: number;
  name!: string;
  lastUsedTime?: string;
  isGoodHabit!: boolean;
  user?: User;
}
