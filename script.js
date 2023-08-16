const openModal = document.querySelector('.newbook')
const modal = document.querySelector('#modal')
const closemodal = document.querySelector('.closemodal')
const gridbook = document.querySelector('.gridbook')
const addButton = document.querySelector('.add-book');
const reset = document.querySelector('#storbutton')

openModal.addEventListener('click', () => {
    // Add the event listener to the "Add" button when the dialog opens
    addButton.addEventListener('click', submitForm);
    modal.showModal();
})

closemodal.addEventListener('click', () => {
    addButton.removeEventListener('click', submitForm);
    modal.close();
})

reset.addEventListener('click', () => {
    localStorage.clear();
})

// Add an event listener to the "Add" button
function submitForm() {
    // Retrieve input values from the form fields
    const title = document.getElementById('b-title').value;
    const author = document.getElementById('b-author').value;
    const language = document.getElementById('b-language').value;
    const totalPages = parseInt(document.getElementById('b-nbr_of_pages').value);
    const pagesRead = parseInt(document.getElementById('b-nbr_of_pages').value);
    const readStatus = document.getElementById('b-read_status').value;


    // Create an object to store the form data
    const bookData = {
        "book-title": title,
        "book-author": author,
        "book-language": language,
        "pages-count": totalPages,
        "pages-read": pagesRead,
        "book-status": readStatus === "true"
    };

    // Retrieve the existing data from local storage
    const storedDataJSON = localStorage.getItem('myData');
    let storedDataArray = [];

    if (storedDataJSON) {
        storedDataArray = JSON.parse(storedDataJSON);
    }

    // Add the new book data to the existing array
    storedDataArray.push(bookData);

    // Store the updated data back into local storage
    const updatedDataArrayJSON = JSON.stringify(storedDataArray);
    localStorage.setItem('myData', updatedDataArrayJSON);

    // Retrieve and display the updated data from local storage
    console.log(storedDataArray);

}

