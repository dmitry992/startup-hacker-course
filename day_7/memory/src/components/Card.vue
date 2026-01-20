<template>
  <div class="s-card-slot">
    <Transition name="s-fade-card">
      <div
          v-if="!card.guessed"
          class="s-card"
          :class="{ active: card.active }"
          @click="$emit('changeStatus', card.id)"
      >
        <span v-if="card.active">{{ card.number }}</span>
      </div>
    </Transition>
  </div>
</template>
<script setup>
const props = defineProps({
  card: {
    type: Object
  }
});
defineEmits(['changeStatus']);

</script>
<style>
  .s-card-slot {
    width: 100px;
    height: 150px;
  }
  .s-card{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ff8f00;
    border-radius: 8px;
    height: 150px;
    width: 100px;
    background: #ff8f00;
    user-select: none;
  }
  .s-card.active{
    background: none;
  }
  .s-fade-card-leave-active {
    transition: opacity 0.5s ease;
  }

  .s-fade-card-leave-to {
    opacity: 0;
  }
</style>