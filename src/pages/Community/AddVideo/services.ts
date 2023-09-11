import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 上传图片
 */
export const upload = (file) => request.uploadFile(Api.uploadImg, file);

/**
 * 发帖
 */
export const sendContent = (data) => request.post(Api.send, data);