const openModal = document.querySelector(".newbook");
const modal = document.querySelector("#modal");
const closemodal = document.querySelector(".closemodal");
const gridbook = document.querySelector(".gridbook");
const addButton = document.querySelector(".add-book");
const reset = document.querySelector("#storbutton");
const book = document.querySelector(".book_row");
const clear = document.querySelector(".clear");

openModal.addEventListener("click", () => {
  // Add the event listener to the "Add" button when the dialog opens
  addButton.addEventListener("click", submitForm);
  clear.addEventListener("click", clearfield);
  modal.showModal();
});

closemodal.addEventListener("click", () => {
  addButton.removeEventListener("click", submitForm);
  clear.removeEventListener("click", clearfield);
  modal.close();
});

reset.addEventListener("click", () => {
  localStorage.clear();
});

// Add an event listener to the "Add" button
function submitForm() {
  // Retrieve input values from the form fields
  const title = document.getElementById("b-title").value;
  const author = document.getElementById("b-author").value;
  const language = document.getElementById("b-language").value;
  const totalPages = parseInt(document.getElementById("b-nbr_of_pages").value);
  const pagesRead = parseInt(
    document.getElementById("b-nbr_of_pages_read").value
  );
  const readStatus = document.getElementById("b-read_status").value;

  // Check if any of the input fields are blank or null
  if (!title || !author || !language || isNaN(totalPages) || isNaN(pagesRead)) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Create a unique identifier for each book (using title and author)
  const bookIdentifier = `${title}-${author}`;
  // Retrieve the existing data from local storage
  const storedDataJSON = localStorage.getItem("myData");
  let storedDataArray = [];

  if (storedDataJSON) {
    storedDataArray = JSON.parse(storedDataJSON);
  }

  // Create a Set from the stored data's unique identifiers
  const existingIdentifiers = new Set(
    storedDataArray.map(
      (existingBook) =>
        `${existingBook["book-title"]}-${existingBook["book-author"]}`
    )
  );

  // Check if the entered book's identifier is already in the Set
  if (existingIdentifiers.has(bookIdentifier)) {
    alert("Duplicate book data. This book is already added.");
    return; // Exit the function if it's a duplicate
  }

  // Create an object to store the form data
  const bookData = {
    "book-title": title,
    "book-author": author,
    "book-language": language,
    "pages-count": totalPages,
    "pages-read": pagesRead,
    "book-status": readStatus === "true",
  };

  // Retrieve the existing data from local storage

  if (storedDataJSON) {
    storedDataArray = JSON.parse(storedDataJSON);
  }

  // Add the new book data to the existing array
  storedDataArray.push(bookData);

  // Store the updated data back into local storage
  const updatedDataArrayJSON = JSON.stringify(storedDataArray);
  localStorage.setItem("myData", updatedDataArrayJSON);

  document.getElementById("b-title").value = "";
  document.getElementById("b-author").value = "";
  document.getElementById("b-language").value = "";
  document.getElementById("b-nbr_of_pages").value = "";
  document.getElementById("b-nbr_of_pages_read").value = "";

  // creating element

  // create_element(bookData)

  add_book(bookIdentifier);
}

function add_book(bookIdentifier) {
  // Retrieve the stored data from local storage using the identifier
  const storedDataJSON = localStorage.getItem("myData");
  const storedDataArray = JSON.parse(storedDataJSON);
  console.log(storedDataJSON);
  console.log(storedDataArray[1]);
  // Find the book data using the identifier
  const bookData = storedDataArray.find((book) => {
    const identifier = `${book["book-title"]}-${book["book-author"]}`;
    return identifier === bookIdentifier;
  });

  if (!bookData) {
    console.error("Book data not found.");
    return;
  }

  // Create elements for each book and append them to the 'book' element
  const bookElement = document.querySelector(".book_row");
  const newBookDetails = document.createElement("div");
  newBookDetails.classList.add("book-details"); // You can adjust the class name as needed

  // Extract data from the retrieved bookData
  const title = bookData["book-title"];
  const author = bookData["book-author"];
  const language = bookData["book-language"];
  const totalPages = bookData["pages-count"];
  const pagesRead = bookData["pages-read"];
  const readStatus = bookData["book-status"];

  // Create and append individual elements
  const h3Element = document.createElement("h3");
  h3Element.textContent = title;
  newBookDetails.appendChild(h3Element);

  const authorElement = document.createElement("span");
  authorElement.className = "book-author";
  authorElement.textContent = `Author: ${author}`;
  newBookDetails.appendChild(authorElement);

  const languageElement = document.createElement("span");
  languageElement.className = "book-lang";
  languageElement.textContent = `Language: ${language}`;
  newBookDetails.appendChild(languageElement);

  const totalPagesElement = document.createElement("span");
  totalPagesElement.className = "tot-page";
  totalPagesElement.textContent = `Total Pages: ${totalPages}`;
  newBookDetails.appendChild(totalPagesElement);

  const pagesReadElement = document.createElement("span");
  pagesReadElement.className = "page-read";
  pagesReadElement.textContent = `Pages Read: ${pagesRead}`;
  newBookDetails.appendChild(pagesReadElement);

  const readStatusElement = document.createElement("span");
  readStatusElement.className = "read-toggle";
  readStatusElement.textContent = `Read Status: ${readStatus}`;
  newBookDetails.appendChild(readStatusElement);

  const labelContainer = document.createElement("label");
  labelContainer.className = "toggle-container";
  newBookDetails.appendChild(labelContainer);

  const toggleInput = document.createElement("input");
  toggleInput.type = "checkbox";
  toggleInput.className = "toggle-input";
  labelContainer.appendChild(toggleInput);

  const toggleSlider = document.createElement("span");
  toggleSlider.className = "toggle-slider";
  labelContainer.appendChild(toggleSlider);

  // Append the new book element to the 'book' container
  bookElement.appendChild(newBookDetails);
}

function clearfield() {
  const test = (document.getElementById("b-title").value = "");
  console.log(test);
  document.getElementById("b-author").value = "";
  document.getElementById("b-language").value = "";
  document.getElementById("b-nbr_of_pages").value = "";
  document.getElementById("b-nbr_of_pages_read").value = "";
}
