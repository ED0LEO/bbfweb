import { Task } from './task';
import { Habit } from './habit.model';
import { Activity } from './activity.model';

export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  password!: string;
  sourceVideos!: string[];
  points!: number;
  tasks?: Task[];
  habits?: Habit[];
  dayPlanner?: Activity[];
}
