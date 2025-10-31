import DefaultTheme from 'vitepress/theme'
import Hitokoto from '../components/Hitokoto.vue'
import Navigation from '../components/Navigation.vue'
import AdCarousel from '../components/AdCarousel.vue'
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Hitokoto', Hitokoto)
        app.component('Navigation', Navigation)
        app.component('AdCarousel', AdCarousel)
    }
}