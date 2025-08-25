import { state } from "../../state";
type Message = {
  from: string,
  message: string,
}
class Chat extends HTMLElement { 
  shadow = this.attachShadow({ mode: 'open' });
  constructor() { 
    super();
  }
  connectedCallback() { 
    state.subscribe(() => { 
      const currentState = state.getState();
      this.messages = currentState.messages;
      this.render();
    })
    this.render();
  }
  addListener() { 
    const form = this.querySelector(".form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      state.pushMessage(target["new-message"].value);
    });
  }
  messages: Message[] = [];
  render() { 
    this.innerHTML = `
      <div>
        <h1>Chat page</h1>
        <div class="messages">
          ${this.messages.map(message => { 
            return `<div>${message.from}:${message.message}</div>`;
          }).join(" ")}
        <div>
        <form class="submit-message">
          <input type="text" name="new-message">
          <button>Enviar</button>
        </form>
      </div>
    `;
    this.addListener();
  }
}
customElements.define("x-chat-page", Chat);