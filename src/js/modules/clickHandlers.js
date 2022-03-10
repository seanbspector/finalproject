function clickHandlers(event) {
  if (event.target.matches("#pull")) {
    showMenu();
    event.preventDefault();
  }
  if (event.target.matches(".content-video a")) {
    videoSwitch(event);
    event.preventDefault();
  }
}

function showMenu() {
  document.querySelector("body").classList.toggle("show-nav");
}

function videoSwitch(event) {
  const iFrame = document.querySelector("iframe");
  const videoLinks = document.querySelectorAll(".content-video a");
  videoLinks.forEach((videoLink) => videoLink.classList.remove("active"));
  event.target.classList.add("active");
  const videoToPlay = event.target.getAttribute("href");
  iFrame.setAttribute("src", videoToPlay);
}

// alternative way to export
export default clickHandlers;
