import api from './api.js';

// Get app div
const app = document.querySelector('#app');

// Create a div
const mainDiv = document.createElement('div');
mainDiv.setAttribute('id', 'miolo');
app.appendChild(mainDiv);

// Create an input
const input = document.createElement('input');
input.setAttribute('id', 'input');
input.setAttribute('placeholder', 'Github user');
input.setAttribute('autofocus', '');
mainDiv.appendChild(input);

// Create a button
const button = document.createElement('button');
button.setAttribute('id', 'button');
button.textContent = 'Add profile';
mainDiv.appendChild(button);

// Create a return span
const returnSpan = document.createElement('span');
returnSpan.setAttribute('id', 'return');
mainDiv.appendChild(returnSpan);

// Create a response div
const resDiv = document.createElement('div');
resDiv.setAttribute('id', 'resDiv');
mainDiv.appendChild(resDiv);


// Class works like a function
class App {
  constructor() {
    this.repositories = []; 

    this.resDiv = document.querySelector('#resDiv');

    this.getInput = document.querySelector('#input');

    this.getReturn = document.querySelector('#return');

    this.getButton = document.querySelector('#button');
    this.botaoClick();
  }

  botaoClick() {
    this.getButton.onclick = event => this.addRepository(event);
  }

  setLoading(loading=true) {
    if (loading === true) {
      this.getReturn.innerHTML = 'Carregando';
    } else {
      this.getReturn.innerHTML = '';
    }
  }

  async addRepository(event) {
    event.preventDefault();

    const inputEl = this.getInput.value;

    if (inputEl.length === 0)
      return this.getReturn.innerHTML = 'Type something';

    this.setLoading();

    try {
      const response = await api.get(`/users/${inputEl}`);

      const { name, bio, html_url, avatar_url } = response.data;

      const truncated = bio.length > 90
      ? bio.substr(-10000, 90) + '...' : bio;

      this.repositories.push({
        name,
        bio: truncated,
        avatar_url,
        html_url,
      });
      
      this.getInput.value = '';
      this.render();
      this.setLoading(false);
    } catch (err) {
      this.getReturn.innerHTML = "This user doesn't exist";
    }

  }
  render() {
    this.resDiv.innerHTML = '';
    
    this.resDiv.style.display = 'flex';

    this.repositories.forEach(repo => {
      let container = document.createElement('div');
      container.setAttribute('id', 'container');
      resDiv.appendChild(container);
    
      let avatar = document.createElement('img');
      avatar.setAttribute('src', repo.avatar_url);
      container.appendChild(avatar);
      
      let criaULista = document.createElement('ul');
      container.appendChild(criaULista);
    
      let criaLista = document.createElement('li');
      criaULista.appendChild(criaLista);
      
      let criaName = document.createElement('h1');
      criaName.innerHTML = repo.name;
      criaLista.appendChild(criaName);
      
      let criaBio = document.createElement('p');
      criaBio.innerHTML = repo.bio;
      criaLista.appendChild(criaBio);
      
      let criaLink = document.createElement('a');
      criaLink.setAttribute('href', repo.html_url);
      criaLink.setAttribute('target', '_blank');
      criaLink.innerHTML = `visit profile`;
      criaLista.appendChild(criaLink);
    });

  }
}

new App();