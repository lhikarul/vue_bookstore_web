const book = {
    state: {
        currentBook: null,
        defaultFontSize: 16,
        defaultFontFamily: 'Default',
        fileName: '',
        fontFamilyVisible: false,
        menuVisible: false,
        settingVisible: -1, // -1:不顯示, 0:字形設置, 1:主題, 2:進度條, 3:目錄
    },
    mutations: {
        'SET_CURRENT_BOOK': (state,currentBook) => {
            state.currentBook = currentBook
        },
        'SET_FILENAME': (state,fileName) => {
            state.fileName = fileName
        },
        'SET_FONT_FAMILY_VISIBLE': (state, fontFamilyVisible) => {
            state.fontFamilyVisible = fontFamilyVisible
        },
        'SET_MENU_VISIBLE': (state,menuVisible) => {
            state.menuVisible = menuVisible
        },
        'SET_SETTING_VISIBLE': (state,settingVisible) => {
            state.settingVisible = settingVisible
        },
        'SET_DEFAULT_FONT_SIZE': (state,defaultFontSize) => {
            state.defaultFontSize = defaultFontSize
        },
        'SET_DEFAULT_FONT_FAMILY': (state,defaultFontFamily) => {
            state.defaultFontFamily = defaultFontFamily
        }
    }
}

export default book;