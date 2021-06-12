export interface UserProps {
  _id: string;
  activitiesFinishedToday: number;
  activityValidity?: Date;
  allActivitiesFinished: number;
  answers: string[];
  createdAt: Date | string;
  email: string;
  myCurrentActivities?: any;
  name: string;
}