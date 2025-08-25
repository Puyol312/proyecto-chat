const API_BASE_URL = "http://localhost:8080"
import { rtdb } from "./rtdb";
import map from "lodash/map";
const state = {
  data: {
    nombre: "",
    messages:[]
  },
  listeners: [] as any,
  init() { 
    const chatroomsRef = rtdb.ref("/chatrooms/messages");
    const currentState = this.getState();
    chatroomsRef.on("value", (snapShot) => { 
      const messagesFromServer = snapShot.val();
      //Transformo el el big Json de la snapShot a un array con tantos mensajes como haya.
      const messagesList = map(messagesFromServer.messages);
      this.setState(messagesList);
    })
  },
  getState() { 
    return this.data;
  },
  setNombre(nombre:string) { 
    const currentState = this.getState();
    currentState.nombre = nombre;
    this.setState(currentState);
  },
  pushMessage(message:string) { 
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type":"appication/json",
      },
      body: JSON.stringify({
        from: this.data.nombre,
        message: message
      })
    })
  },
  setState(newState:any) { 
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },
  subscribe(callback:(param:any) => any) { 
    this.listeners.push(callback);
  }
}

export { state };