const actions = {
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
    setDefaultFontSize: ({commit}, defaultFontSize) => {
        return commit('SET_DEFAULT_FONT_SIZE',defaultFontSize)
    },
    setDefaultFontFamily: ({commit}, defaultFontFamily) => {
        return commit('SET_DEFAULT_FONT_FAMILY',defaultFontFamily)
    },
    setCurrentBook: ({commit},currentBook) => {
        return commit('SET_CURRENT_BOOK',currentBook)
    }
}

export default actions;