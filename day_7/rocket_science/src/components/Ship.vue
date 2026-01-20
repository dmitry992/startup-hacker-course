<template>
  <div
      class="s-space-ship"
      :class="customClass"
      :style="customStyle"
  >
    <img :src="ship.isCrashed ? ship.crashedImg : ship.img" />
    <div v-if="activeShip" class="s-space-ship-label">{{ ship.name }}</div>
  </div>

</template>
<script setup>
const props = defineProps({
  ship: Object,
  activeShip: Boolean,
  customClass: Object,
  customStyle: Object
})
</script>
<style>
  .s-space-ship{
    cursor: pointer;
  }
  .s-space-ship img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .s-space-ship-menu {
    height: 120px;
    padding: 10px 0;
    border-bottom: 1px solid #cccccc;
  }

  .s-space-active-ship {
    position: absolute;
    width: 80px;
    text-align: center;
    z-index: 10;
    border-bottom: none;
  }
  .s-space-active-ship img{
    height: auto;
  }
  .s-space-ship-label{
    color: #fff;
  }
</style>