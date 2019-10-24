<template>
    <div class="ebook">

        <transition name="slide-down">

            <div class="title-wrapper" v-show="ifTitleAndMenuShow">
                <div class="left">
                    <span class="icon-back icon"></span>
                </div>
                <div class="right">
                    <div class="icon-wrapper">
                        <span class="icon-cart icon"></span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-person icon"></span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-more icon"></span>
                    </div>
                </div>
            </div>

        </transition>

        <div class="read-wrapper">
            <div id="read"></div>
            <div class="mask">
                <div class="left" @click="prevPage"></div>
                <div class="center" @click="toggleTitleAndMenu"></div>
                <div class="right" @click="nextPage"></div>
            </div>
        </div>

        <transition name="slide-up">

            <div class="menu-wrapper" v-show="ifTitleAndMenuShow">

                <div class="icon-wrapper">
                    <span class="icon-menu icon"></span>
                </div>

                <div class="icon-wrapper">
                    <span class="icon-progress icon"></span>
                </div>

                <div class="icon-wrapper">
                    <span class="icon-bright icon"></span>
                </div>

                <div class="icon-wrapper">
                    <span class="icon-a icon">A</span>
                </div>

            </div>

        </transition>

    </div>
</template>

<script>
import Epub from 'epubjs';

const DOWNLOAD_URL = '/2018_Book_AgileProcessesInSoftwareEngine.epub';

export default {
    name: 'Ebook',
    data () {
        return {
            ifTitleAndMenuShow: false
        }
    },
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
        toggleTitleAndMenu () {
            this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
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

        .title-wrapper {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 101;
            width: 100%;
            height: px2rem(48);
            background: white;
            box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,.15);

            .left {
                flex: 0 0 px2rem(60);
                @include center;
            }

            .right {
                flex: 1;
                display: flex;
                justify-content: flex-end;

                .icon-wrapper {
                    flex: 0 0 px2rem(40);
                    @include center;

                    .icon-cart {
                        font-size: px2rem(22);
                    }
                }
            }
        }

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

        .menu-wrapper {
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 101;
            width: 100%;
            height: px2rem(48);
            background: white;
            box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);

            .icon-wrapper {
                flex: 1;
                @include center;

                .icon-progress {
                    font-size: px2rem(28);
                }

                .icon-bright {
                    font-size: px2rem(24);
                }
            }
        }
    }
</style>