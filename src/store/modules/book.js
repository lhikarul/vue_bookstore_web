const book = {
    state: {
        bookAvailable: false,
        currentBook: null,
        cover: null,
        defaultFontSize: 16,
        defaultFontFamily: 'Default',
        defaultTheme: 'Default',
        fileName: '',
        fontFamilyVisible: false,
        menuVisible: false,
        metadata: null,
        navigation: null,
        offsetY: 0,
        progress: 0,
        settingVisible: -1, // -1:不顯示, 0:字形設置, 1:主題, 2:進度條, 3:目錄
        section: 0
    },
    mutations: {
        'SET_BOOK_AVAILABLE': (state,value) => {
            state.bookAvailable = value
        },
        'SET_CURRENT_BOOK': (state,currentBook) => {
            state.currentBook = currentBook
        },
        'SET_COVER': (state,cover) => {
            state.cover = cover;
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
        'SET_METADATA': (state,metadata) => {
            state.metadata = metadata
        },
        'SET_NAVIGATION': (state,nav) => {
            state.navigation = nav;
        },
        'SET_SETTING_VISIBLE': (state,settingVisible) => {
            state.settingVisible = settingVisible
        },
        'SET_DEFAULT_FONT_SIZE': (state,defaultFontSize) => {
            state.defaultFontSize = defaultFontSize
        },
        'SET_DEFAULT_FONT_FAMILY': (state,defaultFontFamily) => {
            state.defaultFontFamily = defaultFontFamily
        },
        'SET_DEFAULT_THEME': (state,defaultTheme) => {
            state.defaultTheme = defaultTheme
        },
        'SET_OFFSETY': (state,y) => {
            state.offsetY = y;
        },
        'SET_PROGRESS': (state,progress) => {
            state.progress = progress;
        },
        'SET_SECTION': (state,section) => {
            state.section = section;
        }
    }
}

export default book;