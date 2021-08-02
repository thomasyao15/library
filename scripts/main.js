
document.getElementById("add-book").addEventListener("click", toggleModal);
document.getElementById("close-modal").addEventListener("click", toggleModal);


function toggleModal() {
    console.log("Toggle modal");
    const modal = document.querySelector(".modal-container");
    modal.classList.toggle("open");
}