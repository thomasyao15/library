
document.getElementById("add-book").addEventListener("click", toggleModal);
document.getElementById("close-modal").addEventListener("click", toggleModal);


function toggleModal() {
    console.log("Toggle modal");
    const modal = document.querySelector(".modal-container");
    modal.classList.toggle("open");
}


function Library() {
    this.books = [];
    this.addBook = (title, author, pages, hasBeenRead) => {
        const newBook = new Book(title, author, pages, hasBeenRead);
        this.books.push(newBook);
    };
    this.deleteBook = (bookIndex) => {
        this.books.splice(bookIndex, 1);
    };
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

library = new Library();

// TODO: add addBookHTML function that creates new book div with unique IDs
// TODO: route modal inputs to addBook function
// TODO: add deleteBook function - filters through following book divs and decrements IDs to match array index
