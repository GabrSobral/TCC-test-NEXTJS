export interface TypeProps{
  _id : string;
  name : string;
}
export interface QuestionProps{
  body : string;
  _id : string;
  type : TypeProps[]
}