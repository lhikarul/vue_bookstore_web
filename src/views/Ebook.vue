<template>
    <div class="ebook">
        <div id="read"></div>
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
        }
    },
    mounted () {
        this.showEpub()
    }

}
</script>