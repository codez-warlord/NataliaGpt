const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}';
const API_KEY = 'AIzaSyAz7Cc22lLRcLSR2XSF7lMot_91WxlXfYw';

// Set up API request headers
const headers = {
'Content-Type': 'application/json',
'Authorization': `Bearer ${API_KEY}`,
};

// Define a function to send a request to the API
const sendRequest = async (endpoint, data) => {
try {
const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
method: 'POST',
headers,
body: JSON.stringify(data),
});
return await response.json();
} catch (error) {
console.error(error);
}
};

// Define a function to handle outgoing chat
const handleOutgoingChat = async () => {
// Get user input and remove extra spaces
const userText = chatInput.value.trim();

// If input is empty, return
if (!userText) return;

// Clear input field and reset its height
chatInput.value = '';
chatInput.style.height = `${initialInputHeight}px`;

// Create outgoing chat div with user's message
const html = `<div class="chat-content"> <div class="chat-details"> <img src="images/user.jpg" alt="user-img"> <p>${userText}</p> </div> </div>`;
const outgoingChatDiv = createChatElement(html, 'outgoing');

// Remove default text and append outgoing chat div
chatContainer.querySelector('.default-text')?.remove();
chatContainer.appendChild(outgoingChatDiv);
chatContainer.scrollTo(0, chatContainer.scrollHeight);

// Send request to Google Gemini API
const response = await sendRequest('generateText', {
prompt: userText,
maxLength: 2048,
});

// Create incoming chat div with response
const incomingHtml = `<div class="chat-content"> <div class="chat-details"> <img src="images/chatbot.jpg" alt="chatbot-img"> <p>${response.text}</p> </div> </div>`;
const incomingChatDiv = createChatElement(incomingHtml, 'incoming');

// Append incoming chat div
chatContainer.appendChild(incomingChatDiv);
chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

// Load data from local storage
loadDataFromLocalstorage();

// Add event listener to send button
sendButton.addEventListener('click', handleOutgoingChat);