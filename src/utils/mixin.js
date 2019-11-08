import {mapGetters,mapActions} from 'vuex';

import {themeList,addCss, removeAllCss} from 'utils/book';
import {saveLocation} from 'utils/localStorage';

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'bookAvailable',
            'currentBook',
            'defaultFontSize',
            'defaultFontFamily',
            'defaultTheme',
            'fileName',
            'fontFamilyVisible',
            'menuVisible',
            'progress',
            'settingVisible',
            'section'
        ]),
        themeList () {
            return themeList(this);
        }
    },
    methods: {
        ...mapActions([
            'setBookAvailable',
            'setCurrentBook',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setDefaultTheme',
            'setFontFamilyVisible',
            'setFileName',
            'setMenuVisible',
            'setProgress',
            'setSettingVisible',
            'setSection'
        ]),
        display (target,cb) {
            if (target) {
                 this.currentBook.rendition.display(target).then(() => {
                     this.refreshLocation();
                     if (cb) cb()
                 })
            }else {
                this.currentBook.rendition.display.then(() => {
                    this.refreshLocation();
                    if (cb) cb()
                })
            }
        },
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
        refreshLocation () {
            const currentLocation = this.currentBook.rendition.currentLocation();
            const startCfi = currentLocation.start.cfi;
            const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi);
            this.setProgress(Math.floor(progress * 100));
            this.setSection(currentLocation.start.index);
            saveLocation(this.fileName,startCfi);
        },
    }
}