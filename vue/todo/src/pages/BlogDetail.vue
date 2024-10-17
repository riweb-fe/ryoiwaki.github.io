<template>
  <div>
    <h2 class="title">{{ detail.title }}</h2>
    <p class="detail">{{ detail.body }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;

const detail = ref({});
const fetchData = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + id
  );
  detail.value = await response.json();
};

fetchData();
</script>

<style scoped>
.title {
  margin: 20px 0 12px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.detail {
  line-height: 1.5;
}
</style>
