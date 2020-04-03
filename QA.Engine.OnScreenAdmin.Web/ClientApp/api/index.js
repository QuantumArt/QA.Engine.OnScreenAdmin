import axios from 'axios';
import qs from 'qs';
import * as Cookies from 'js-cookie';

const siteId = window.siteId;
const baseUrl = window.onScreenAdminBaseUrl;
const customerCode = window.customerCode;
const axiosConfig = {
  baseURL: `${baseUrl}/api`,
  headers: { 'X-QP8-Access-Token': Cookies.get(onScreenTokenCookieName), 'Customer-Code': customerCode },
};

const axiosInstance = () => axios.create(axiosConfig);

export const getMeta = contentNetName => axiosInstance().get('/meta', {
  params: {
    siteId,
    contentNetName,
  },
});

export const getAvailableWidgets = () => axiosInstance().get('/availableWidgets', {
  params: {
    siteId,
  },
});

export const moveWidget = changes =>
  axiosInstance().post('/MoveWidget', qs.stringify({ changes }));


export const getTestsData = cids => axiosInstance().get('/abtests/info', {
  params: {
    siteId,
    isStage: true,
    cids,
  },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});

export const setGlobalTestState = (testId, value) => axiosInstance().post('/abtests/switch', qs.stringify({
  testId, value,
}));
