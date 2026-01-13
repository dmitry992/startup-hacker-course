<template>
  <div class="app">
    <div class="book-list">
      <div v-for="book in books" :key="book.id" class="book-card">
        <div class="book-cover">
          <img :src="book.cover"/>
        </div>
        <div class="book-card__wrapper">
          <h2>{{ book.name }}</h2>
          <p>{{ book.desc }}</p>
          <p><strong>Жанр:</strong> {{ book.genre }}</p>
          <p v-if="book.adult">18+</p>
          <p v-else>Все возрасты</p>
          <div class="rating">
          <span v-for="n in book.rating" :key="n">
            <FontAwesomeIcon icon="star"/>
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue'

const books = ref([
  {
    id: 1,
    name: "Преступление и наказание",
    desc: "Психологический роман о нравственном выборе, вине и искуплении на фоне жизни Петербурга.",
    genre: "Классика, психология",
    cover: "https://cdn1.ozone.ru/s3/multimedia-l/6136076025.jpg",
    adult: true,
    rating: 5
  },
  {
    id: 2,
    name: "Властелин колец: Братство Кольца",
    desc: "Эпическое путешествие хоббита Фродо и его друзей, чтобы уничтожить Кольцо Всевластия.",
    genre: "Фэнтези",
    cover: "https://avatars.mds.yandex.net/get-mpic/14464463/2a000001978d8afab9308884e5733ccc2a95/orig",
    adult: false,
    rating: 5
  },
  {
    id: 3,
    name: "Алхимик",
    desc: "Философская притча о поиске своего предназначения и следовании мечте.",
    genre: "Философия, роман",
    cover: "https://imo10.labirint.ru/books/822745/cover.jpg/484-0",
    adult: false,
    rating: 4
  },
  {
    id: 4,
    name: "Бойцовский клуб",
    desc: "Провокационный роман о кризисе личности, обществе потребления и внутреннем бунте.",
    genre: "Драма",
    cover: "https://avatars.mds.yandex.net/get-mpic/15427292/2a0000019a4e99d50b0c7cddb1cbbb72662d/orig",
    adult: true,
    rating: 4
  },
  {
    id: 5,
    name: "Шантарам",
    desc: "Приключенческий роман о жизни беглого преступника в Индии, поиске свободы и смысла.",
    genre: "Приключения, драма",
    cover: "https://avatars.mds.yandex.net/get-mpic/4080439/2a00000195fcbbf8c4854ac43a37516ac055/orig",
    adult: true,
    rating: 3
  },
])

</script>


<style>

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.book-card {
  width: 240px;
  border: 1px solid #ccc;
  border-radius: 8px;
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

</style>
