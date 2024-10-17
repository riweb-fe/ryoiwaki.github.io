<template>
  <div class="wrap">
    <TheHeader />
    <nav>
      <ul class="nav_list">
        <li class="nav_item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav_item">
          <router-link to="/about">About</router-link>
        </li>
        <li @click="goBlog" class="nav_item">Blog</li>
      </ul>
    </nav>
    <main class="main">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBlog = () => {
  router.push("/blog");
};
</script>

<style>
@import "assets/css/destyle.css";

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 400px;
  margin: 0 auto;
  font-family: sans-serif;
}

.main {
  flex: 1;
  width: 100%;
}

.nav_list {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.nav_item {
  padding-right: 10px;
  border-right: 1px solid #000;
}

.nav_item:last-child {
  padding-right: 0;
  border-right: none;
}
</style>
