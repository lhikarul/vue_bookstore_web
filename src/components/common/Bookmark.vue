<template>
  <div class="bookmark" :style="style" ref="bookmark"></div>
</template>

<script>
import {px2rem} from 'utils/utils';
export default {
    name: 'bookmark',
    props: {
        width: Number,
        height: Number,
        color: String
    },
    methods: {
        // 重新設置寬高
        refresh () {
            if (this.height && this.width) {
                const borderTop    = `${px2rem(this.height - 5)}rem`;
                const borderBottom = `${px2rem(5)}rem`;
                const borderRight  = `${px2rem(this.width / 2)}rem`;
                const borderLeft   = `${px2rem(this.width / 2)}rem`;

                this.$refs.bookmark.style.borderWidth = `${borderTop} ${borderRight} ${borderBottom} ${borderLeft}`;
            }
        }
    },
    computed: {
        style () {
            if (this.color) {
                return {
                    borderColor: `${this.color} ${this.color} transparent ${this.color}`
                }
            }
            else {
                return {}
            }
        }
    },
    mounted () {
        this.refresh();
    }
}
</script>

<style lang="scss" scoped>
  @import 'assets/css/global';
  .bookmark {
    width: 0;
    height: 0;
    border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
    border-style: solid;
    border-color: white white transparent white;
  }
</style>