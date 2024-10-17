<template>
  <p>Blog page</p>

  <ol class="blog_list">
    <li v-for="post in posts" :key="post.id" class="blog_item">
      {{ post.id }}
      <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
    </li>
  </ol>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = ref(route.params.id);

// https://vuejs.org/api/reactivity-core.html#watch
watch(route, () => {
  id.value = route.params.id;
});

const posts = ref([]);
const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts.value = await response.json();
};

fetchData();
</script>

<style scoped>
.blog_list {
  margin-top: 12px;
}

.blog_item {
  margin-bottom: 8px;
  border: 1px solid #ccc;
  padding: 8px;
}

.blog_item:hover {
  background-color: #eee;
}
</style>
