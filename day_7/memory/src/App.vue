<template>
    <div class="s-app-wrapper">
        <h1>Игра Memory</h1>

        <Statistic
            v-if="!isStarted || remainingCards > 0"
            :moves
            :initialNumberCards
            :remainingCards
            :formattedTime
        />
          <Levels
              v-if="!isStarted"
              :initialNumberCards
              @changeInitialNumberCards="changeInitialNumberCards"
              @generateCards="generateCards"
          />
          <Table v-else-if="isStarted && remainingCards !== 0"
                 :cards
                 @changeStatusCard="changeStatusCard"
                 :moves
                 :remainingCards
                 :formattedTime
          />
          <Result
              v-if="isStarted && remainingCards === 0"
              :formattedTime
              :moves
              :gameRating
          />

    </div>
</template>
<script setup>

  import {ref, watch, computed, onUnmounted} from 'vue'
  import Levels from "@/components/Levels.vue";
  import Table from "@/components/Table.vue";
  import Statistic from "@/components/Statistic.vue";
  import Result from '@/components/Result.vue'

  const isStarted = ref(false)
  const initialNumberCards = ref(0);

  const cards = ref([]);

  const generateCards = (count) => {

    const newCards = [];

    for (let i = 1; i <= count; i++) {
      newCards.push({
        id: i,
        number: Math.ceil(i / 2),
        active: false,
        guessed: false
      });
    }

    cards.value = [...newCards].sort(() => Math.random() - 0.5);

    initialNumberCards.value = null;
    isStarted.value = true

    startTimer();

  };

  const moves = ref(0)
  let timerInterval = null;
  const seconds = ref(0);

  const changeInitialNumberCards = (quantity) =>{
    initialNumberCards.value = quantity
  }

  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      seconds.value++;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  const openedCards = computed(() =>
      cards.value.filter(card => card.active)
  )
  const remainingCards = computed(() => {
    return cards.value.filter(card => !card.guessed).length;
  });

  const changeStatusCard = (id) => {

    moves.value++;

    const targetCard = cards.value.find(c => c.id === id);

    if (targetCard.active) {
      targetCard.active = !targetCard.active;
      return;
    }

    const activeCards = cards.value.filter(c => c.active);

    if (activeCards.length >= 2) {
      activeCards.forEach(card => card.active = false);
    }

    targetCard.active = !targetCard.active;

  };

  watch(openedCards, (opened) => {

    if (opened.length !== 2) return

    const [first, second] = opened

    if (first.number === second.number) {
      setTimeout(() => {
        first.guessed = true;
        second.guessed = true;

        first.active = false;
        second.active = false;
      }, 400)
    } else {
      setTimeout(() => {
        first.active = false;
        second.active = false;
      }, 600)
    }

  })

  watch(remainingCards, (newValue) => {
    if (newValue === 0) {
        stopTimer();
    }
  });

  const formattedTime = computed(() => {
    const mins = Math.floor(seconds.value / 60);
    const secs = seconds.value % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  });

  const gameRating = computed(() => {
    const count = cards.value.length;
    const pairs = count / 2;

    if (moves.value <= pairs + 10) return 'Великолепно!';
    if (moves.value <= pairs + 25) return 'Хороший результат';
    return 'Можно лучше, попробуй еще раз!';
  });

  onUnmounted(() => {
    stopTimer();
  });


</script>
<style scoped lang="scss">
.s-app-wrapper {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-bottom: 10px;
      text-align: center;
    }
    &-top{
      display: flex;
      grid-gap: 0 10px;
      margin-bottom: 10px;
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}


</style>
