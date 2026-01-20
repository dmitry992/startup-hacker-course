<template>
  <div class="s-space-selector">
    <Ship
        v-for="ship in ships"
        :key="ship.id"
        :ship @click="$emit('openForm', ship)"
        :activeShip="false"
        customClass="s-space-ship-menu"
    />
  </div>
</template>
<script setup>
  import Ship from '@/components/Ship.vue'
  const props = defineProps({
    ships:Array,
  })
  defineEmits(['openForm'])

</script>
<style>
.s-space-selector{
  height: 100%;
  width: 170px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  background: #050817;
  padding: 10px 10px;
}
</style>