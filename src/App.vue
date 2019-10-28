<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  var fontSize = window.innerWidth / 10;

  fontSize = fontSize > 50 ? 50: fontSize;

  html.style.fontSize = fontSize + 'px';
})
</script>

<style lang="scss" scoped>
  #app {
    position: relative;
    margin: 0 auto;
    max-width: 375px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>