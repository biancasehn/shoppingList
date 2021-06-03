export default function ErrorMessage() {
    
    const error = document.querySelector(".error")
    const btnDismiss = document.querySelector(".dismiss")

    btnDismiss.addEventListener('click', close)

    function open() {
        error.classList.add("on")
        error.classList.add("animate-up")
      }
    
    function close() {
        error.classList.remove("on")
        error.classList.remove("animate-up")
    }

      return {
          open,
          close
      }
}