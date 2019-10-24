<template>
    <div class="ebook">

        <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"></title-bar>

        <div class="read-wrapper">
            <div id="read"></div>
            <div class="mask">
                <div class="left" @click="prevPage"></div>
                <div class="center" @click="toggleTitleAndMenu"></div>
                <div class="right" @click="nextPage"></div>
            </div>
        </div>

        <menu-bar   :ifTitleAndMenuShow="ifTitleAndMenuShow"
                    :fontSizeList="fontSizeList"
                    :defaultFontSize="defaultFontSize"
                    @setFontSize="setFontSize"
                    ref="menuBar">
        </menu-bar>

    </div>
</template>

<script>
import Epub from 'epubjs';

import TitleBar from 'components/TitleBar';
import MenuBar from 'components/MenuBar';

const DOWNLOAD_URL = '/2018_Book_AgileProcessesInSoftwareEngine.epub';

export default {
    name: 'Ebook',
    components: {
        TitleBar,MenuBar
    },
    data () {
        return {
            ifTitleAndMenuShow: false,
            fontSizeList: [
                {fontSize: 12},
                {fontSize: 14},
                {fontSize: 16},
                {fontSize: 18},
                {fontSize: 20},
                {fontSize: 22},
                {fontSize: 24},
            ],
            defaultFontSize: 16
        }
    },
    methods: {
        setFontSize (fontSize) {
            this.defaultFontSize = fontSize;
            if (this.themes) {
                console.log(fontSize)
                this.themes.fontSize(fontSize + 'px');
            }
        },
        showEpub () {
            // 生成 book
            this.book = new Epub(DOWNLOAD_URL);

            // 生成 rendition
            this.rendition = this.book.renderTo('read', {
                width: window.innerWidth,
                height: window.innerHeight
            })

            // 渲染電子書
            this.rendition.display();

            // get theme 物件
            this.themes = this.rendition.themes;

            // 默認 fontsize
            this.setFontSize(this.defaultFontSize);
        },
        toggleTitleAndMenu () {

            this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;

            if (!this.ifTitleAndMenuShow) {
                this.$refs.menuBar.hideSetting();
            }
        },
        prevPage () {
            if (this.rendition) {
                this.rendition.prev();
            }
        },
        nextPage () {
            if (this.rendition) {
                this.rendition.next();
            }
        }
    },
    mounted () {
        this.showEpub()
    }

}
</script>

<style lang="scss" scoped>
    @import 'assets/css/global';

    .ebook {
        position: relative;

        .read-wrapper {
            .mask {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 100;
                width: 100%;
                height: 100%;

                .left {
                    flex: 0 0 px2rem(100);
                }

                .center {
                    flex: 1;
                }

                .right {
                    flex: 0 0 px2rem(100);
                }
            }
        }
    }
</style>