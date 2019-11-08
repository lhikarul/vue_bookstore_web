<template>
    <div class="ebook">
        <ebook-title></ebook-title>
        <ebook-reader></ebook-reader>
        <ebook-menu></ebook-menu>

        <!-- <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"></title-bar> -->

        <!-- <div class="read-wrapper">
            <div id="read"></div>
            <div class="mask">
                <div class="left" @click="prevPage"></div>
                <div class="center" @click="toggleTitleAndMenu"></div>
                <div class="right" @click="nextPage"></div>
            </div>
        </div> -->

        <!-- <menu-bar   :ifTitleAndMenuShow="ifTitleAndMenuShow"
                    :fontSizeList="fontSizeList"
                    :defaultFontSize="defaultFontSize"
                    :themeList="themeList"
                    :defaultTheme="defalutTheme"
                    :bookAvailable="bookAvailable"
                    :navigation="navigation"
                    @jumpTo="jumTo"
                    @setFontSize="setFontSize"
                    @setTheme="setTheme"
                    @onProgressChange="onProgressChange"
                    ref="menuBar">
        </menu-bar> -->

    </div>
</template>

<script>
import Epub from 'epubjs';

import EbookReader from 'components/ebook/EbookReader';
import EbookTitle from 'components//ebook/EbookTitle';
import EbookMenu from 'components/ebook/EbookMenu';

import {ebookMixin} from '../../utils/mixin';
import {getReadTime,saveReadTime} from 'utils/localStorage';

console.log(process.env.NODE_ENV)
const DOWNLOAD_URL = process.env.NODE_ENV === 'development' ? '/2018_Book_AgileProcessesInSoftwareEngine.epub' : './2018_Book_AgileProcessesInSoftwareEngine.epub';

export default {
    name: 'Ebook',
    mixins: [ebookMixin],
    components: {
        EbookTitle,
        EbookReader,
        EbookMenu
    },
    data () {
        return {
            // ifTitleAndMenuShow: false,
            // fontSizeList: [
            //     {fontSize: 12},
            //     {fontSize: 14},
            //     {fontSize: 16},
            //     {fontSize: 18},
            //     {fontSize: 20},
            //     {fontSize: 22},
            //     {fontSize: 24},
            // ],
            // defaultFontSize: 16,
            // themeList: [
            //     {
            //         name: 'default',
            //         style: {
            //             body: {
            //                 'color': '#000','background': '#fff'
            //             }
            //         }
            //     },
            //     {
            //         name: 'eye',
            //         style: {
            //             body: {
            //                 'color': '#000','background': '#ceeaba'
            //             }
            //         }
            //     },
            //     {
            //         name: 'night',
            //         style: {
            //             body: {
            //                 'color': '#fff','background': '#000'
            //             }
            //         }
            //     },
            //     {
            //         name: 'gold',
            //         style: {
            //             body: {
            //                 'color': '#000','background': 'rgb(241,236,226)'
            //             }
            //         }
            //     }
            // ],
            // defalutTheme: 0,
            // bookAvailable: false,
            // navigation: {}
        }
    },
    methods: {
        startLoopReadTime () {
            var readTime = getReadTime(this.fileName);
            if (!readTime) {
                readTime = 0;
            }
            this.task = setInterval(() => {
                readTime++;
                if (readTime % 30 === 0) {
                    saveReadTime(this.fileName, readTime);
                }
            },1000)
        },
        // hideTitleAndMuen () {
        //     this.ifTitleAndMenuShow = false;
        //     this.$refs.menuBar.hideSetting();
        //     this.$refs.menuBar.hideContent();
        // },
        // // 根據連結跳轉至指定位置
        // jumTo (href) {
        //     this.rendition.display(href);
        //     this.hideTitleAndMuen();
        // },
        // onProgressChange (progress) {
        //     // progress 進度條的數值 0 ~ 100
        //     const percentage = progress / 100;
        //     const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
        //     this.rendition.display(location);
        // },
        // registerTheme () {
        //     this.themeList.forEach(theme => {
        //         this.themes.register(theme.name,theme.style)
        //     })
        // },
        // setTheme (index) {
        //     this.themes.select(this.themeList[index].name);
        //     this.defalutTheme = index;
        // },
        // setFontSize (fontSize) {
        //     this.defaultFontSize = fontSize;
        //     if (this.themes) {
        //         this.themes.fontSize(fontSize + 'px');
        //     }
        // },
        // showEpub () {
        //     // 生成 book
        //     this.book = new Epub(DOWNLOAD_URL);

        //     // 生成 rendition
        //     this.rendition = this.book.renderTo('read', {
        //         width: window.innerWidth,
        //         height: window.innerHeight
        //     })

        //     // 渲染電子書
        //     this.rendition.display();

        //     // get theme 物件
        //     this.themes = this.rendition.themes;

        //     // 默認 fontsize
        //     this.setFontSize(this.defaultFontSize);

        //     // this.themes.register(name,styles)
        //     // this.themes.select(name)
        //     this.registerTheme()
        //     this.setTheme(this.defalutTheme);


        //     // 獲取 location object
        //     // 通過 epubjs 的鉤子函數實現
        //     this.book.ready.then(() => {
        //         this.navigation = this.book.navigation;
        //         return this.book.locations.generate()
        //     }).then(result => {
        //         this.locations = this.book.locations;
        //         this.bookAvailable = true;
        //     })
        // },
        // toggleTitleAndMenu () {

        //     this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;

        //     if (!this.ifTitleAndMenuShow) {
        //         this.$refs.menuBar.hideSetting();
        //     }
        // },
        // prevPage () {
        //     if (this.rendition) {
        //         this.rendition.prev();
        //     }
        // },
        // nextPage () {
        //     if (this.rendition) {
        //         this.rendition.next();
        //     }
        // }
    },
    mounted () {
        // this.showEpub()
        this.startLoopReadTime();
    },
    beforeDestroy () {
        if (this.task) {
            clearInterval(this.task);
        }
    }

}
</script>

<style lang="scss" scoped>
    @import 'assets/css/global';

    // .ebook {
    //     position: relative;

    //     .read-wrapper {
    //         .mask {
    //             display: flex;
    //             position: absolute;
    //             top: 0;
    //             left: 0;
    //             z-index: 100;
    //             width: 100%;
    //             height: 100%;

    //             .left {
    //                 flex: 0 0 px2rem(100);
    //             }

    //             .center {
    //                 flex: 1;
    //             }

    //             .right {
    //                 flex: 0 0 px2rem(100);
    //             }
    //         }
    //     }
    // }
</style>