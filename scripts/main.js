

class Library {
    constructor(defaultBooks) {
        this.books = defaultBooks;
    }

    pushNewBook(newBook) {
        this.books.push(newBook);
    }

    deleteBook(bookIndex) {
        this.books.splice(bookIndex, 1);
        console.log(this.books);
    }

    toggleIndividualBookRead(bookIndex) {
        this.books[bookIndex].toggleRead();
        console.table(this.books);
    }
}


class Book {
    constructor(title, author, pages, hasBeenRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasBeenRead = hasBeenRead;
    }

    toggleRead() {
        this.hasBeenRead = !this.hasBeenRead; // IDK WHY arrow functions dont work for prototypes
        console.log(`Has been read: ${this.hasBeenRead}`);
    }
}


class DisplayController {
    // Helper functions
    static toggleModal() {
        const modal = document.querySelector(".modal-container");
        modal.classList.toggle("open");
    }

    static addBookHtml(newBook, libraryLength) {
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
        readButton.addEventListener("click", DisplayController.toggleReadHtml);
        buttonWrapper.appendChild(readButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList = 'delete';
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", DisplayController.deleteBookHtml);
        buttonWrapper.appendChild(deleteButton);

        bookDiv.appendChild(buttonWrapper);
        bookDiv.id = `book${libraryLength}`;
        const libraryGrid = document.querySelector(".library-grid");
        libraryGrid.appendChild(bookDiv);
    }

    static deleteBookHtml(e) {
        const bookDiv = e.target.parentElement.parentElement;
        const bookIndex = bookDiv.id.substring(4);
        library.deleteBook(parseInt(bookIndex));

        bookDiv.parentElement.removeChild(bookDiv);  // delete bookDiv

        // Grab every bookDiv with index > deletedBook and decrement their id to represent book index in library array
        let remainingBooks = Array.from(document.querySelectorAll(".book"));
        remainingBooks = remainingBooks.filter(book => {
            const currentBookIndex = parseInt(book.id.substring(4));
            return currentBookIndex > bookIndex;
        })
        remainingBooks.forEach(book => {
            const currentBookIndex = parseInt(book.id.substring(4));
            book.id = `book${currentBookIndex - 1}`;
        })
    }

    static toggleReadHtml(e) {
        console.log(e);
        const bookDiv = e.target.parentElement.parentElement;
        const bookIndex = bookDiv.id.substring(4);
        library.toggleIndividualBookRead(parseInt(bookIndex));

        e.target.className = (e.target.className == "read") ? "not-read" : "read";
        e.target.textContent = (e.target.textContent == "Finished") ? "Not read yet" : "Finished";
    }
}


function handleAddBookButtonClick(e) {
    const addForm = document.getElementById("add-book-form");
    e.preventDefault();
    const title = addForm.querySelector('input[id="title"]').value;
    const author = addForm.querySelector('input[id="author"]').value;
    const pages = addForm.querySelector('input[id="pages"]').value;
    const hasBeenRead = addForm.querySelector('input[id="has-read"]').checked;

    const newBook = new Book(title, author, pages, hasBeenRead);

    library.pushNewBook(newBook);
    DisplayController.addBookHtml(newBook, library.books.length - 1);

    DisplayController.toggleModal();
}


function init() {
    // Set event listeners
    document.getElementById("add-book").addEventListener("click", DisplayController.toggleModal);
    document.getElementById("close-modal").addEventListener("click", DisplayController.toggleModal);
    const addForm = document.getElementById("add-book-form");
    addForm.addEventListener("submit", handleAddBookButtonClick);
    
    // Setup 2 starting example books
    let testBook1 = new Book("LOTR", "JRR", 234, false);
    let testBook2 = new Book("Aristotle and Dante", "Benjamin Alire Sáenz", 368, false);
    books = [testBook1, testBook2];
    
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', DisplayController.deleteBookHtml);
    });

    const readButtons = document.querySelectorAll(".not-read");
    readButtons.forEach(readButton => {
        readButton.addEventListener("click", DisplayController.toggleReadHtml);
    });
    // End of optional books setup

    library = new Library(books);
}


init();