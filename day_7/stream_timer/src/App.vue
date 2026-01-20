<template>
    <div class="s-app-wrapper">
        <div v-if="activeTimer" class="s-timerbox">
            <TimerHeader title="Будем в эфире через"/>
            <div  class="s-timerbox-display">
                <TimerSegment :label="daysLabel" :number="time.days" />
                <TimerSegment :label="hoursLabel" :number="time.hours" />
                <TimerSegment :label="minutesLabel" :number="time.minutes" />
                <TimerSegment :label="secondsLabel" :number="time.seconds" />
            </div>
        </div>
        <div v-else class="s-timerbox">
          <TimerHeader title="В эфире"/>
        </div>
    </div>
</template>

<script setup>
import TimerHeader from "@/components/TimerHeader.vue";
import TimerSegment from "@/components/TimerSegment.vue";
import {computed, ref, onMounted, onUnmounted} from 'vue'

const activeTimer = ref(true)
const time = ref({
  days: '0',
  hours: '0',
  minutes: '0',
  seconds: '0',
});

let timerId = null;

const now = () => new Date();
const getTarget = (mouth, days, hours, minutes, seconds) => {
  const today = now();
  const year = today.getFullYear();

  return new Date(year, mouth, days, hours, minutes, seconds, 0);

};

// Назначение даты эфира
const targetDate = getTarget(0, 28, 12, 0,  0);

onMounted(() => {
  update();
  timerId = setInterval(update, 1000);
});

function pad(val){
  return String(val).padStart(2, '0');
}

function update() {

  const nowDate = now();
  let diff = targetDate - nowDate;

  if (diff <= 0) {
    stopTimer();
    activeTimer.value = false;
    return;
  }

  let seconds = Math.floor(diff / 1000) % 60;
  let minutes = Math.floor(diff / (1000 * 60)) % 60;
  let hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));

  time.value = {
    seconds: pad(seconds),
    minutes: pad(minutes),
    hours: pad(hours),
    days: String(days)
  };

}

function pluralize(number, forms) {
  const n = Math.abs(number)

  if (n % 10 === 1 && n % 100 !== 11) return forms[0]
  if (
      n % 10 >= 2 &&
      n % 10 <= 4 &&
      (n % 100 < 10 || n % 100 >= 20)
  ) return forms[1]

  return forms[2]
}

const daysLabel = computed(() =>
    pluralize(time.value.days, ['день', 'дня', 'дней'])
)

const hoursLabel = computed(() =>
    pluralize(time.value.hours, ['час', 'часа', 'часов'])
)

const minutesLabel = computed(() =>
    pluralize(time.value.minutes, ['минуту', 'минуты', 'минут'])
)

const secondsLabel = computed(() =>
    pluralize(time.value.seconds, ['секунду', 'секунды', 'секунд'])
)

const stopTimer = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
};

onUnmounted(() => {
  stopTimer();
});



</script>
<style scoped lang="scss">
.s-app-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.s-timerbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 20px;
    border: 1px solid rgb(58, 58, 58);
    border-radius: 6px;
    box-shadow: 3px 3px 3px black;
    min-width: 300px;


    &-display {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
}
</style>
