
<script setup>

import {ref, computed} from 'vue'

const formVisible = ref(false);
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


// Открытие формы
const openForm = (book = null) => {

  formVisible.value = true

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
const saveBook  = () => {

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
  formVisible.value = false
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

// Удаление книги
const deleteBook = (bookId) => {
    books.value = books.value.filter(book => book.id !== bookId)
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
      <div v-for="book in books" :key="book.id" class="book-card">
        <div class="top-star">
          <span v-if="book.rating" class="active">{{book.rating}} <FontAwesomeIcon icon="star"/> </span>
          <span v-else class="rating crossed"> <FontAwesomeIcon icon="star"/> </span>
        </div>
        <div class="book-cover">
          <img :src="book.cover"/>
        </div>
        <div class="book-card__wrapper">
          <h2>{{ book.name }}</h2>
          <p>{{ book.desc }}</p>
          <p><strong>Жанр:</strong> {{ book.genre.join(', ') }}</p>
          <p v-if="book.adult">18+</p>
          <p v-else>Все возрасты</p>
          <div class="stars">
            <span class="rating" v-for="n in 5" :key="n" :class="{ active: n <= book.rating }" @click="book.rating = n">
              <FontAwesomeIcon icon="star"/>
            </span>
          </div>
        </div>
        <div class="book-card__buttons">
          <button class="book-card__edit" @click="openForm(book)">Редактировать</button>
          <button class="book-card__delete" @click="deleteBook(book.id)">Удалить</button>
        </div>
      </div>
    </div>

    <!-- Кнопка и форма -->
    <button class="button-add" @click="openForm">Добавить</button>

    <div v-if="formVisible" class="form-wrapper" @click.self="cancelForm">
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
        <button @click="saveBook">Сохранить</button>
        <button class="cancel" @click="cancelForm">Отменить</button>
      </div>
    </div>

  </div>

</template>

<style>

*,
*::after,
*::before {
  box-sizing: border-box;
}

.stats{
  display: flex;
  grid-gap: 0 10px;
  margin-bottom: 10px;
  align-items: center;
}
.reset-rating{
  padding: 10px 15px;
  border: 1px solid transparent;
  background: #ff8f00;
  border-radius: 8px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  transition: .4s all;
}
.reset-rating:hover{
  background: #ffffff;
  border-color: #ff8f00;
  color: #ff8f00;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.book-card {
  width: 240px;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
.book-cover img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}
.book-card__wrapper{
  padding: 10px;
}
.rating{
  color: gray;
}
.stars .rating{
  cursor: pointer;
}
.active{
  color: gold;
}
.top-star {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 8px 8px 8px 0;
  padding: 5px;
  font-size: 24px;
  background: #5b5a57;
}
.crossed::after {
  content: "";
  position: absolute;
  top: 47%;
  left: 0;
  width: 100%;
  height: 2px;
  background: red;
  transform: rotate(-45deg);
}
.book-card__buttons{
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  transition: .4s all;
  transform: translateX(100%);
}
.book-card:hover .book-card__buttons{
  transform: translateX(0);
}
.book-card__buttons button{
  padding: 8px 16px;
  border: 1px solid transparent;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: .4s all;
}
.book-card__edit{
  background: #4caf50;
  border-top-right-radius: 8px;
}
.book-card__delete{
  background: #f44336;
  border-bottom-left-radius: 8px;
}
.book-card__edit:hover {
  border-color: #4caf50;
  background-color: #ffffff;
  color: #4caf50;
}
.book-card__delete:hover {
  border-color: #f44336;
  background-color: #ffffff;
  color: #f44336;
}


.form-wrapper{
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
.button-add{
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
.button-add:hover{
  background: #ffffff;
  color: #009fff;
  border: 1px solid #009fff;
}

.form {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
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
