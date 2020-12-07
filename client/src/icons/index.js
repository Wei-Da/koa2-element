import Vue from 'vue'
// 引入svg组件
import SvgIcon from '@/components/SvgIcon'

// 全局注册svg-icon
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
console.log(requireAll(req))
