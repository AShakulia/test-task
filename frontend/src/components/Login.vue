<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: email.value,
      password: password.value,
    });
    const jwt = response.data.jwt;
    localStorage.setItem('jwt', jwt);
    router.push('/');
  } catch (error) {
    errorMessage.value = error.response?.data?.error?.message || 'Ошибка при входе';
    console.error('Error during login:', error);
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <div class="login">
    <h1 class="login__title">Вход</h1>
    <form @submit.prevent="loginUser" class="login__form">
      <div class="login__field">
        <label for="email" class="login__label">Email</label>
        <input type="email" v-model="email" id="email" class="login__input" />
      </div>
      <div class="login__field">
        <label for="password" class="login__label">Пароль</label>
        <input type="password" v-model="password" id="password" class="login__input" />
      </div>
      <button type="submit" class="login__button">Войти</button>
    </form>
    <p v-if="errorMessage" class="login__error">{{ errorMessage }}</p>
    <p class="login__register">
      Нет аккаунта? <a @click="goToRegister" class="login__link">Зарегистрируйтесь</a>
    </p>
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
}

.login__title {
  text-align: center;
  margin-bottom: 20px;
}

.login__form {
  display: flex;
  flex-direction: column;
}

.login__field {
  margin-bottom: 15px;
}

.login__label {
  display: block;
  margin-bottom: 5px;
}

.login__input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login__button {
  width: 100%;
  padding: 10px;
  background-color: rgb(201, 35, 239);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login__button:hover {
  filter: brightness(120%);
}

.login__error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.login__register {
  margin-top: 20px;
  text-align: center;
}

.login__link {
  color: rgb(201, 35, 239);
  cursor: pointer;
  text-decoration: underline;
}

.login__link:hover {
  text-decoration: none;
}
</style>

