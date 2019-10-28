<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>

<script>
import {ebookMixin} from 'utils/mixin';
import {mapActions} from 'vuex';
import Epub from 'epubjs';

export default {
    name: 'EbookReader',
    mixins: [ebookMixin],
    methods: {
        ...mapActions([
            'setMenuVisible'
        ]),
        hideTitleAndMenu () {
            // this.$store.dispatch('setMenuVisible', false);
            this.setMenuVisible(false);
            this.setSettingVisible(-1);
        },
        initEpub () {
            const url  = 'http://127.0.0.1:9001/epub/' + this.fileName + ".epub";

            this.book = new Epub(url);

            this.rendition = this.book.renderTo('read',{
                width: 375,
                height: innerHeight,
                method: 'default'
            })
            this.rendition.display();

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
        nextPage () {
            if (this.rendition) {
                this.rendition.next()
                this.hideTitleAndMenu()
            }
        },
        prevPage () {
            if (this.rendition) {
                this.rendition.prev()
                this.hideTitleAndMenu()
            }
        },
        toggleTitleAndMenu () {
            if (this.menuVisible) {
                this.setSettingVisible(-1);
            }
            // this.$store.dispatch('setMenuVisible', !this.menuVisible);
            this.setMenuVisible(!this.menuVisible);
        }
    },
    mounted () {
        const fileName = this.$route.params.fileName.split('|').join('/');
        // this.$store.dispatch('setFileName', fileName).then(() => {
        //     this.initEpub()
        // })
        this.setFileName(fileName).then(() => {
            this.initEpub()
        })
    }
}
</script>

<style lang="scss" scoped>
    @import 'assets/css/global';
</style>