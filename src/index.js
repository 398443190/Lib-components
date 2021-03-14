import Test from './components/Test/index'
import SvgAnimation from './components/SvgAnimation/index'
import Test2 from './components/Test2/index'
import Test3 from './components/Test3/index'
import Icon from './components/Icon/index'
import AluLoading from './components/AluLoading/index'
import AluFlyBox from './components/AluFlyBox/index'
import AluContainer from './components/AluContainer/index'
import AluEcharts from './components/AluEcharts/index'

export default function(Vue) {
    Vue.use(Test),
        Vue.use(SvgAnimation),
        Vue.use(Test2),
        Vue.use(Test3),
        Vue.use(Icon),
        Vue.use(AluLoading),
        Vue.use(AluFlyBox),
        Vue.use(AluContainer),
        Vue.use(AluEcharts)
}