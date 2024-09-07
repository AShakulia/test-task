<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const newsItem = ref(null);

const fetchNewsDetail = async () => {
  try {
    const response = await axios.get(`http://localhost:1337/api/posts/${route.params.id}?populate=*`);
    newsItem.value = response.data.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

onMounted(fetchNewsDetail);

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div v-if="newsItem" class="news__detail">
    <button class="news-detail__back-btn" @click="goBack">Назад</button>
    <h1 class="news-detail__title">{{ newsItem.attributes.title }}</h1>
    <p class="news-detail__content">{{ newsItem.attributes.news }}</p>
    <img :src="'http://localhost:1337' + newsItem.attributes.image.data.attributes.url" alt="News image" class="news-detail__image" />
  </div>
</template>

<style scoped>
.news__detail {
  padding: 20px;
}

.news-detail__image {
  max-width: 100%;
}

.news-detail__back-btn {
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgb(201, 35, 239);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.news-detail__back-btn:hover {
  filter: brightness(120%);
}

.news-detail__title {
  font-size: 2em;
  margin-bottom: 15px;
}

.news-detail__content {
  font-size: 1.2em;
  margin-bottom: 20px;
}
</style>
