<template>
  <BaseButton color="blue" @on-click="emit('add-click')">追加</BaseButton>
</template>

<script setup>
import BaseButton from "/src/components/BaseButton.vue";

const emit = defineEmits(["add-click"]);
</script>
