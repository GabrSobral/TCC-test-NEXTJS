export interface DesignedTo{
  _id : string;
  name : string;
}

export interface ActivitiesProps{
  _id : string;
  designedTo : DesignedTo[];
  title : string;
  description: string;
  body: string;
  experience : number;
}

