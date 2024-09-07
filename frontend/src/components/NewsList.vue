<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NewsCard from './NewsCard.vue';

const items = ref([]);

const fetchNews = async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/posts?populate=*');
    items.value = response.data.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

onMounted(fetchNews);
</script>

<template>
  <div class="news__grid">
    <NewsCard
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.attributes.title"
      :description="item.attributes.news"
      :image="'http://localhost:1337' + item.attributes.image.data.attributes.url"
    />
  </div>
</template>

<style scoped>
.news__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
</style>