<template>
    <div class="ebook-reader">
        <div id="read"></div>
        <div class="ebook-reader-mask" @click="onMaskClick" @touchmove="move" @touchend="moveEnd"></div>
    </div>
</template>

<script>
import {addCss,flatten} from 'utils/book';
import {ebookMixin} from 'utils/mixin';
import {getFontFamily,saveFontFamily,getFontSize,saveFontSize,getTheme,saveTheme,getLocation} from 'utils/localStorage';
import {mapActions} from 'vuex';
import Epub from 'epubjs';

export default {
    name: 'EbookReader',
    mixins: [ebookMixin],
    methods: {
        ...mapActions([
            'setMenuVisible'
        ]),
        initEpub () {
            const url  = `${process.env.VUE_APP_RES_URL}/epub/` + this.fileName + ".epub";

            this.book = new Epub(url);
            this.setCurrentBook(this.book);
            this.initRendition();
            // this.initGesture();
            this.parseBook();

            this.book.ready
            .then(() => {
                return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16));
            }).then(() => {
                this.setBookAvailable(true);
                this.refreshLocation();
            })
        },
        // 字型大小設置
        initFontSize () {
            var fontSize = getFontSize(this.fileName);

            if (!fontSize) {
                saveFontSize(this.fileName,this.defaultFontSize);
            }else {
                this.rendition.themes.fontSize(fontSize);
                this.setDefaultFontSize(fontSize);
            }
        },
        // 字體樣式設置
        initFontFamily () {
            var font = getFontFamily(this.fileName);

            if (!font) {
                saveFontFamily(this.fileName,this.defaultFontFamily);
            }else {
                this.rendition.themes.font(font);
                this.setDefaultFontFamily(font);
            }
        },
        // 螢幕左右滑動 => 切換頁數
        initGesture () {
            // 偵聽移動端滑動事件
            this.rendition.on('touchstart', event => {

                this.touchStartX = event.changedTouches[0].clientX; // 紀錄滑動當下的 x 值
                this.touchStartTime = event.timeStamp; // 紀錄當下滑動的時間點
            })

            // 偵聽移動端滑動結束事件
            this.rendition.on('touchend', event => {
                const offsetX = event.changedTouches[0].clientX - this.touchStartX; // 紀錄滑動結束後，x 的偏移值
                const time = event.timeStamp - this.touchStartTime; // 記錄整個滑動的時間

                if (time < 500 && offsetX > 40) { // 向左滑動
                    this.prevPage()
                }else if (time < 500 && offsetX < -40) { // 向右滑動
                    this.nextPage()
                }else {
                    this.toggleTitleAndMenu();
                    // event.preventDefault();
                    // event.stopPropagation();
                }
            })
        },
        // 渲染電子書
        initRendition () {
            this.rendition = this.book.renderTo('read',{
                width: 375,
                height: innerHeight,
                method: 'default'
            })

            const location = getLocation(this.fileName);
            this.display(location, () => {
                this.initFontSize();
                this.initFontFamily();
                this.initTheme();
                this.initGlobalStyle();
            })

            this.rendition.hooks.content.register(contents => {
                Promise.all([
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
                ]).then(() => {})
            })
        },
        // 主題設置
        initTheme () {

            var defaultTheme = getTheme(this.fileName);

            if (!defaultTheme) {
                defaultTheme = this.themeList[0].name;
                saveTheme(this.fileName, defaultTheme);
            }

            this.setDefaultTheme(defaultTheme);

            // 登記每一個 theme 主題
            this.themeList.forEach(theme => {
                this.rendition.themes.register(theme.name, theme.style)
            })
            this.rendition.themes.select(defaultTheme);
        },
        // 顯示y軸滑動距離 => 書籤
        move (e) {
            var offsetY = 0;
            if (this.firstOffsetY) {
                offsetY =  e.changedTouches[0].clientY - this.firstOffsetY;
                this.setOffsetY(offsetY);
            }else {
                this.firstOffsetY = e.changedTouches[0].clientY;
            }
            e.preventDefault();
            e.stopPropagation();
        },
        moveEnd (e) {
            this.setOffsetY(0);
            this.firstOffsetY = null;
        },
        nextPage () {
            if (this.rendition) {
                this.rendition.next().then(() => {
                    this.refreshLocation()
                })
                this.hideTitleAndMenu()
            }
        },
        // 翻頁
        onMaskClick (e) {
            const offsetX = e.offsetX;
            const width   = window.innerWidth;

            if (offsetX > 0 && offsetX < width * .3) {
                this.prevPage()
            }else if (offsetX > 0 && offsetX > width * .7) {
                this.nextPage()
            }else {
                this.toggleTitleAndMenu();
            }
        },
        // 獲得書籍資訊
        parseBook () {
            this.book.loaded.cover.then(cover => {
                this.book.archive.createUrl(cover).then(url => {
                    this.setCover(url)
                })
            })

            // metadata => 書的相關資料, title,creator,publisher...
            this.book.loaded.metadata.then(metadata => {
                this.setMetadata(metadata);
            })

            // 目錄章節
            this.book.loaded.navigation.then(nav => {
               
                const navItem = flatten(nav.toc);

                function find(item, level = 0) {
                    return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
                }
                // console.log('navItem ',navItem)
                navItem.forEach(item => {
                    item.level = find(item);
                })
                
                this.setNavigation(navItem);

            })
        },
        prevPage () {
            if (this.rendition) {
                this.rendition.prev().then(() => {
                    this.refreshLocation()
                })
                this.hideTitleAndMenu()
            }
        },
        toggleTitleAndMenu () {
            if (this.menuVisible) {
                this.setSettingVisible(-1);
                this.setFontFamilyVisible(false);
            }
            // this.$store.dispatch('setMenuVisible', !this.menuVisible);
            this.setMenuVisible(!this.menuVisible);
        }
    },
    mounted () {
        const fileName = this.$route.params.fileName.split('|').join('/');
        // 獲取當前的書籍名稱
        this.setFileName(fileName).then(() => {
            this.initEpub()
        })


    }
}
</script>

<style lang="scss" scoped>
    @import 'assets/css/global';
    .ebook-reader {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .ebook-reader-mask {
            position: absolute;
            top: 0;
            left: 0;
            background: transparent;
            z-index: 150;
            width: 100%;
            height: 100%;
        }
    }
</style>