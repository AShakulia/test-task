<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  image: String,
  title: String,
  description: String,
  id: Number
});

const router = useRouter();

const goToDetail = () => {
  router.push({ name: 'NewsDetail', params: { id: props.id } });
};
</script>

<template>
  <div class="news__card" @click="goToDetail">
    <img :src="image" alt="News image" class="news-card__image" />
    <div class="news-card__content">
      <h4 class="news-card__title"> {{ title }} </h4>
      <p class="news-card__description"> {{ description }} </p>
    </div>
  </div>
</template>

<style scoped>
.news__card {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 340px;
  box-sizing: border-box;
  overflow: hidden;
}

.news-card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.news-card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
  color: rgb(201, 35, 239);
  padding: 10px;
  box-sizing: border-box;
}

.news-card__title,
.news-card__description {
  margin: 0;
}

.news-card__title {
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  opacity: 0;
}

.news-card__description {
  font-size: 18px;
  font-weight: 400;
  opacity: 0;
}

.news__card:hover .news-card__title {
  opacity: 1;
}

.news__card:hover .news-card__description {
  opacity: 1;
}

.news__card:hover .news-card__image {
  opacity: 0.8;
}
</style>
