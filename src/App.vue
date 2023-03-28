<template>
  <nav>
    <router-link to="/">ホーム</router-link> |
    <router-link to="/feed">フィード</router-link> |
    <router-link to="/register">登録</router-link> |
    <router-link to="/sign-in">サインイン</router-link> |
    <button @click="handleSignOut" v-if="isLoggedIn">サインアウト</button>
  </nav>
  <p v-if="displayName">ようこそ、{{ displayName }}さん</p>
  <!-- <router-view signInWithGoogle="signInWithGoogle" /> -->

  <router-view v-slot="{ Component }">
    <component  :is="Component" :signInWithGoogle="signInWithGoogle" />
  </router-view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);
const displayName = ref(null);

let auth;
onMounted(() => {
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
  signOut(auth)
    .then(() => {
      console.log('サインアウトしました');
      router.push('/sign-in');
    })
    .catch((error) => {
      console.log(error);
    });
}

function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      displayName.value = result.user.displayName;
      router.push('/feed');
    })
    .catch((error) => {});
}
</script>
