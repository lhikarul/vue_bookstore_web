<template>
    <transition name="slide-up">
        <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">

            <div class="setting-progress">

                <div class="read-time-wrapper">
                    <span class="read-time-text">111</span>
                    <span class="icon-forward"></span>
                </div>

                <div class="progress-wrapper">

                    <div class="progress-icon-wrapper" @click="prevSection()">
                        <span class="icon-back"></span>
                    </div>

                    <input class="progress" type="range" max="100" min="0" step="1"
                        @change="onProgressChange($event.target.value)"
                        @input="onProgressInput($event.target.value)"
                        :value="progress"
                        :disabled="!bookAvailable"
                        ref="progress"
                    >

                    <div class="progress-icon-wrapper" @click="nextSection()">
                        <span class="icon-forward"></span>
                    </div>

                </div>

                <div class="text-wrapper">
                    <span>{{bookAvailable ? progress + '%' : '加載中...'}}</span>
                </div>

            </div>

        </div>
    </transition>
</template>

<script>
import {ebookMixin} from 'utils/mixin';

export default {
    name: 'EbookSettingProgress',
    mixins: [ebookMixin],
    methods: {
        displaySection () {
            const sectionInfo = this.currentBook.section(this.section);
            if (sectionInfo && sectionInfo.href) {
                this.currentBook.rendition.display(sectionInfo.href);
            }
        },
        displayProgress () {
            const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100);
            this.currentBook.rendition.display(cfi);
        },
        nextSection () {
            if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
                this.setSection(this.section + 1).then(() => {
                    this.displaySection();
                })
            }
        },
        onProgressChange(progress) {
            this.setProgress(progress).then(() => {
                this.displayProgress();
                this.updatePorgressBg();
            })
        },
        onProgressInput (progress) {
            this.setProgress(progress).then(() => {
                this.updatePorgressBg();
            })
        },
        prevSection () {
            if (this.section > 0 && this.bookAvailable) {
                this.setSection(this.section - 1).then(() => {
                    this.displaySection();
                })
            }
        },
        updatePorgressBg () {
            this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
        }
    },
    updated () {
        this.updatePorgressBg();
    }
}
</script>

<style lang="scss" scoped>
    @import 'assets/css/global';

    .setting-wrapper {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: px2rem(48);
        left: 0;
        z-index: 101;
        width: 100%;
        height: px2rem(90);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);

        .setting-progress {
            position: relative;
            width: 100%;
            height: 100%;

            .read-time-wrapper {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: px2rem(40);
                font-size: px2rem(12);
                @include center;

            }

            .progress-wrapper {
                width: 100%;
                height: 100%;
                @include center;
                padding: 0 px2rem(15);
                box-sizing: border-box;

                .progress-icon-wrapper {
                    font-size: px2rem(20);
                }

                .progress {
                    margin: 0 px2rem(10);
                    width: 100%;
                    -webkit-appearance: none;
                    height: px2rem(2);
                    &:focus {
                        outline: none;
                    }
                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: px2rem(20);
                        width: px2rem(20);
                        border-radius: 50%;
                        background: white;
                        box-shadow: 0 4px 4px 0 rgba(0,0,0,.15);
                        border: px2rem(1) solid #ddd;
                    }
                }
            }

            .text-wrapper {
                position: absolute;
                left: 0;
                bottom: px2rem(10);
                width: 100%;
                color: #333;
                font-size: px2rem(12);
                text-align: center;
            }

        }

    }
</style>