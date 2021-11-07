import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export async function postPet(input: FormData) {
  try {
    await axios.post('/post', input, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return 'success';
  } catch (e: any) {
    return { ERROR: e.message };
  }
}
