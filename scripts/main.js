
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
// End test books

library = new Library();


function toggleModal() {
    const modal = document.querySelector(".modal-container");
    modal.classList.toggle("open");
}


function Library() {
    this.books = [testBook1, testBook2];
    this.addBook = (title, author, pages, hasBeenRead) => {
        const newBook = new Book(title, author, pages, hasBeenRead);
        this.books.push(newBook);
        console.log(this.books);

        this.addBookHtml(newBook, this.books.length - 1);
    };
    this.deleteBook = (bookIndex) => {
        this.books.splice(bookIndex, 1);
        console.log(this.books);
    };
}
Library.prototype.addBookHtml = (newBook, libraryLength) => {
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

    if (newBook.hasBeenRead) {
        const readButton = document.createElement('button');
        readButton.textContent = 'Finished';
        readButton.classList = 'read';
        buttonWrapper.appendChild(readButton);
    } else {
        const notReadButton = document.createElement('button');
        notReadButton.classList = 'not-read';
        notReadButton.textContent = "Not read yet";
        buttonWrapper.appendChild(notReadButton);
    }

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


function Book(title, author, pages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}
Book.prototype.toggleRead = () => {
    this.hasBeenRead = !this.hasBeenRead;  // do you need this keyword?
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


