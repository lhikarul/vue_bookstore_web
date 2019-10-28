import {mapGetters,mapActions} from 'vuex';

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'currentBook',
            'fileName',
            'fontFamilyVisible',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily'
        ])
    },
    methods: {
        ...mapActions([
            'setCurrentBook',
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible'
        ])
    }
}