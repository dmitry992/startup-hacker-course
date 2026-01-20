<template>
    <div class="s-levels">
      <h2 class="s-levels-title">Выберите уровень сложности</h2>
      <div class="s-levels-buttons">
        <SButton
            class="s-buttons-item"
            color="green"
            @click="$emit('generateCards', 12)"
            @mouseenter="$emit('changeInitialNumberCards',12)"
            @mouseleave="$emit('changeInitialNumberCards',0)"
        >
          Легкий
        </SButton>
        <SButton
            class="s-buttons-item"
            color="yellow"
            @click="$emit('generateCards', 24)"
            @mouseenter="$emit('changeInitialNumberCards',24)"
            @mouseleave="$emit('changeInitialNumberCards',0)"
        >
          Средний
        </SButton>
        <SButton
            class="s-buttons-item"
            color="red"
            @click="$emit('generateCards', 36)"
            @mouseenter="$emit('changeInitialNumberCards',36)"
            @mouseleave="$emit('changeInitialNumberCards',0)"
        >
          Сложный
        </SButton>
      </div>
    </div>
</template>
<script setup>
  import {SButton} from 'startup-ui'
  defineEmits(['generateCards', 'changeInitialNumberCards']);
</script>
<style lang="scss">
  .s-levels{
    &-title{
      margin-bottom: 10px;
    }
    &-buttons{
      display: flex;
      grid-gap: 0 10px;
      align-items: center;
    }
  }

</style>