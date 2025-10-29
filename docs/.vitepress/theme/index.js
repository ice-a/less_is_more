import DefaultTheme from 'vitepress/theme'
import Hitokoto from '../components/Hitokoto.vue'
import Navigation from '../components/Navigation.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Hitokoto', Hitokoto)
        app.component('Navigation', Navigation)
    }
}