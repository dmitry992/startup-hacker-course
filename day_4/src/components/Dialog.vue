<script setup>
    defineProps(['isVisible', 'title'])
    defineEmits(['cancel'])
</script>

<template>
  <div v-if="isVisible" class="modal-window" @click.self="$emit('cancel')">
    <div class="dialog">
      <header class="dialog-header">
        <slot name="title">{{ title }}</slot>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

.modal-window {
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
.dialog {
  background: #fff;
  border-radius: 8px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.dialog-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

</style>