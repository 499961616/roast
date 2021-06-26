/**
 * Imports the Roast API URL from the config.
 */
import { ROAST_CONFIG } from '../config.js';

export default {

    getCafes: function () {
        return axios.get(ROAST_CONFIG.API_URL + '/cafes');
    },

    getCafe: function (cafeID) {
        return axios.get(ROAST_CONFIG.API_URL + '/cafes/' + cafeID);
    },

    postAddNewCafe: function (name, locations, website, description, roaster) {
        return axios.post(ROAST_CONFIG.API_URL + '/cafes',
            {
                name: name,
                locations: locations,
                website: website,
                description: description,
                roaster: roaster
            }
        );
    },
    //喜欢咖啡店
    postLikeCafe:function (cafeID) {
            return axios.post(ROAST_CONFIG.API_URL + '/cafes/' + cafeID + '/like');
    },
    //取消喜欢咖啡店
    deleteLikeCafe: function (cafeID) {
        return axios.delete(ROAST_CONFIG.API_URL + '/cafes/' + cafeID + '/like');
    }
}
