export type TraineeNotificationType =
  | 'trainer_absence'
  | 'workout_reminder'
  | 'subscription'
  | 'achievement'
  | 'info';

export type TrainerNotificationType =
  | 'activity'
  | 'request'
  | 'schedule'
  | 'alert'
  | 'achievement'
  | 'progress';

export interface BaseNotification<T extends string> {
  id: string;
  type: T;
  title: string;
  message: string;
  createdAt: string; // ISO datetime — format to "2 hours ago" style client-side
  isUnread: boolean;
}

export type TraineeNotification = BaseNotification<TraineeNotificationType>;
export type TrainerNotification = BaseNotification<TrainerNotificationType>;
