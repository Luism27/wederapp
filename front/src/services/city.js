
import { Ax } from './index';
const url = 'cities';


export const getCities = async (word) => {
  try {
    const res = await Ax.get(`${url}/searching/${word} `);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export const getCitiesByCityId = async (city_id) => {
  try {
    
    const res = await Ax.get(`${url}/${city_id}`);
    console.log(`res`, res)
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
export const getCitiesByCityName = async (name) => {
  try {
    const res = await Ax.get(`${url}/cityName/${name}`);
    console.log(`res`, res)
    return res.data;
  } catch (e) {
    console.error(e);
  }
}