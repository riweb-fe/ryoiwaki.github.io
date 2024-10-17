import { createApp } from "vue";
import App from "./App.vue";

// https://router.vuejs.org/guide/#javascript
// Create and mount the root instance.
import router from "./router/index";

// createApp(App).use(router)を呼び出すことで、
// 最初のナビゲーションをトリガーし、現在のルートだけでなく、任意のコンポーネント内にアクセスできるようにします。
createApp(App).use(router).mount("#app");
