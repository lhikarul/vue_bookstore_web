const book = {
    currentBook: state => state.book.currentBook,
    fileName: state => state.book.fileName,
    menuVisible: state => state.book.menuVisible,
    settingVisible: state => state.book.settingVisible,
    defaultFontSize: state => state.book.defaultFontSize
}

export default book;