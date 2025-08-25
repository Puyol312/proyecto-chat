import { Router } from '@vaadin/router';
import { state } from '../../state';
class Home extends HTMLElement { 
  shadow = this.attachShadow({ mode: 'open' });

  constructor() { 
    super();
  }

  connectedCallback() { 
    this.render();

    // Buscar el form dentro del shadow root
    const form = this.shadow.querySelector(".form");
    form?.addEventListener("submit", (e) => { 
      e.preventDefault();
      const target = e.target as any;
      console.log(target.nombre.value);
      state.setNombre(target.nombre.value);
      Router.go("/chat");
    });
  }

  render() { 
    this.shadow.innerHTML = ` <!-- Render dentro del shadow DOM -->
      <form class="form">
        <div>
          <label>Tu nombre</label>
        </div>
        <input type="text" name="nombre">
        <button>Comenzar</button>
      </form>
    `;
  }
}

customElements.define("x-home-page", Home);