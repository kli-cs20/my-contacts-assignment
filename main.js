// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variables
let contacts = loadContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i]);
  }
  outputEl.innerHTML = outputStr;
}

function addContact() {
  let name = prompt("Enter the contact's name: ");
  let email = prompt(`Enter ${name}'s email address: `);
  let phoneNum = prompt(`Enter ${name}'s phone number: `);
  let country = prompt(`Enter ${name}'s country: `);

  contacts.push(newContact(name, email, phoneNum, country));
  saveContacts();
  outputEl.innerHTML = `Contact ${name} has been successfully added.`;
}

function removeContact() {
  console.log('Remove Contact');
}

function displayByName() {
  console.log('Display by Name');
}

function displayByCountry() {
  console.log('Display by Country');
}

// HELPER FUNCTIONS
function newContact(name, email, number, country) {
  return {
    name: name,
    email: email,
    phoneNum: number,
    country: country
  };
}

function getContactHTMLStr(contact) {
  return `
  <div>
    <h4>${contact.name}</h2>
    <u>${contact.email}</u>
    </p>${contact.phoneNum} (${contact.country})</p>
  </div>
  `;
}

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
  let contactStr = localStorage.getItem("contacts");
  return JSON.parse(contactStr) ?? [];
}
