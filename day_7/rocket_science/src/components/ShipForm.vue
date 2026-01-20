<template>
      <SInput v-model="name" class="s-space-input" ref="inputName" type="text" placeholder="Название"/>
      <SButton @click="handleStart" :disabled="!name.trim()">Запустить</SButton>
</template>
<script setup>
  import {onMounted, useTemplateRef, ref} from 'vue'
  import {SInput, SButton} from 'startup-ui'
  const emit = defineEmits(['startShip'])

  const inputName = useTemplateRef('inputName')
  const name = ref('')

  const handleStart = () => {
    if (name.value.trim()) {
      emit('startShip', name.value)
      name.value = ''
    }
  }

  onMounted(() => {
    const el = inputName.value.$el.querySelector('input')
    el.focus()
  })

</script>
<style>
  .s-space-input{
    margin-bottom: 10px;
  }
</style>