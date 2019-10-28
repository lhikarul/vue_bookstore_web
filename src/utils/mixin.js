import {mapGetters,mapActions} from 'vuex';

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'currentBook',
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize'
        ])
    },
    methods: {
        ...mapActions([
            'setCurrentBook',
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize'
        ])
    }
}