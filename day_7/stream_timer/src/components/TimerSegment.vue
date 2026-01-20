<template>
<div class="s-timesegment">
    <div class="s-timesegment-datawrapper">
        <div class="s-timesegment-number-wrapper">
            <Transition name="s-number" mode="out-in">
              <span :key="number" class="s-number">{{number}}</span>
            </Transition>
        </div>
        <span class="s-label">{{ label }}</span>
    </div>
</div>
</template>
<script setup>
defineProps({
    label: String,
    number: String
});

</script>
<style scoped lang="scss">
.s-timesegment {

    &-datawrapper {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
    }

    &-number-wrapper {
        background-color: aliceblue;
        padding: 5px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        overflow: hidden;
    }

    .s-number {
        font-size: 32px;
    }
    .s-label {
        font-size: 16px;
    }
}
.s-number-enter-active,
.s-number-leave-active{
  transition: .4s all ease;
}

.s-number-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.s-number-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>
