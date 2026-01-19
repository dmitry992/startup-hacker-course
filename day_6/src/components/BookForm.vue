<script setup>
  import { ref, useTemplateRef, onMounted, watch } from 'vue'
  import debounce from 'lodash/debounce'
  import { SForm, SInput, SSelect, SCheckbox, SButton } from 'startup-ui'

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['update:modelValue', 'cancel', 'save']);

  const form = ref({
    name: '',
    desc: '',
    cover: '',
    genre: [],
    adult: false,
    ...props.modelValue
  })

  watch(
      () => props.modelValue,
      (value) => {
        form.value = { ...value }
      }
  )

  const update = () => {
    emit('update:modelValue', { ...form.value })
  }

  const inputName = useTemplateRef('inputName')

  onMounted(() => {
    const el = inputName.value.$el.querySelector('input')
    el.focus()
  })

  const sendToServer = debounce((value) => {
    console.log(`Отправили "${value}" на сервер`)
  }, 500)

  watch(
      () => form.value.name,
      (newValue) => {
          sendToServer(newValue)
      }
  )

  const options = {
    'Фэнтези': 'Фэнтези',
    'Драма': 'Драма',
    'Философия': 'Философия',
    'Роман': 'Роман',
    'Классика': 'Классика',
    'Приключения': 'Приключения',
    'Психология': 'Психология',
  }

</script>


<template>
    <SForm class="s-form">
      <SInput v-model="form.name" type="text" ref="inputName" placeholder="Название" @input="update"/>
      <SInput v-model="form.desc" type="textarea" placeholder="Описание" @input="update"/>
      <SInput v-model="form.cover" type="text" placeholder="Ссылка на обложку" @input="update"/>
      <SSelect v-model="form.genre" :options="options" @change="update"  placeholder="Выберите"></SSelect>
      <SCheckbox v-model="form.adult" @change="update">18+</SCheckbox>
      <SButton @click="$emit('save', form)" color="green">Сохранить</SButton>
      <SButton @click="$emit('cancel')" color="red">Отменить</SButton>
    </SForm>
</template>

<style scoped>

.s-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

</style>