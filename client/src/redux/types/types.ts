import { message } from "../../components/Messages/Message";

export interface PostType {
  name?: string;
  description: string;
  genre: string;
  date: string;
  petImage: any;
  type: string;
  state: string;
  _id?: string;
  latitude: string;
  longitude: string;
  user?: string;
}
//File | null | undefined | string

export interface conversation {
  members: string[];
  _id: string;
  messages: message[];
  updatedAt:string;
}
export interface detailProps {
  id: string;
}

export interface Filters {
  state: string;
  type: string;
  genre: string;
}
