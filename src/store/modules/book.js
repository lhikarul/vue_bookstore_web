const book = {
    state: {
        fileName: '',
        menuVisible: false,
        settingVisible: -1, // -1:不顯示, 0:字形設置, 1:主題, 2:進度條, 3:目錄
        defaultFontSize: 16
    },
    mutations: {
        'SET_FILENAME': (state,fileName) => {
            state.fileName = fileName
        },
        'SET_MENUVISIBLE': (state,menuVisible) => {
            state.menuVisible = menuVisible
        },
        'SET_SETTINGVISIBLE': (state,settingVisible) => {
            state.settingVisible = settingVisible
        },
        'SET_DEFAULT_FONT_SIZE': (state,defaultFontSize) => {
            state.defaultFontSize = defaultFontSize
        }
    }
}

export default book;