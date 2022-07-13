import request from './request';
import { IParamObj } from '../type';

const BASE_URL = 'https://pixabay.com/api';
const defaultParam = {
    key: process.env.REACT_APP_PIXABAY!,
};

const getWallpapers = async (paramObj: IParamObj) => {
    const params = new URLSearchParams({
        ...defaultParam,
        ...paramObj,
    }).toString();
    const results = await request(`${BASE_URL}/?${params}`);
    return results;
};

export default getWallpapers;
