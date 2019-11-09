<template>
    <div class="ebook-reader">
        <div id="read"></div>
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
            this.initGesture();
            this.parseBook();

            this.book.ready
            .then(() => {
                return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName / 16)))
            }).then(() => {
                this.setBookAvailable(true);
                this.refreshLocation();
            })
        },
        initFontSize () {
            var fontSize = getFontSize(this.fileName);

            if (!fontSize) {
                saveFontSize(this.fileName,this.defaultFontSize);
            }else {
                this.rendition.themes.fontSize(fontSize);
                this.setDefaultFontSize(fontSize);
            }
        },
        initFontFamily () {
            var font = getFontFamily(this.fileName);

            if (!font) {
                saveFontFamily(this.fileName,this.defaultFontFamily);
            }else {
                this.rendition.themes.font(font);
                this.setDefaultFontFamily(font);
            }
        },
        initGesture () {
            // 偵聽移動端滑動事件
            this.rendition.on('touchstart', event => {

                this.touchStartX = event.changedTouches[0].clientX; // 紀錄滑動當下的 x 值
                this.touchStartTime = event.timeStamp; // 紀錄滑動的下的時間點
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
        initTheme () {

            var defaultTheme = getTheme(this.fileName);

            if (!defaultTheme) {
                defaultTheme = this.themeList[0].name;
                saveTheme(this.fileName, defaultTheme);
            }

            this.setDefaultTheme(defaultTheme);

            this.themeList.forEach(theme => {
                this.rendition.themes.register(theme.name, theme.style)
            })
            this.rendition.themes.select(defaultTheme);
        },
        nextPage () {
            if (this.rendition) {
                this.rendition.next().then(() => {
                    this.refreshLocation()
                })
                this.hideTitleAndMenu()
            }
        },
        parseBook () {
            this.book.loaded.cover.then(cover => {
                this.book.archive.createUrl(cover).then(url => {
                    this.setCover(url)
                })
            })
            this.book.loaded.metadata.then(metadata => {
                this.setMetadata(metadata);
            })
            this.book.loaded.navigation.then(nav => {

                const navItem = flatten(nav.toc);

                function find(item, level = 0) {
                    return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
                }

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

        this.setFileName(fileName).then(() => {

            this.initEpub()
        })


    }
}
</script>

<style lang="scss" scoped>
    @import 'assets/css/global';
</style>