<template>
  <div class="s-app-wrapper-top">
    <span>Совершено ходов: <strong>{{moves}}</strong></span>
    <span>Осталось карточек: <strong>{{ initialNumberCards !== null ? initialNumberCards : remainingCards }}</strong></span>
    <span>Прошло времени: <strong>{{formattedTime}}</strong></span>
  </div>
</template>

<script setup>
const props = defineProps({
  moves: Number,
  initialNumberCards: Number,
  remainingCards: Number,
  formattedTime: String,
});
</script>