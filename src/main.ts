import { createApp } from "vue";
import "./style.css";
import App from "@/App.vue";
import router from "@/router";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/style.css";
import VueDOMPurifyHTML from "vue-dompurify-html";

const app = createApp(App);

app.use(router);
app.component("vue-draggable-resizable", VueDraggableResizable);
app.use(VueDOMPurifyHTML);
app.mount("#app");
