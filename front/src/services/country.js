
import { Ax } from './index';


const url = 'countries';
 
export const getCountries = async () => {

  try {
    const res = await Ax.get(url);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export const getCountryById = async (id)=>{
  try {
    const res = await Ax.get(`${url}/findById/${id}`)
    return res.data;
  } catch (error) {
    console.log(`error`, error)
  }
}