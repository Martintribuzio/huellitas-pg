import axios from "axios";
import { ERROR, POST_PET } from "../redux/types/actionTypes";

export async function postPet(input: FormData){
      try{
        let info = await axios.post('http://localhost:3001/post', input, {
        method: 'post',
        url: 'http://localhost:3001/post',
        data: input,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return('success');
      }catch(e: any){
        return({"ERROR": e.message});
      }
  }