<template>
  <div class="ebook-bookmark" ref="bookmark">
      <div class="ebook-bookmark-text-wrapper">
          <div class="ebook-bookmark-down-wrapper" ref="iconDown">
              <span class="icon-down"></span>
          </div>
          <div class="ebook-bookmark-text">{{text}}</div>
      </div>
      <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {} ">
          <bookmark :color="color" :width="15" :height="35"></bookmark>
      </div>
  </div>
</template>

<script>
import bookmark from 'components/common/Bookmark';

import {realPx} from 'utils/utils';
import {ebookMixin} from 'utils/mixin';

const WHITE = '#fff';
const BLUE = 'blue';

export default {
    name: 'EbookBookmart',
    mixins: [ebookMixin],
    components: {
        bookmark
    },
    data () {
        return {
            text: '',
            color: WHITE,
            isFixed: false
        }
    },
    methods: {
        addBookmark () {

        },
        removeBookmark () {
            
        },
        // 超出臨界值
        afterThreshold (v) {

            // 狀態3 超出臨界值
            this.$refs.bookmark.style.top = `${-v}px`;

            if (this.isBookmark) {
                this.text = this.$t('book.releaseDeleteMark');
                this.color = WHITE;
                this.isFixed = false;
            }else {
                this.text = this.$t('book.releaseAddMark');
                this.color = BLUE;
                this.isFixed = true;
            }

            const iconDown = this.$refs.iconDown;

            if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
                iconDown.style.transform = 'rotate(180deg)';
            }
        },
        // 未超過書籤高度
        beforeHeight () {

            if (this.isBookmark) {
                this.text = this.$t('book.pulldownDeleteMark');
                this.color = BLUE;
                this.isFixed = true;
            }else {
                this.text = this.$t('book.pulldownAddMark');
                this.color = WHITE;
                this.isFixed = false;
            }
        },
        // 未到達臨界值
        beforeThreshold (v) {
            this.$refs.bookmark.style.top  = `${-v}px`;
            this.beforeHeight();

            const iconDown = this.$refs.iconDown;
            
            if (iconDown.style.transform === 'rotate(180deg)') {
                iconDown.style.transform = 'rotate(0deg)';
            }
        },
        // 恢復初始狀態
        restore () {
            setTimeout(() => {
                this.$refs.bookmark.style.top = `${-this.height}px`;
                this.$refs.iconDown.style.transform = 'rotate(0deg)';
            },200);

            if (this.isFixed) {
                this.setBookmark(true);
                this.addBookmark();
            }else {
                this.setBookmark(false);
                this.removeBookmark();
            }
        }
    },
    computed: {
        fixedStyle () {
            return {
                position: 'fixed',
                top: 0,
                right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
            }
        },
        // 書籤高度
        height () {
            return realPx(35);
        },
        // 書籤容器臨界值
        threshold () {
            return realPx(55);
        }
    },
    watch: {
        offsetY (v) {
            
            if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) return;

            // 狀態2 未到達臨界值
            if (v >= this.height && v < this.threshold) {
                this.beforeThreshold(v);

            }else if (v >= this.threshold) {
                // 狀態3 超出臨界值
                this.afterThreshold(v);
            }else if (v > 0 && v < this.height) {
                // 狀態1 
                this.beforeHeight();
            } else if (v === 0) {
                this.restore();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/global';
 .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        // color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: px2rem(14);
        // color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(15);
    }
  }
</style>