const book = {
    bookAvailable: state => state.book.bookAvailable,
    currentBook: state => state.book.currentBook,
    defaultFontSize: state => state.book.defaultFontSize,
    defaultFontFamily: state => state.book.defaultFontFamily,
    defaultTheme: state => state.book.defaultTheme,
    fileName: state => state.book.fileName,
    fontFamilyVisible: state => state.book.fontFamilyVisible,
    menuVisible: state => state.book.menuVisible,
    progress: state => state.book.progress,
    settingVisible: state => state.book.settingVisible
}

export default book;