import { createContext, ReactNode, useContext, useState } from "react";
import { NAME_KEY } from "../services/auth";

interface DesignedTo{
  _id : string;
  name : string;
}
interface ActivitiesProps{
  _id : string;
  designedTo : DesignedTo[];
  title : string;
  description: string;
  body: string;
  experience : number;
}

interface ActivityContextData{
  activities: ActivitiesProps[];
  setActivitiesState: (values:  ActivitiesProps[]) => void;
  name: string;
  setUserName: ()=> void
}

interface ActivityProvider{
  children: ReactNode;
}

export const ActivityContext = createContext({} as ActivityContextData)

export function ActivityProvider({children} : ActivityProvider){
  const [ activities, setActivities ] = useState<ActivitiesProps[]>([])
  const [ name, setName ] = useState("")

  function setUserName(){ setName(localStorage.getItem(NAME_KEY)) }

  function setActivitiesState(values : ActivitiesProps[]){
    setActivities(values)
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        setActivitiesState,
        name,
        setUserName
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity(){
  return useContext(ActivityContext)
}