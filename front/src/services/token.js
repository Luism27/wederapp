
import axios from 'axios';
import fire from '../config/fire';

const url = 'http://localhost:8080/api/example';

const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());

  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}

export const addExample = async (name, number) => {
  const header = await createToken();

  const payload = {
    name,
    number,
  }
  try {
    console.log(payload);
    const res = await axios.post(url, payload, header);
    return res.data;

  } catch (e) {
    console.error(e);
  }
};

export const getExample = async () => {
  const header = await createToken();

  try {
    const res = await axios.get(url, header);
    console.log(`res`, res)
    return res.data;
  } catch (e) {
    console.error(e);
  }
}