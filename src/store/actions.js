const actions = {
    setBookAvailable: ({commit}, value) => {
        return commit('SET_BOOK_AVAILABLE', value)
    },
    setFileName: ({commit},fileName) => {
        return commit('SET_FILENAME', fileName)
    },
    setFontFamilyVisible: ({commit},fontFamilyVisible) => {
        return commit('SET_FONT_FAMILY_VISIBLE',fontFamilyVisible)
    },
    setMenuVisible: ({commit}, menuVisible) => {
        return commit('SET_MENU_VISIBLE', menuVisible);
    },
    setSettingVisible: ({commit}, settingVisible) => {
        return commit('SET_SETTING_VISIBLE', settingVisible);
    },
    setSection: ({commit},section) => {
        return commit('SET_SECTION', section);
    },
    setDefaultFontSize: ({commit}, defaultFontSize) => {
        return commit('SET_DEFAULT_FONT_SIZE',defaultFontSize)
    },
    setDefaultFontFamily: ({commit}, defaultFontFamily) => {
        return commit('SET_DEFAULT_FONT_FAMILY',defaultFontFamily)
    },
    setDefaultTheme: ({commit},defaultTheme) => {
        return commit('SET_DEFAULT_THEME',defaultTheme)
    },
    setCurrentBook: ({commit},currentBook) => {
        return commit('SET_CURRENT_BOOK',currentBook)
    },
    setProgress: ({commit}, progress) => {
        return commit('SET_PROGRESS', progress)
    }
}

export default actions;