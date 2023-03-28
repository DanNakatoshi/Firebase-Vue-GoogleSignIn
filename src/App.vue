<template>
  <nav>
    <router-link to="/">ホーム</router-link> |
    <router-link to="/feed">フィード</router-link> |
    <router-link to="/register">登録</router-link> |
    <router-link to="/sign-in">サインイン</router-link> |
    <button @click="handleSignOut" v-if="isLoggedIn">サインアウト</button>
  </nav>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(()=> {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
  
});

function handleSignOut() {
  signOut(auth).then(() => {
    console.log('サインアウトしました');
    router.push('/sign-in');
  }).catch((error) => {
    console.log(error);
  });
}
</script>

