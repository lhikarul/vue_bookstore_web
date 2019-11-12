<template>
    <div class="ebook" ref="ebook">
        <ebook-title></ebook-title>
        <ebook-reader></ebook-reader>
        <ebook-menu></ebook-menu>
        <ebook-bookmark></ebook-bookmark>
    </div>
</template>

<script>
import Epub from 'epubjs';

import EbookReader from 'components/ebook/EbookReader';
import EbookTitle from 'components//ebook/EbookTitle';
import EbookMenu from 'components/ebook/EbookMenu';
import EbookBookmark from 'components/ebook/EbookBookmark';

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
        EbookMenu,
        EbookBookmark
    },
    methods: {
        move (v) {
            this.$refs.ebook.style.top = v + 'px';
        },
        restore () {
            this.$refs.ebook.style.top = 0;
            this.$refs.ebook.style.transition = 'all .2s linear';
            setTimeout (() => {
                this.$refs.ebook.style.transition = '';
            },200);
        },
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
    },
    watch: {
        // 處理書籤下拉
        offsetY(v) {
            // 顯示 menu && 電子書初始化，不能下拉
            if (!this.menuVisible && this.bookAvailable) {
                    if (v > 0) {
                        this.move(v);
                    }else if (v === 0) {
                        this.restore();
                    }
            }

            // if (v > 0) {
            //     this.move(v);
            // }else if (v === 0) {
            //     this.restore();
            // }
        }
    },
    mounted () {
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

    .ebook {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>