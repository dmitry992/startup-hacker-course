<script setup>

  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true
    },
  })

  const emit = defineEmits(['update:modelValue', 'cancel', 'save'])

  const form = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

</script>


<template>
    <div class="form">
      <input type="text" v-model="form.name" placeholder="Название"/>
      <textarea v-model="form.desc" placeholder="Описание"></textarea>
      <input type="text" v-model="form.cover" placeholder="Ссылка на обложку"/>
      <select v-model="form.genre" multiple>
        <option value="Фэнтези">Фэнтези</option>
        <option value="Драма">Драма</option>
        <option value="Философия">Философия</option>
        <option value="Роман">Роман</option>
        <option value="Классика">Классика</option>
        <option value="Приключения">Приключения</option>
        <option value="Психология">Психология</option>
      </select>
      <label>
        <input type="checkbox" v-model="form.adult"/> 18+
      </label>
      <button @click="$emit('save')">Сохранить</button>
      <button class="cancel" @click="$emit('cancel')">Отменить</button>
    </div>
</template>

<style scoped>

.form {
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

.form input[type="text"],
.form textarea,
.form select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  width: 100%;
}

.form textarea {
  resize: vertical;
  min-height: 60px;
}

.form select[multiple] {
  height: auto;
  min-height: 100px;
  cursor: pointer;
}

.form label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.form button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid transparent;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: .4s all;
}

.form button:hover {
  border-color: #4caf50;
  background-color: #ffffff;
  color: #4caf50;
}

.form button.cancel {
  background-color: #f44336;
}

.form button.cancel:hover {
  border-color: #f44336;
  background-color: #ffffff;
  color: #f44336;
}

</style>