<template>
<div class="login">
    <van-nav-bar
  title="会员登录"
  left-arrow
  @click-left="$router.go(-1)"
/>
<div class="container">
    <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动登录</p>
    </div>
        <div class="form">
            <div class="form-item">
            <input v-model="mobile" class="inp" type="text" maxlength="11" placeholder="请输入手机号码">
            </div>
            <div class="form-item">
            <input v-model="picCode" class="inp" type="text" maxlength="5" placeholder="请输入图片验证码">
            <!-- 动态渲染图形验证码，并且点击时要重新刷新验证码 -->
            <img v-if="picUrl" :src="picUrl" @click="getPicCode">
            </div>
            <div class="form-item">
            <input v-model="msgCode" class="inp" type="text" placeholder="请输入短信验证码">
            <button @click="getCode">{{ second === totalSecond ? '获取验证码' : second + `秒后发送·`}}</button>
        </div>
        </div>
        <button @click="login" class="login-btn">登录</button>
</div>
</div>
</template>

<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'
// import { Toast } from 'vant' 1.导入引用
export default {
  name: 'loginPage',
  data () {
    return {
      picUrl: '', // 存储请求渲染的图片地址
      picKey: '', // 将来请求传递的图形验证码唯一标识
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器对 second--
      timer: null, // 定时器 id
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: ''// 短信验证码 默认246810
    }
  },
  async created () {
    // const res = await request.get('/captcha/image')
    // console.log(res)//查看是否获取后台数据成功
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      //   const { data: { base64, key } } = await request.get('/captcha/image')
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key

      //   Toast('获取图标验证码成功') 1.导入引用
      this.$toast('获取图标验证码成功')// 2.main.js 注册绑定到原型,通过this直接调用
    },
    async getCode () {
      // 请求倒计时前进行校验
      if (!this.validFn()) {
        return false
      }
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求，获取验证码
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('发送成功，请注意查收')
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
        // 发送请求，获取验证码
        this.$toast('发送成功，请注意查收')
      }
    },
    // 离开页面销毁定时器
    destroyed () {
      clearInterval(this.timer)
    },
    // 校验 手机号 和 图形验证码 是否合法
    // 通过校验，返回true
    // 不通过校验，返回false
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return false
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return false
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$router.push('/')
      this.$toast('登录成功')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
    padding: 49px 29px;
    .title {
        margin-bottom: 20px;
        h3{
            font-size: 26px;
            font-weight: normal;//字体粗细 400-normal/700-bold
        }
        p{
            line-height: 40px;
            font-size: 14px;
            color:#b8b8b8;
        }
    }
    .form-item {
        border-bottom: 1px solid #f3f1f2;
        padding: 8px;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        .inp{
            display: block;
            border: none;
            outline: none;//outline设置元素轮廓样式，可以去掉元素获得焦点时的虚线框或高亮框
            height: 32px;
            font-size: 14px;
            flex: 1;
        }
        img {
            width: 94px;
            height: 31px;
        }
        button {
            height: 31px;
            border: none;
            font-size: 13px;
            color: #cea26a;
            background-color: transparent;
            padding-right: 9px;
        }
    }
    .login-btn {
        width: 100%;
        height: 42px;
        margin-top: 39px;
        background: linear-gradient(90deg,#ecb53c,#ff9211);
        //linear-gradient创建线性渐变背景
        //90deg渐变的角度---左到右的方向
        //#ecb53c: 渐变的第一个颜色，表示起始颜色。
        //#ff9211: 渐变的第二个颜色，表示结束颜色。
        color: #fff;
        border-radius: 39px;
        border: none;
        box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
        //box-shadow为元素添加阴影效果
        //(水平偏移量,垂直偏移量,模糊半径,扩展半径,颜色 (rgba(0, 0, 0, .1)))
        //rgba 表示红、绿、蓝和透明度
        letter-spacing: 2px;//设置文本中字符之间的间距
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
    }
}
</style>
