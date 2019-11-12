const book = {
    bookAvailable: state => state.book.bookAvailable,
    currentBook: state => state.book.currentBook,
    cover: state => state.book.cover,
    defaultFontSize: state => state.book.defaultFontSize,
    defaultFontFamily: state => state.book.defaultFontFamily,
    defaultTheme: state => state.book.defaultTheme,
    fileName: state => state.book.fileName,
    fontFamilyVisible: state => state.book.fontFamilyVisible,
    isBookmark: state => state.book.isBookmark,
    menuVisible: state => state.book.menuVisible,
    metadata: state => state.book.metadata,
    navigation: state => state.book.navigation,
    offsetY: state => state.book.offsetY,
    progress: state => state.book.progress,
    settingVisible: state => state.book.settingVisible,
    section: state => state.book.section
}

export default book;