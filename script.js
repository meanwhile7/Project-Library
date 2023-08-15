const openModal = document.querySelector('.newbook')
const modal = document.querySelector('#modal')
const closemodal = document.querySelector('.closemodal')
openModal.addEventListener('click' , ()=>{
    modal.showModal();
})

closemodal.addEventListener('click', ()=>{
    modal.close();
})