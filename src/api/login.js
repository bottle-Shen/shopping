// api/login.js 提供获取图形验证码 Api 函数
// api目录下存放---封装api接口
// - 请求与页面逻辑分离
// -相同的请求可以直接复用请求
// -进行了统一管理
import request from '@/utils/request'
// 获取图像验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}
// 验证码登录
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
