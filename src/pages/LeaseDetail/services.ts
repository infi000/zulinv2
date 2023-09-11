import request from '@/utils/request';
import Api from '@/config/api';

export const experimentConDetail = (data) => request.get(Api.leaseExperimentcondetail, data);
