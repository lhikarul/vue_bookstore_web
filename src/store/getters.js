const book = {
    currentBook: state => state.book.currentBook,
    defaultFontSize: state => state.book.defaultFontSize,
    defaultFontFamily: state => state.book.defaultFontFamily,
    fileName: state => state.book.fileName,
    fontFamilyVisible: state => state.book.fontFamilyVisible,
    menuVisible: state => state.book.menuVisible,
    settingVisible: state => state.book.settingVisible
}

export default book;