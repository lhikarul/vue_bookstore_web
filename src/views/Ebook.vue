<template>
    <div class="ebook">
        <div class="read-wrapper">
            <div id="read"></div>
            <div class="mask">
                <div class="left" @click="prevPage"></div>
                <div class="center"></div>
                <div class="right" @click="nextPage"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Epub from 'epubjs';

const DOWNLOAD_URL = '/2018_Book_AgileProcessesInSoftwareEngine.epub';

export default {
    name: 'Ebook',
    methods: {
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
        },
        prevPage () {
            if (this.rendition) {
                console.log('hello')
                this.rendition.prev();
            }
        },
        nextPage () {
            if (this.rendition) {
                console.log('next')
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