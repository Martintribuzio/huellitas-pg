import axios from "axios";

export async function postPet(input: FormData){
      try{
        await axios.post('http://localhost:3001/post', input, {
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