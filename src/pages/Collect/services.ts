import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 12.	我的收藏
 */
export const getUerFavorite = () => request.get(Api.userFavorite);

export const getUnfav = (payload: { gids: string }) => request.get(Api.unfav, payload);


export default {};
