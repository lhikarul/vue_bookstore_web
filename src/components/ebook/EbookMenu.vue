<template>
    <div class="menu-bar">

        <transition name="slide-up">
            <div class="menu-wrapper" v-show="menuVisible" :class="{'hide-box-shadow': !menuVisible || settingVisible >=0}">

                <div class="icon-wrapper">
                    <span class="icon-menu " @click="showSetting(3)"></span>
                </div>

                <div class="icon-wrapper">
                    <span class="icon-progress " @click="showSetting(2)"></span>
                </div>

                <div class="icon-wrapper">
                    <span class="icon-bright " @click="showSetting(1)"></span>
                </div>

                <div class="icon-wrapper">
                    <span class="icon-A " @click="showSetting(0)"></span>
                </div>

            </div>
        </transition>

        <ebook-setting-font></ebook-setting-font>
        <ebook-setting-font-popup></ebook-setting-font-popup>
        <ebook-setting-theme></ebook-setting-theme>
        <ebook-setting-progress></ebook-setting-progress>

        <!-- <transition name="slide-up">
            <div class="setting-wrapper" v-show="ifSettingShow">

                <div class="setting-font-size" v-if="showTag === 0">
                    <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
                    <div class="select">
                        <div class="select-wrapper" v-for="(item,index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
                            <div class="line"></div>
                            <div class="point-wrapper">
                                <div class="point" v-show="defaultFontSize === item.fontSize">
                                    <div class="small-point"></div>
                                </div>
                            </div>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
                </div>

                <div class="setting-theme" v-else-if="showTag === 1">
                    <div class="setting-theme-item" 
                        v-for="(item,index) in themeList" :key="index"
                        @click="setTheme(index)"
                    >
                        <div class="preview" 
                            :style="{background: item.style.body.background}"
                            :class="{'no-border': item.style.body.background !== '#fff'}"
                            ></div>
                        <div class="text" :class="{'selected': index === defaultTheme}">{{item.name}}</div>
                    </div>
                </div>

                <div class="setting-progress" v-else-if="showTag === 2">
                    <div class="progress-wrapper">
                        <input class="progress" type="range" max="100" min="0" step="1"
                            @change="onProgressChange($event.target.value)"
                            @input="onProgressInput($event.target.value)"
                            :value="progress"
                            :disabled="!bookAvailable"
                            ref="progress"
                        >
                    </div>
                    <div class="text-wrapper">
                        <span>{{bookAvailable ? progress + '%' : '加載中...'}}</span>
                    </div>
                </div>
            </div>
        </transition> -->
<!-- 
        <content-view   :ifShowContent="ifShowContent"
                        v-show="ifShowContent"
                        :navigation="navigation"
                        :bookAvailable="bookAvailable"
                        @jumpTo="jumpTo"
        ></content-view> -->

        <!-- <transition name="fade">
            <div class="content-mask"
                v-show="ifShowContent"
                @click="hideContent"
            ></div>
        </transition> -->
    </div>
</template>

<script>
import {ebookMixin} from 'utils/mixin';

import EbookSettingFont from 'components/ebook/EbookSettingFont';
import EbookSettingFontPopup from 'components/ebook/EbookSettingFontPopup';
import EbookSettingTheme from 'components/ebook/EbookSettingTheme';
import EbookSettingProgress from 'components/ebook/EbookSettingProgress';

import ContentView from 'components/Content';

export default {
    name: 'EbookMenu',
    mixins: [ebookMixin],
    components: {
        EbookSettingFont,
        EbookSettingFontPopup,
        EbookSettingTheme,
        EbookSettingProgress
        
        // ContentView
    },
    data () {
        return {

        }
    },
    methods: {
        showSetting (key) {
            this.setSettingVisible(key);
        },
    },
}
</script>

<style lang="scss" scoped>
    @import 'assets/css/global';

    .menu-bar {

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
            font-size: px2rem(20);

            &.hide-box-shadow {
                box-shadow: none;
            }

            .icon-wrapper {
                flex: 1;
                @include center;

                .icon-progress {
                    font-size: px2rem(24);
                }

                .icon-bright {
                    font-size: px2rem(22);
                }
            }
        }

        .setting-progress {
            position: relative;
            width: 100%;
            height: 100%;
            .progress-wrapper {
                width: 100%;
                height: 100%;
                @include center;
                padding: 0 px2rem(30);
                box-sizing: border-box;
                .progress {
                    width: 100%;
                    -webkit-appearance: none;
                    height: px2rem(2);
                    background: linear-gradient(#999,#999) no-repeat, #ddd;
                    background-size: 0 100%;
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
                bottom: 0;
                width: 100%;
                color: #333;
                font-size: px2rem(12);
                text-align: center;
            }
        }

        .content-mask {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 101;
            width: 100%;
            height: 100%;
            background: rgba(51,51,51,.8);
        }
    }
</style>