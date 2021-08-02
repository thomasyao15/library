

function toggleModal() {
    const modal = document.querySelector(".modal-container");
    modal.classList.toggle("open");
}


function Library() {
    this.books = [testBook1, testBook2];
    this.addBook = (title, author, pages, hasBeenRead) => {
        const newBook = new Book(title, author, pages, hasBeenRead);
        this.books.push(newBook);

        addBookHtml(newBook, this.books.length - 1);
    };
    this.deleteBook = (bookIndex) => {
        this.books.splice(bookIndex, 1);
        console.log(this.books);
    };
    this.toggleIndividualBookRead = (bookIndex) => {
        this.books[bookIndex].toggleRead();
        console.table(this.books);
    }
}

function addBookHtml(newBook, libraryLength) {
    const bookDiv = document.createElement('div');
    bookDiv.className = "book";

    const bookInfo = document.createElement('div');
    bookInfo.className = "book-info";

    const title = document.createElement('h3');
    title.textContent = newBook.title;
    const author = document.createElement('h4');
    author.textContent = "by " + newBook.author;
    const pages = document.createElement('h4');
    pages.textContent = newBook.pages + " pages";   

    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);
    bookDiv.appendChild(bookInfo);


    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = "button-wrapper";

    const readButton = document.createElement('button');
    readButton.textContent = (newBook.hasBeenRead) ? 'Finished' : "Not read yet";
    readButton.classList = (newBook.hasBeenRead) ? 'read' : "not-read";
    readButton.addEventListener("click", toggleReadHtml);
    buttonWrapper.appendChild(readButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList = 'delete';
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteBookHtml);
    buttonWrapper.appendChild(deleteButton);
    
    bookDiv.appendChild(buttonWrapper);
    bookDiv.id = `book${libraryLength}`;
    const libraryGrid = document.querySelector(".library-grid");
    libraryGrid.appendChild(bookDiv);
}

function deleteBookHtml(e) {
    bookDiv = e.target.parentElement.parentElement;
    bookIndex = bookDiv.id.substring(4);
    library.deleteBook(parseInt(bookIndex));

    bookDiv.parentElement.removeChild(bookDiv);  // delete bookDiv

    // Grab every bookDiv with index > deletedBook and decrement their id to represent book index in library array
    remainingBooks = Array.from(document.querySelectorAll(".book"));
    remainingBooks = remainingBooks.filter(book => {
        currentBookIndex = parseInt(book.id.substring(4));
        return currentBookIndex > bookIndex;
    })
    remainingBooks.forEach(book => {
        currentBookIndex = parseInt(book.id.substring(4));
        book.id = `book${currentBookIndex - 1}`;
    })
    console.log(remainingBooks);

}

function toggleReadHtml(e) {
    bookDiv = e.target.parentElement.parentElement;
    bookIndex = bookDiv.id.substring(4);
    library.toggleIndividualBookRead(parseInt(bookIndex));

    e.target.className = (e.target.className == "read") ? "not-read" : "read";
    e.target.textContent = (e.target.textContent == "Finished") ? "Not read yet" : "Finished";
}


function Book(title, author, pages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}
Book.prototype.toggleRead = function() {
    this.hasBeenRead = !this.hasBeenRead; // IDK WHY arrow functions dont work for prototypes
    console.log(`Has been read: ${this.hasBeenRead}`);
};


// TODO: add deleteBook function - filters through following book divs and decrements IDs to match array index

function addBook(e) {
    e.preventDefault();
    const title = addForm.querySelector('input[id="title"]').value;
    const author = addForm.querySelector('input[id="author"]').value;
    const pages = addForm.querySelector('input[id="pages"]').value;
    const hasBeenRead = addForm.querySelector('input[id="has-read"]').checked;

    library.addBook(title, author, pages, hasBeenRead);
    toggleModal();
}







document.getElementById("add-book").addEventListener("click", toggleModal);
document.getElementById("close-modal").addEventListener("click", toggleModal);
const addForm = document.getElementById("add-book-form");
addForm.addEventListener("submit", addBook);


// Initial test books
let testBook1 = new Book("LOTR", "JRR", 234, false);
let testBook2 = new Book("ASDF", "JRR", 234, false);

const deleteButtons = document.querySelectorAll(".delete");
deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteBookHtml);
});

const readButtons = document.querySelectorAll(".not-read");
readButtons.forEach(readButton => {
    readButton.addEventListener("click", toggleReadHtml);
});
// End test books

library = new Library();
