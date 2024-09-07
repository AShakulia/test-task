<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:1337/api/auth/local/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const jwt = response.data.jwt;
    localStorage.setItem('jwt', jwt);
    router.push('/login');
  } catch (error) {
    errorMessage.value = error.response?.data?.error?.message || 'Ошибка при регистрации';
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="register">
    <h1 class="register__title">Регистрация</h1>
    <form @submit.prevent="registerUser" class="register__form">
      <div class="register__field">
        <label for="username" class="register__label">Имя пользователя</label>
        <input type="text" v-model="username" id="username" class="register__input" required />
      </div>
      <div class="register__field">
        <label for="email" class="register__label">Email</label>
        <input type="email" v-model="email" id="email" class="register__input" required />
      </div>
      <div class="register__field">
        <label for="password" class="register__label">Пароль</label>
        <input type="password" v-model="password" id="password" class="register__input" required />
      </div>
      <button type="submit" class="register__button">Зарегистрироваться</button>
    </form>
    <p v-if="errorMessage" class="register__error">{{ errorMessage }}</p>
    <p class="register__login">
      Уже есть аккаунт? <a @click="goToLogin" class="register__link">Войти</a>
    </p>
  </div>
</template>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}

.register__title {
  text-align: center;
  margin-bottom: 20px;
}

.register__form {
  display: flex;
  flex-direction: column;
}

.register__field {
  margin-bottom: 15px;
}

.register__label {
  display: block;
  margin-bottom: 5px;
}

.register__input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register__button {
  width: 100%;
  padding: 10px;
  background-color: rgb(201, 35, 239);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register__button:hover {
  filter: brightness(120%);
}

.register__error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.register__login {
  margin-top: 20px;
  text-align: center;
}

.register__link {
  color: rgb(201, 35, 239);
  cursor: pointer;
  text-decoration: underline;
}

.register__link:hover {
  text-decoration: none;
}
</style>
