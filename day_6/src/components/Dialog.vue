<script setup>
    defineProps(['title', 'isVisible'])
    defineEmits(['cancel'])
</script>

  <template>
    <Transition name="s-fade">

      <div v-if="isVisible" class="s-modal-window" @click.self="$emit('cancel')">

        <div class="s-block">
          <div class="s-block-header">
            <slot name="title">{{ title }}</slot>
          </div>
          <slot></slot>
        </div>
      </div>
    </Transition>

  </template>

<style scoped>

.s-modal-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.s-block {
  background: #fff;
  border-radius: 8px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
}


.s-block-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}


.s-fade-enter-active,
.s-fade-leave-active{
  transition: .4s opacity ease;
}

.s-fade-enter-from,
.s-fade-leave-to{
  opacity: 0;
}


.s-fade-enter-active .s-dialog,
.s-fade-leave-active .s-dialog{
  transition: .4s all ease;
}

.s-fade-enter-from .s-dialog,
.s-fade-leave-to .s-dialog{
  transform: translateY(20%);
}
</style>