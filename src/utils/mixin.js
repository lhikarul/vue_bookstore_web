import {mapGetters,mapActions} from 'vuex';

import {themeList,addCss, removeAllCss} from 'utils/book';

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'currentBook',
            'fileName',
            'fontFamilyVisible',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'defaultTheme'
        ]),
        themeList () {
            return themeList(this);
        }
    },
    methods: {
        ...mapActions([
            'setCurrentBook',
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme'
        ]),
        initGlobalStyle () {
            removeAllCss();
            switch (this.defaultTheme) {
                case 'Default':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
                    break;
                case 'Eye':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
                    break;
                case 'Gold':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
                    break;
                case 'Night':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
                    break;
                default:
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
                    break;
            }   
        
        },
    }
}