// Import required libraries
const axios = require('axios');

// Set API endpoint and API key
const API_ENDPOINT = '(link unavailable)';
const API_KEY = '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'; // Replace with your API key

// Set up API request headers
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`,
};

// Define a function to send a request to the API
const sendRequest = async (prompt) => {
  try {
    const response = await axios.post(API_ENDPOINT, {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 2048,
      temperature: 0.2,
      n: 1,
      stop: null,
    }, { headers });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Define variables for DOM elements
const chatInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-btn');
const chatContainer = document.querySelector('.chat-container');
const themeButton = document.querySelector('#theme-btn');
const deleteButton = document.querySelector('#delete-btn');

// Define variables for chat state
let userText = null;
let chatHistory = [];

// Define a function to load data from local storage
const loadDataFromLocalstorage = () => {
  const themeColor = localStorage.getItem('themeColor');
  document.body.classList.toggle('light-mode', themeColor === 'light_mode');
  themeButton.innerText = document.body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
  const defaultText = `<div class="default-text"> <h1>ChatGPT Clone</h1> <p>Start a conversation and explore the power of AI.<br> Your chat history will be displayed here.</p> </div>`;
  chatContainer.innerHTML = localStorage.getItem('all-chats') || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

// Define a function to create a chat element
const createChatElement = (content, className) => {
  const chatDiv = document.createElement('div');
  chatDiv.classList.add('chat', className);
  chatDiv.innerHTML = content;
  return chatDiv;
};

// Define a function to get the chat response
const getChatResponse = async (incomingChatDiv) => {
  try {
    const response = await sendRequest(userText);
    const pElement = document.createElement('p');
    pElement.textContent = response;
    incomingChatDiv.querySelector('.typing-animation').remove();
    incomingChatDiv.querySelector('.chat-details').appendChild(pElement);
    chatHistory.push({ user: userText, response });
    localStorage.setItem('all-chats', chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  } catch (error) {
    console.error(error);
    const pElement = document.createElement('p');
    pElement.classList.add('error');
    pElement.textContent = 'Oops! Something went wrong while retrieving the response. Please try again.';
    incomingChatDiv.querySelector('.typing-animation').remove();
    incomingChatDiv.querySelector('.chat-details').appendChild(pElement);
  }
};

// Define a function to handle outgoing chat
const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;
  chatInput.value = '';
  chatInput.style.height = '40px';
  const html = `<div class="chat-content"> <div class="chat-details"> <img src="images/user.jpg" alt="user-img"> <p>${userText}</p> </div> </div>`;
  const outgoingChatDiv = createChatElement(html, 'outgoing');
  chatContainer.querySelector('.default-text')?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(() => {
    const html = `<div class="chat-content"> <div class="chat-details"> <img src="images/chatbot.jpg" alt="chatbot-img"> <div class="typing-animation"> <div class="typing-dot" style="--delay: 0.2s"></div> <div class="typing-dot" style="--delay: 0.3s"></div> <div class="typing-dot" style="--delay: 0.4s"></div> </div> </div> <span class="material-symbols-rounded">content_copy</span> </div>`;
    const incomingChatDiv = createChatElement(html, 'incoming');
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
  }, 500);
};

// Add event listeners
deleteButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all the chats?')) {
```