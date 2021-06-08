export interface UserProps {
  _id: string;
  activitiesFinishedToday: number;
  activityValidity?: Date;
  allAtivitiesFinished: number;
  answers: string[];
  createdAt: Date | string;
  email: string;
  myCurrentActivities?: any;
  name: string;
}