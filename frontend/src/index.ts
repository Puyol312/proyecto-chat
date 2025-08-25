import "./pages/home/index";
import "./pages/chat/index";
import "./router"
import { rtdb } from "./rtdb";
import { state } from "./state";
state.init();
// const chatroomsRef = database.ref("/chatrooms/1234");

// chatroomsRef.on("value", (snapShot) => { 
//   const valorDeLaSnapShop = snapShot.val();
//   const root = document.querySelector("#root");
//   if (root) {
//     root.innerHTML = JSON.stringify(valorDeLaSnapShop);
//   } 
//   console.log(snapShot, valorDeLaSnapShop);
// })