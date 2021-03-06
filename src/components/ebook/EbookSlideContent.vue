<template>
  <div>
      <div class="ebook-slide-contents">
          <div class="slide-contents-search-wrapper">
              <div class="slide-contents-search-input-wrapper">
                  <div class="slide-contents-search-icon">
                      <span class="icon-search"></span>
                  </div>
                  <input type="text" class="slide-contents-search-input" 
                        :placeholder="$t('book.searchHint')"
                        v-model="searchText"
                        @keyup.enter.exact="search()"
                        @click="showSearchPage"
                        >
              </div>
              <div class="slide-contents-search-cancel" v-if="searchVisible" @click="hideSearchPage()">{{$t('book.cancel')}}</div>
          </div>
          <div class="slide-contents-book-wrapper" v-show="!searchVisible">
              <div class="slide-contents-book-img-wrapper">
                  <img :src="cover" alt="" class="slide-contents-book-img">
              </div>
              <div class="slide-contents-book-info-wrapper" v-if="metadata">
                  <div class="slide-contents-book-title">{{metadata.title}}</div>
                  <div class="slide-contents-book-author">{{metadata.creator}}</div>
              </div>
              <div class="slide-contents-book-progress-wrapper">
                  <div class="slide-contents-book-progress">
                      <span class="progress">{{progress + '%'}}</span>
                      <span class="progress-text">{{$t('book.haveRead2')}}</span>
                  </div>
                  <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
              </div>
          </div>
          <scroll class="slide-contents-list" :top="156" :bottom="48" v-show="!searchVisible">
              <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
                  <span class="slide-contents-item-label" @click="displayContent(item.href)" :class="{'selected': section === index}" :style="contentItemStyle(item)">{{item.label}}</span>
                  <span class="slide-contents-item-page"></span>
              </div>
          </scroll>
          <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
              <div class="slide-search-item" v-for="(item,index) in searchList" :key="index" v-html="item.excerpt" @click="displayContent(item.cfi,true)"></div>
          </scroll>
      </div>
  </div>
</template>

<script>
import {ebookMixin} from 'utils/mixin';
import Scroll from 'components/common/Scroll';
import {px2rem} from 'utils/utils';

export default {
    name: 'EbookSlideContent',
    mixins: [ebookMixin],
    components: {
        Scroll
    },
    data () {
        return {
            searchVisible: false,
            searchList: null,
            searchText: ''
        }
    },
    methods: {
        // 渲染章節、渲染搜尋 keyword 內容
        displayContent(target,highlight) {
            this.display(target, () => {
                this.hideTitleAndMenu();

                if (highlight) {
                    this.currentBook.rendition.annotations.highlight(target);
                }
            })
        },
        // epub api 搜索方法
        doSearch(q) {
            return Promise.all(
                // section 的相關資訊
                this.currentBook.spine.spineItems.map(section => section.load(this.currentBook.load.bind(this.currentBook))
                .then(section.find.bind(section, q))
                .finally(section.unload.bind(section)))
            ).then(results => Promise.resolve([].concat.apply([], results)))
        },
        // 動態綁定 style 選中章節高亮
        contentItemStyle (item) {
            return {
                marginLeft: `${px2rem(item.level) * 15}rem`
            }
        },
        hideSearchPage () {
            this.searchVisible = false;
            this.searchText = '';
            this.searchList = null;
        },
        showSearchPage () {
            this.searchVisible = true;
        },
        // 電子書內容搜尋
        search () {
            if (this.searchText && this.searchText.length > 0) {
                this.doSearch(this.searchText).then(list => {
                    this.searchList = list
                    this.searchList.map(item => {
                        // highlight searched keyword
                        item.excerpt = item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
                        return item
                    })
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/global';
.ebook-slide-contents {
    width: 100%;
    .slide-contents-search-wrapper {
        margin: px2rem(20) 0 px2rem(10) 0;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        display: flex;
        width: 100%;
        height: px2rem(36);
        .slide-contents-search-input-wrapper {
            flex: 1;
            @include center;
            .slide-contents-search-icon {
                flex: 0 0 px2rem(28);
                font-size: px2rem(12);
                @include center;
            }
            .slide-contents-search-input {
                flex: 1;
                width: 100%;
                height: px2rem(32);
                font-size: px2rem(14);
                background: transparent;
                border: none;
                &:focus {
                    outline: none;
                }
            }
        }
        .slide-contents-search-cancel {
            flex: 0 0 px2rem(50);
            font-size: px2rem(14);
            @include right;
        }
    }
    .slide-contents-book-wrapper {
        box-sizing: border-box;
        padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
        display: flex;
        width: 100%;
        height: px2rem(90);
        .slide-contents-book-img-wrapper {
            flex: 0 0 px2rem(45);
            .slide-contents-book-img {
                width: px2rem(45);
                height: px2rem(60);
            }
        }
        .slide-contents-book-info-wrapper {
            flex: 1;
            box-sizing: border-box;
            padding: 0 px2rem(10);
            width: px2rem(120);

            .slide-contents-book-title {
                font-size: px2rem(14);
                line-height: px2rem(16);
                @include ellipsis2(2);
            }
            .slide-contents-book-author {
                margin-top: px2rem(5);
                width: px2rem(100);
                font-size: px2rem(12);
                @include ellipsis;  
            }
        }
        .slide-contents-book-progress-wrapper {
            flex: 0 0 px2rem(70);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-size: 0;
            .slide-contents-book-progress {
                .progress {
                    font-size: px2rem(14);
                }
                .progress-text {
                    font-size: px2rem(12);
                }
            }
            .slide-contents-book-time {
                font-size: px2rem(12);
                margin-top: px2rem(5);
            }
        }
    }
    .slide-contents-list {
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-contents-item {
            display: flex;
            box-sizing: border-box;
            padding: px2rem(20) 0;
            &-label {
                flex: 1;
                font-size: px2rem(14);
                line-height: px2rem(16);
                @include ellipsis;
            }
            &-page {

            }
        }
    }
    .slide-search-list {
        width: 100%;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-search-item {
            font-size: px2rem(14);
            line-height: px2rem(16);
            padding: px2rem(20) 0;
            box-sizing: border-box;
        }
    }
}
</style>