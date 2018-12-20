import request from './request.js';
import config from './config';
var dataService = {
    getListPromotions: (skip, limit, category, promotionType, sort, search, latitude, longitude, isLike, isHot, tabIndex) => {
        var url = 'promotion/getListPromotions?page=34&api=getListPromotions';
        var data = {
            skip: skip,
            limit: limit,
            category: category,
            promotionType: promotionType,
            sort: sort,
            search,
            latitude,
            longitude,
            isLike,
            isHot,
            tabIndex
        }
        return request.post(url, data);
    },
    getPromotionInfo: (id) => {
        var url = 'promotion/getPromotionInfo?page=34&api=getPromotionInfo';
        var data = {
            promotion: id
        }
        return request.post(url, data);
    },
}

export default dataService;