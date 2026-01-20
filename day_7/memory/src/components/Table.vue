<template>
  <div class="s-table">
    <div class="s-table-cards" :class="`-count-${cards.length}`">
      <Card
          v-for="card in cards"
          :key="card.id"
          :card
          @changeStatus="$emit('changeStatusCard', $event)"
      />
    </div>
  </div>
</template>
<script setup>
  import Card from "@/components/Card.vue";
  const props = defineProps({
    cards: Array,
    moves : Number,
    formattedTime : String
  });

  defineEmits(['changeStatusCard']);


</script>
<style lang="scss" scoped>

.s-table{
  width: auto;
  max-width: none;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-cards{
    display: grid;
    grid-template-rows: auto;
    grid-gap: 20px;

    &.-count-12 {
      grid-template-columns: repeat(4, 4fr);
    }

    &.-count-24 {
      grid-template-columns: repeat(6, 6fr);
    }

    &.-count-36 {
      grid-template-columns: repeat(9, 9fr);
    }
  }
}

</style>