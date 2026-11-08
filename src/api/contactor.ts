import request from './request';

// 获取所有询价方式选项
export function getInquiryOptions() {
  return request.get('/inquiry-options');
}

// 提交联系人表单
export function createContactor(data: {
  fullName: string;
  workEmail: string;
  company: string;
  inquiryOptionId: number;
  challenges: string;
}) {
  return request.post('/contactors', data);
}