import {mapGetters,mapActions} from 'vuex';

import {themeList} from 'utils/book';

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
        ])
    }
}