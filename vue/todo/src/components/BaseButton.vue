<template>
  <button class="btn" :class="props.color" @click="onClick"><slot /></button>
</template>

<script setup>
const props = defineProps({
  color: String,
});
const emit = defineEmits(["on-click"]);
const onClick = () => {
  emit("on-click");
};
</script>

<style scoped>
.btn {
  padding: 8px;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}

.blue {
  background-color: #03a9f4;
}

.green {
  background-color: #00c853;
}

.pink {
  background-color: #ff4081;
}
</style>
