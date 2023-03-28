<template>
  <h1>あさめしアプリのアカウントを作成しよう</h1>
  <p><input type="text" placeholder="メールアドレス" v-model="email" /></p>
  <p><input type="password" placeholder="パスワード" v-model="password" /></p>
  <p><button @click="register">登録</button></p>
  <p><button @click="signInWithGoogle">Googleでサインインする</button></p>
</template>

<script setup>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  signInWithGoogle: Function,
});

const email = ref('');
const password = ref('');
const router = useRouter();

const auth = getAuth();
function register() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log(auth.currentUser);
      router.push('/feed');
    })
    .catch((error) => {});
}



</script>
