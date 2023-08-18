const openModal = document.querySelector(".newbook");
const modal = document.querySelector("#modal");
const closemodal = document.querySelector(".closemodal");
const addButton = document.querySelector(".add-book");
const clear = document.querySelector(".clear");

// Attach event listeners
openModal.addEventListener("click", () => {
  addButton.addEventListener("click", submitForm);
  clear.addEventListener("click", clearField);
  modal.showModal();
});

closemodal.addEventListener("click", closeModal);

// Clear localStorage
document.querySelector("#storbutton").addEventListener("click", () => {
  localStorage.clear();
});

function submitForm() {
  const bookData = extractFormData();
  if (!validateFormData(bookData)) return;
  if (isDuplicateBook(bookData)) return;
  storeBookData(bookData);
  clearField();
  addBook(bookData);
}

function closeModal() {
  addButton.removeEventListener("click", submitForm);
  clear.removeEventListener("click", clearField);
  modal.close();
}

function extractFormData() {
  return {
    title: document.getElementById("b-title").value,
    author: document.getElementById("b-author").value,
    language: document.getElementById("b-language").value,
    totalPages: parseInt(document.getElementById("b-nbr_of_pages").value),
    pagesRead: parseInt(document.getElementById("b-nbr_of_pages_read").value),
    readStatus: document.getElementById("b-read_status").value === "true",
  };
}

function validateFormData(bookData) {
  const { title, author, language, totalPages, pagesRead } = bookData;
  if (!title || !author || !language || isNaN(totalPages) || isNaN(pagesRead)) {
    alert("Please fill in all the required fields.");
    return false;
  }
  return true;
}

function isDuplicateBook(bookData) {
  const storedDataArray = getStoredDataArray();
  const bookIdentifier = `${bookData.title}-${bookData.author}`;
  const existingIdentifiers = new Set(
    storedDataArray.map(book => `${book["book-title"]}-${book["book-author"]}`)
  );
  if (existingIdentifiers.has(bookIdentifier)) {
    alert("Duplicate book data. This book is already added.");
    return true;
  }
  return false;
}

function getStoredDataArray() {
  return JSON.parse(localStorage.getItem("myData")) || [];
}

function storeBookData(bookData) {
  const storedDataArray = getStoredDataArray();
  storedDataArray.push(bookData);
  localStorage.setItem("myData", JSON.stringify(storedDataArray));
}

function clearField() {
  document.getElementById("b-title").value = "";
  document.getElementById("b-author").value = "";
  document.getElementById("b-language").value = "";
  document.getElementById("b-nbr_of_pages").value = "";
  document.getElementById("b-nbr_of_pages_read").value = "";
}

function addBook(bookData) {
  const bookElement = document.querySelector(".book_row");
  const newBookDetails = createBookDetailsElement(bookData);
  bookElement.appendChild(newBookDetails);
}

function createBookDetailsElement(bookData) {
  const newBookDetails = document.createElement("div");
  newBookDetails.classList.add("book-details");

  const { title, author, language, totalPages, pagesRead, readStatus } = bookData;

  const deleteButton = document.createElement("span");
  deleteButton.className = "remove-book";
  newBookDetails.appendChild(deleteButton);

  const elementsToCreate = [
    { tag: "h3", text: title },
    { tag: "span", className: "book-author", text: `Author: ${author}` },
    { tag: "span", className: "book-lang", text: `Language: ${language}` },
    { tag: "span", className: "tot-page", text: `Total Pages: ${totalPages}` },
    { tag: "span", className: "page-read", text: `Pages Read: ${pagesRead}` },
    { tag: "span", className: "read-toggle", text: `Mark as read: ${readStatus}` },
    { tag: "label", className: "toggle-container", children: [
      { tag: "input", className: "toggle-input", type: "checkbox" },
      { tag: "span", className: "toggle-slider" }
    ] }
  ];

  elementsToCreate.forEach(elementConfig => {
    const element = document.createElement(elementConfig.tag);
    if (elementConfig.className) {
      element.className = elementConfig.className;
    }
    if (elementConfig.text) {
      element.textContent = elementConfig.text;
    }
    if (elementConfig.children) {
      elementConfig.children.forEach(childConfig => {
        const child = document.createElement(childConfig.tag);
        if (childConfig.className) {
          child.className = childConfig.className;
        }
        element.appendChild(child);
      });
    }
    newBookDetails.appendChild(element);
  });

  return newBookDetails;
}
