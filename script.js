function chatNow() {
  window.location.href='https://www.facebook.com/Maynard142006'
}
function mailNow() {
  window.location.href = "mailto:mnrdgavino@gmail.com";
}

const sidebar = document.querySelector('.menu-sidebar');
const burger = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.sidebar-x');

function toggleMenu() {
  sidebar.classList.toggle('active');
  burger.classList.toggle('hide');
  closeBtn.classList.toggle('show');
}

document.addEventListener('click', function (e) {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnBurger = burger.contains(e.target);
  const isClickOnClose = closeBtn.contains(e.target);

  if (!isClickInsideSidebar && !isClickOnBurger && !isClickOnClose) {
    sidebar.classList.remove('active');
    burger.classList.remove('hide');
    closeBtn.classList.remove('show');
  }
});

//Gallery modal
const modal = document.getElementById("gallery-modal");

function openGallery() {
  modal.style.display = "flex";
}

function closeGallery() {
  modal.style.display = "none";
}

const gallery = document.getElementById("gallery-modal");

gallery.addEventListener("click", function(e) {
  if (e.target === gallery) {
    closeGallery();
  }
});

function openGallery() {
  modal.style.display = "flex";
  document.body.classList.add("modal-open");
}

function closeGallery() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}

const triggers = document.querySelectorAll(".open-warning");
const showModal = document.getElementById("warning-modal");
const closeModal = document.getElementById("go-back-btn");

// open modal for ALL triggers
triggers.forEach((item) => {
  item.addEventListener("click", () => {
    showModal.classList.add("show");
  });
});

// close modal
const modalText = document.querySelector(".warning-content p");

triggers.forEach((item) => {
  item.addEventListener("click", () => {
    const message = item.dataset.msg;
    modalText.textContent = message;
    showModal.classList.add("show");
  });
});

closeModal.addEventListener("click", () => {
  showModal.classList.remove("show");
});
window.addEventListener("click", (e) => {
  if (e.target === showModal) {
    showModal.classList.remove("show");
  }
});

//Fullsize img
  const viewer = document.getElementById("image-viewer");
  const fullImg = document.getElementById("full-image");


function openImage(src) {
  fullImg.src = src;
  viewer.classList.add("show");
}

function closeImage() {
  document.getElementById("image-viewer").classList.remove("show");
}
document.getElementById("image-viewer").addEventListener("click", (e) => {
  if (e.target.id === "image-viewer") {
    closeImage();
  }
});
// 👇 click outside image
viewer.addEventListener("click", function (e) {
  const img = document.getElementById("full-image");

  if (!img.contains(e.target)) {
    closeImage();
  }
});

// 1. Initialize Variables (Only once!)
const toggle = document.getElementById("theme-toggle");
const icon = toggle.querySelector("i");
let isDragging = false;
let moved = false; // Tracks if the mouse actually moved
let offsetX, offsetY;

// 2. Load Saved Preference immediately
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  icon.classList.replace("fa-moon", "fa-sun");
}

// --- DRAG LOGIC ---

function startDrag(e) {
  moved = false;
  const rect = toggle.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  
  offsetX = clientX - rect.left;
  offsetY = clientY - rect.top;
  
  toggle.classList.add("dragging");
}

function drag(e) {
  if (offsetX === undefined) return;
  
  isDragging = true;
  moved = true; // User is definitely dragging now
  
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  
  toggle.style.left = `${clientX - offsetX}px`;
  toggle.style.top = `${clientY - offsetY}px`;
  toggle.style.position = 'fixed'; // Ensure it can move freely
}

function stopDrag() {
  toggle.classList.remove("dragging");
  offsetX = undefined;
  // Reset dragging flag after a tiny delay to prevent the click event from firing
  setTimeout(() => { isDragging = false; }, 50);
}

// --- THEME LOGIC ---

toggle.addEventListener("click", () => {
  // If the user moved the button, don't toggle the theme
  if (moved) return;
  
  const isDark = document.body.classList.toggle("dark-mode");
  
  // Swap icons efficiently
  if (isDark) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// --- EVENT LISTENERS ---

toggle.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

toggle.addEventListener("touchstart", startDrag, { passive: true });
document.addEventListener("touchmove", drag, { passive: false });
document.addEventListener("touchend", stopDrag);