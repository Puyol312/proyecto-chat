import { Router } from '@vaadin/router';

const router = new Router(document.querySelector('#root'));
router.setRoutes([
  { path: "/", component: "x-home-page"},
  { path: "/chat", component: "x-chat-page"},
])