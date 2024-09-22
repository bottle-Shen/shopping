// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 标准屏高度--px自动转换vw
      viewportWidth: 375
    }
  }
}
