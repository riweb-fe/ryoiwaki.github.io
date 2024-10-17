<template>
  <div class="error">
    <code class="error_code">404</code>
  </div>
  <div class="error_message">
    <p class="error_message_en">Page Not Found</p>
    <p class="error_message_ja">お探しのページは見つかりませんでした。</p>
  </div>
</template>

<style scoped>
.error {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.error_code {
  font-size: 64px;
  font-weight: bold;
  color: #888;
}

.error_message_en {
  text-align: center;
  margin-top: 12px;
}

.error_message_ja {
  font-size: 20px;
  text-align: center;
  margin-top: 8px;
}
</style>
