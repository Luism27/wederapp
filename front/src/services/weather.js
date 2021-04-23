import { Ax } from './index'

const url = "weather";

export const getWeatherInfoById =  async(id)=>{
    try {
        const weather = await Ax.get(`${url}/searchNowById/${id}`);
        return weather.data
    } catch (error) {
        console.log(`error getting weather info`, error)
    }
}

export const getForecastByName = async (id)=>{
    try {
        const weather = await Ax.get(`${url}/forecast/${id}`)
        return weather.data;
    } catch (error) {
        console.log(`error`, error)
    }
}

export const getHistoryByName = async ({date,name})=>{
    try {
        const weather = await Ax.get(`${url}/history/${date}/${name}`)
        return weather.data
    } catch (error) {
        console.log(`error`, error)
    }
}