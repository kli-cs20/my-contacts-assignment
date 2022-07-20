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
  } else if (selection === 'display-email') {
    displayByEmail();
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
  let email = prompt(`Enter new contact's email address: `);
  let i = findByEmail(email);
  if (i === -1) {
    let name = prompt("Enter the contact's name: ");
    let phoneNum = prompt(`Enter ${name}'s phone number: `);
    let country = prompt(`Enter ${name}'s country: `);
  
    contacts.push(newContact(name, email, phoneNum, country));
    saveContacts();
    outputEl.innerHTML = `Contact ${name} has been successfully added.`;
  } else {
    outputEl.innerHTML = `A contact with this email has already been created.`
  }
}

function removeContact() {
  let email = prompt("Enter the email of the contact you would like to remove: ");
  let index = findByEmail(email);

  if (index === -1) {
    outputEl.innerHTML = `Error finding email address in contacts.  Please try again.`
  } else {
    contacts.splice(index, 1);
    saveContacts();
    outputEl.innerHTML = `Contact has been successfully removed.`
  }
}

function displayByName() {
  let name = prompt("Enter a name to search for: ");
  let outputStr = "";

  for (let i = 0; i < contacts.length; i++) {
    let thisContact = contacts[i];
    let thisName = thisContact.name;
    if (JSON.stringify(thisName).includes(name)) {
      outputStr += getContactHTMLStr(thisContact);
    }
  }

  outputEl.innerHTML = outputStr;
}

function displayByCountry() {
  let country = prompt("Enter a country to search for: ");
  let outputStr = "";

  for (let i = 0; i < contacts.length; i++) {
    let thisContact = contacts[i];
    let thisCountry = thisContact.country;

    if (thisCountry === country) {
      outputStr += getContactHTMLStr(thisContact);
    }
  }

  outputEl.innerHTML = outputStr;
}

function displayByEmail() {
  let outputStr = "";
  let email = prompt("Enter an email to search for: ");
  let index = findByEmail(email);

  if (index === -1) {
    outputStr = "Error finding email address in contacts.  Please try again."
  } else {
    outputStr = getContactHTMLStr(contacts[index])
  }
  outputEl.innerHTML = outputStr;
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

function findByEmail(email) {
  for (let i = 0; i < contacts.length; i++) {
    let thisEmail = contacts[i].email;
    if (thisEmail === email) {
      return i;
    }
  }
  return -1;
}