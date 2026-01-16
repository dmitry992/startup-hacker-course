
<script setup>

import {ref, computed} from 'vue'
import BookCard from "./components/BookCard.vue";
import BookForm from "./components/BookForm.vue";
import Dialog from "./components/Dialog.vue";

const isVisible = ref(false);
const editId = ref(null)
const form = ref({
  name: '',
  desc: '',
  cover: '',
  genre: [],
  adult: false
})

const books = ref([
  {
    id: 1,
    name: "Преступление и наказание",
    desc: "Психологический роман о нравственном выборе, вине и искуплении на фоне жизни Петербурга.",
    genre: ['Классика', 'Психология'],
    cover: "https://cdn1.ozone.ru/s3/multimedia-l/6136076025.jpg",
    adult: true,
    rating: null
  },
  {
    id: 2,
    name: "Властелин колец: Братство Кольца",
    desc: "Эпическое путешествие хоббита Фродо и его друзей, чтобы уничтожить Кольцо Всевластия.",
    genre: ['Фэнтези'],
    cover: "https://avatars.mds.yandex.net/get-mpic/14464463/2a000001978d8afab9308884e5733ccc2a95/orig",
    adult: false,
    rating: null
  },
  {
    id: 3,
    name: "Алхимик",
    desc: "Философская притча о поиске своего предназначения и следовании мечте.",
    genre: ['Философия', 'Роман'],
    cover: "https://imo10.labirint.ru/books/822745/cover.jpg/484-0",
    adult: false,
    rating: null
  },
  {
    id: 4,
    name: "Бойцовский клуб",
    desc: "Провокационный роман о кризисе личности, обществе потребления и внутреннем бунте.",
    genre: ['Драма'],
    cover: "https://avatars.mds.yandex.net/get-mpic/15427292/2a0000019a4e99d50b0c7cddb1cbbb72662d/orig",
    adult: true,
    rating: null
  },
  {
    id: 5,
    name: "Шантарам",
    desc: "Приключенческий роман о жизни беглого преступника в Индии, поиске свободы и смысла.",
    genre: ['Приключения', 'Драма'],
    cover: "https://avatars.mds.yandex.net/get-mpic/4080439/2a00000195fcbbf8c4854ac43a37516ac055/orig",
    adult: true,
    rating: null
  },
])

// Удаление книги
const deleteBook = (bookId) => {
  books.value = books.value.filter(book => book.id !== bookId)
}


// Открытие формы
const openForm = (book = null) => {

  isVisible.value = true

  if (book) {
    editId.value = book.id
    form.value = {
      name: book.name,
      desc: book.desc,
      cover: book.cover,
      genre: Array.isArray(book.genre) ? [...book.genre] : [],
      adult: book.adult
    }
  } else {
    editId.value = null
    resetForm()
  }

}

// Сохранение или редактирование книги
const saveBook = () => {

  if (editId.value) {
    const book = books.value.find(b => b.id === editId.value)
    Object.assign(book, form.value)
  } else {
    const lastId = books.value.length ? books.value[books.value.length - 1].id : 0
    books.value.push({
      id: lastId + 1,
      ...form.value,
      rating: 0
    })
  }

  cancelForm()

}

// Закрытие формы и очистка ее
const cancelForm = () => {
  isVisible.value = false
  editId.value = null
  resetForm()
}

// Очистка формы
const resetForm = () => {
  form.value = {
    name: '',
    desc: '',
    cover: '',
    genre: [],
    adult: false
  }
}

// Сброс рейтинга со всех книг
const resetAllRatings = () => {
  books.value.forEach(b => (b.rating = 0))
}

// Подсчёт среднего рейтинга всех книг
const averageRating = computed(() => {
  if (!books.value.length) return '0.00'
  const sum = books.value.reduce((acc, b) => acc + (b.rating || 0), 0)
  return (sum / books.value.length).toFixed(2)
})

</script>

<template>

  <div class="app">

    <!-- Статистика -->
    <div class="stats">
      <button class="reset-rating" @click="resetAllRatings">
        Сбросить рейтинги
      </button>
      <p>Всего книг: <strong>{{ books.length }}</strong></p>
      <p>Средний рейтинг: <strong>{{ averageRating }}</strong></p>
    </div>

    <!-- Список книг -->
    <div class="book-list">
      <BookCard
          v-for="book in books"
          :key="book.id"
          :book
          @delete="deleteBook"
          @edit="openForm"
          @rate="(n) => book.rating = n"
      />
    </div>

    <button class="button-add" @click="openForm">Добавить</button>

    <Transition name="fade">
      <Dialog v-if="isVisible" @cancel="cancelForm" :title="editId ? 'Редактирование книги' : 'Добавление книги'">
        <!-- Форма -->
        <BookForm
            v-model="form"
            @cancel="cancelForm"
            @save="saveBook"
        />
      </Dialog>
    </Transition>


  </div>

</template>

<style>

*,
*::after,
*::before {
  box-sizing: border-box;
}

.stats {
  display: flex;
  grid-gap: 0 10px;
  margin-bottom: 10px;
  align-items: center;
}

.reset-rating {
  padding: 10px 15px;
  border: 1px solid transparent;
  background: #ff8f00;
  border-radius: 8px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  transition: .4s all;
}

.reset-rating:hover {
  background: #ffffff;
  border-color: #ff8f00;
  color: #ff8f00;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.fade-enter-active,
.fade-leave-active{
  transition: .4s opacity ease;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

.button-add {
  margin-top: 20px;
  padding: 10px 15px;
  border: 1px solid transparent;
  background: #009fff;
  border-radius: 8px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  transition: .4s all;
  margin-right: 10px;
}

.button-add:hover {
  background: #ffffff;
  color: #009fff;
  border: 1px solid #009fff;
}

</style>
