<script setup>
  import {computed} from "vue";
  import {SButton} from "startup-ui";

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
  <div class="s-book-card">
    <div class="s-book-star">
      <span v-if="rated" class="active">{{book.rating}} <FontAwesomeIcon icon="star"/> </span>
      <span v-else class="s-rating crossed"> <FontAwesomeIcon icon="star"/> </span>
    </div>
    <div class="s-book-cover">
      <img :src="book.cover"/>
    </div>
    <div class="s-book-wrapper">
      <h2>{{ book.name }}</h2>
      <p>{{ book.desc }}</p>
      <p><strong>Жанр:</strong> {{ book.genre.join(', ') }}</p>
      <p v-if="book.adult">18+</p>
      <p v-else>Все возрасты</p>
      <div class="s-stars">
        <span class="s-rating" v-for="n in 5" :key="n" :class="{ active: n <= book.rating }" @click="$emit('rate', n)">
          <FontAwesomeIcon icon="star"/>
        </span>
      </div>
    </div>
    <div class="s-book-buttons">
      <SButton class="s-book-button s-book-button-edit" @click="$emit('edit', book)" color="green">Редактировать</SButton>
      <SButton class="s-book-button s-book-button-delete" @click="$emit('delete', book.id)" color="red">Удалить</SButton>
    </div>
  </div>
</template>


<style scoped>

.s-book-card {
  width: 240px;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
.s-book-wrapper {
  padding: 10px;
}

.s-rating {
  color: gray;
}

.s-stars .s-rating {
  cursor: pointer;
}

.active {
  color: gold;
}
.s-book-star {
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
.s-book-cover img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.s-book-buttons {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  transition: .4s all;
  transform: translateX(100%);
}

.s-book-button {
  border-radius: 0;
}

.s-book-card:hover .s-book-buttons {
  transform: translateX(0);
}
.s-book-button-edit {
  background: #4caf50;
  border-top-right-radius: 8px;
}

.s-book-button-delete {
  background: #f44336;
  border-bottom-left-radius: 8px;
}

</style>