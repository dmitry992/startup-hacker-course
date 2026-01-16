<script setup>
  import {computed} from "vue";
  const props = defineProps({
    book: {
      type: Object
    }
  })
  defineEmits(['edit', 'delete', 'rate'])

  const rated = computed(() => {
    return props.book.rating >= 1
  })
</script>


<template>
  <div class="book-card">
  <div class="top-star">
    <span v-if="rated" class="active">{{book.rating}} <FontAwesomeIcon icon="star"/> </span>
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
      <span class="rating" v-for="n in 5" :key="n" :class="{ active: n <= book.rating }" @click="$emit('rate', n)">
        <FontAwesomeIcon icon="star"/>
      </span>
    </div>
  </div>
  <div class="book-card__buttons">
    <button class="book-card__edit" @click="$emit('edit', book)">Редактировать</button>
    <button class="book-card__delete" @click="$emit('delete', book.id)">Удалить</button>
  </div>
  </div>
</template>


<style scoped>

.book-card {
  width: 240px;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
.book-card__wrapper {
  padding: 10px;
}

.rating {
  color: gray;
}

.stars .rating {
  cursor: pointer;
}

.active {
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
.book-cover img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.book-card__buttons {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  transition: .4s all;
  transform: translateX(100%);
}

.book-card__buttons button {
  padding: 8px 16px;
  border: 1px solid transparent;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: .4s all;
}

.book-card:hover .book-card__buttons {
  transform: translateX(0);
}
.book-card__edit {
  background: #4caf50;
  border-top-right-radius: 8px;
}

.book-card__delete {
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

</style>