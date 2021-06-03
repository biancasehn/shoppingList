export default function Modal() {
    const modalWrapper = document.querySelector(".modal-wrapper")
    const closeModal = document.querySelector(".closeModal")
    const cancelModal = document.querySelector(".btnCancel")
    const modal = document.querySelector(".modal")
    
    closeModal.addEventListener("click", close)
    cancelModal.addEventListener("click", close)

    function open() {
        document.addEventListener('keydown', closeOnEscape)
        modalWrapper.classList.add("on")
        modal.classList.add("animate-pop")
    }

    function close(){
        document.addEventListener('keydown', closeOnEscape)
        modalWrapper.classList.remove("on")
        modal.classList.remove("animate-pop")
    }

    function closeOnEscape({ key }) {
        if (key == 'Escape') {
          close()
        }
      }

    return{
        open,
        close
    }
}
