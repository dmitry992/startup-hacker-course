<template>
  <div class="s-win-screen">
    <h2>🎉 Поздравляем!</h2>
    <div>
      <p>Твоя оценка: <strong>{{ gameRating }}</strong></p>
      <p>Потрачено времени: {{ formattedTime }}</p>
      <p>Всего ходов: {{ moves }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  moves: Number,
  gameRating: String,
  formattedTime: String,
});

</script>
<style>
  .s-win-screen{
    & h2{
      text-align: center;
    }
  }
</style>