import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function postPet(input: FormData) {
  try {
    const response = await axios.post('/post', input, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response);
    return 'success';
  } catch (e: any) {
    return { ERROR: e.message };
  }
}
