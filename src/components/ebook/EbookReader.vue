<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

import Epub from 'epubjs';

export default {
    name: 'EbookReader',
    methods: {
        initEpub () {
            const url  = 'http://127.0.0.1:9001/epub/' + this.fileName + ".epub";

            this.book = new Epub(url);

            this.rendition = this.book.renderTo('read',{
                width: innerWidth,
                height: innerHeight,
                method: 'default'
            })
            this.rendition.display();
        }
    },
    computed: {
        ...mapGetters(['fileName'])
    },
    mounted () {
        const fileName = this.$route.params.fileName.split('|').join('/');
        this.$store.dispatch('setFileName', fileName).then(() => {
            this.initEpub()
        })
    }
}
</script>

<style lang="scss" scoped>
    @import 'assets/css/global';
</style>