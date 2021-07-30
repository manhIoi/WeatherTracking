import callApi from '../../utils/callApi';

// iohhnam55@gmail.com: b2b387758252d518f965b6fb3b847de5
// 8a883bacce2352599f7ae6be09ec9dd1
// 7987376934df6cd509b578c9ad6d7dff
const baseURL =
  'http://api.weatherstack.com/current?access_key=b2b387758252d518f965b6fb3b847de5&query=';

const weatherByName = async (city: string) => {
  const result = await callApi('GET', baseURL + city);
  return result;
};

const rootApi = {
  weatherByName,
};

export default rootApi;
