import { Ax } from './index'

const url = "favorites";
export const getFavoriteByUserId = async (userId,token)=>{
    const headers= {
        authorization: `Bearer ${token}`
    }
    try {
        const favorites = await Ax.get(`${url}/favoriteByUserId/${userId}`,{
            headers
        });
        return favorites.data
    } catch (error) {
        console.log(`error getting favorite info`, error)
    }
}
export const getFavoriteByCityAndUserId =  async({cityId, userId},token)=>{
    const headers= {
        authorization: `Bearer ${token}`
    }
    try {
        const favorite = await Ax.get(`${url}/favoriteByCityAndUserId/${cityId}/${userId}`,{
            headers
        });
        return favorite.data
    } catch (error) {
        console.log(`error getting favorite info`, error)
    }
}

export const addFavoriteCity = async (model,token)=>{
    const headers= {
        authorization: `Bearer ${token}`
    }
    try {
        const favorite = await Ax.post(`${url}`,model,{
            headers
        })
        return favorite.data;
    } catch (error) {
        console.log(`error`, error)
    }
}

export const deleteFavoriteCity = async ({cityId, userId},token)=>{
    try {
        const headers= {
            authorization: `Bearer ${token}`
        }
        console.log(`headers from delete`, headers)
        const favorite = await Ax.delete(`${url}/favoriteDeleteById/${cityId}/${userId}`,{
            headers
        })
        return favorite
    } catch (error) {
        console.log(`error`, error)
    }
}