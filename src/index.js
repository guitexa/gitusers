import api from './api.js';

// Get app div
const app = document.querySelector('#app');

// Create main div
const mainDiv = document.createElement('div');
mainDiv.setAttribute('id', 'miolo');
app.appendChild(mainDiv);

// Create the input
const input = document.createElement('input');
input.setAttribute('id', 'input');
input.setAttribute('placeholder', 'Github user');
input.setAttribute('autofocus', '');
mainDiv.appendChild(input);

// Create the button
const button = document.createElement('button');
button.setAttribute('id', 'button');
button.textContent = 'Add profile';
mainDiv.appendChild(button);

// Create the return span element
const returnSpan = document.createElement('span');
returnSpan.setAttribute('id', 'return');
mainDiv.appendChild(returnSpan);

// Create the response div
const resDiv = document.createElement('div');
resDiv.setAttribute('id', 'resDiv');
mainDiv.appendChild(resDiv);


// Class works like a function
class App {
  constructor() {
    // Empty array to start application
    this.users = []; 

    // Get the response div
    this.resDiv = document.querySelector('#resDiv');

    // Get the input
    this.getInput = document.querySelector('#input');

    // Get the return span element
    this.getReturn = document.querySelector('#return');

    // Get the button
    this.getButton = document.querySelector('#button');
    this.botaoClick();
  }

  // Method when button is clicked
  botaoClick() {
    this.getButton.onclick = event => this.addUser(event);
  }

  // While the request is processed show an loading message
  setLoading(loading=true) {
    if (loading === true) {
      this.getReturn.innerHTML = 'Loading...';
    } else {
      this.getReturn.innerHTML = '';
    }
  }

  // When button is clicked this method insert the user on array
  async addUser(event) {
    event.preventDefault(); // Prevent reload page

    const inputEl = this.getInput.value; // Get input element value

    if (inputEl.length === 0) // Check if the input has something on click
      return this.getReturn.innerHTML = 'Type something';

    this.setLoading(); // Show loading message

    try { // Request data from API
      const response = await api.get(`/users/${inputEl}`);

      // Object destructuring
      const { name, bio, html_url, avatar_url } = response.data;

      // Truncate bio to don't show more than 90 letters
      const truncated = bio.length > 90
      ? bio.substr(-10000, 90) + '...' : bio;

      // Create object with requested data
      this.users.push({
        name,
        bio: truncated,
        avatar_url,
        html_url,
      });
      
      this.getInput.value = ''; // Clear input element
      this.render(); // Start render the page
      this.setLoading(false); // Remove loading message
    } catch (err) { // If the inputted value couldn't be found show this message
      this.getReturn.innerHTML = "This user doesn't exist";
    }
  }
  render() {
    this.resDiv.innerHTML = ''; // Clear the response div
    
    this.resDiv.style.display = 'flex'; // Show the response div

    this.users.forEach(user => { // For each user create this structure
      let container = document.createElement('div');
      container.setAttribute('id', 'container');
      resDiv.appendChild(container);
    
      let avatar = document.createElement('img');
      avatar.setAttribute('src', user.avatar_url);
      container.appendChild(avatar);
      
      let criaULista = document.createElement('ul');
      container.appendChild(criaULista);
    
      let criaLista = document.createElement('li');
      criaULista.appendChild(criaLista);
      
      let criaName = document.createElement('h1');
      criaName.innerHTML = user.name;
      criaLista.appendChild(criaName);
      
      let criaBio = document.createElement('p');
      criaBio.innerHTML = user.bio;
      criaLista.appendChild(criaBio);
      
      let criaLink = document.createElement('a');
      criaLink.setAttribute('href', user.html_url);
      criaLink.setAttribute('target', '_blank');
      criaLink.innerHTML = `visit profile`;
      criaLista.appendChild(criaLink);
    });

  }
}

new App();
