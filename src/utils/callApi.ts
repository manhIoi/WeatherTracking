import axios, {Method} from 'axios';

const callApi = (method: Method, endpoint: string, data?: any) => {
  return axios({
    method: method,
    url: endpoint,
    data: data,
  });
};

export default callApi;
