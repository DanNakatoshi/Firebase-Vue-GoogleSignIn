<template>
  <h1>あさめしアプリにログイン</h1>
  <p><input type="text" placeholder="メールアドレス" v-model="email" /></p>
  <p><input type="password" placeholder="パスワード" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="login" >ログイン</button></p>
</template>

<script setup>
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const errMsg = ref('');

const auth = getAuth();
function login() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log(auth.currentUser);
      router.push('/feed');
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "メールアドレスが不正です";
          break;
        case "auth/user-not-found":
          errMsg.value = "ユーザーが見つかりません";
          break;
        case "auth/wrong-password":
          errMsg.value = "パスワードが間違っています";
          break;
      }
    });
}
</script>
