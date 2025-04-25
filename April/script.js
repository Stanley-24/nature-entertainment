'use strict';

function LoadNavbarAndFooter() {

  const navbarHtml =
   ` <header class="navbar navbar-expand-lg fixed-top p-1  m-1 shadow-lg bg-body-tertiary rounded-3">
    <div class="container-fluid ">
      <div class="logo d-flex align-items-center me-2">
        <img src="assets/Icon_color_512X512.png" alt="Logo" width="40" class="img-fluid me-3"/>
        <h5 class="text-purple mb-0">Nature Entertainment</h5>
      </div>
  
      <button
        class="navbar-toggler custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span id="navbar-toggler-icon" class="navbar-toggler-icon "></span>
      </button>
  
      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <div class="ms-auto d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
          
          <!-- Nav links -->
          <ul class="navbar-nav d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
            <li class="nav-item ">
              <a class="nav-link text-purple-black" href="#">Contact us <i class="fas fa-phone"  style="font-size:1.3rem; margin-right: 3px; color: #FF4EDB;"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-purple-black" href="#">Tickets <i class="fas fa-receipt"  style="font-size:1.3rem; margin-right: 5px; color: #FF4EDB;"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-purple-black" href="#">About us <i class="fas fa-info-circle"  style="font-size:1.3rem; margin-right: 3px; color: #FF4EDB;"></i> </a>
            </li>
          </ul>
      
          <!-- Dark mode toggle -->
          <button id="darkToggleBtn" class="btn btn-outline-secondary d-flex align-items-center gap-2">
            <i id="themeIcon" class="bi bi-moon-stars"></i>
            <span id="themeBtnText">Dark Mode</span>
          </button>
        </div>
      </div>
    </div>
  </header>`;

  const footerHtml = 
  `<footer class="text-center text-lg-start mt-0">
      <div class="container">
        <div class="row align-items-start">
    
          <!-- Left Column: Logo -->
          <div class="col-md-4 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
            <img src="assets/NE-logo2.png" alt="Nature Entertainment Logo">
          </div>
    
          <!-- Right Column: Flex with 3 items -->
          <div class="col-md-8">
            <div class="d-flex flex-column flex-md-row justify-content-between gap-3">
    
              <!-- Policies -->
              <div>
                <a href="#" class="d-block">Privacy Policy</a>
                <a href="#" class="d-block">Terms of Service</a>
                <p class="mb-1 copy1">&copy; 2025 Nature Entertainment. All rights reserved.</p>

              </div>
    
              <!-- Contact -->
              <div>
                <p class="mb-1 fw-bold">Contact Us</p>
                <a href="mailto:info@natureentertainment.com">info@natureentertainment.com</a>
              </div>
    
              <!-- Social Media -->
              <div>
                <p class="mb-1 fw-bold">FollowUs</p>
                <a href="https://www.instagram.com/yourbrand" target="_blank" class="social-icon">
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
              <p class="mb-1 copy2">&copy; 2025 Nature Entertainment.<br> All rights reserved. </p>

            </div>
          </div>
    
        </div>
      </div>
    </footer>`;

  document.getElementById("navbar").innerHTML = navbarHtml;
  document.getElementById("footer").innerHTML = footerHtml
 }
 
(() => {
    
   
     const getStoredTheme = () => localStorage.getItem('theme');
     const setStoredTheme = theme => localStorage.setItem('theme', theme);
   
     const getPreferredTheme = () => {
       const storedTheme = getStoredTheme();
       if (storedTheme) return storedTheme;
       return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
     };
   
     const setTheme = theme => {
       if (theme === 'auto') {
         document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
       } else {
         document.documentElement.setAttribute('data-bs-theme', theme);
       }
     };
   
     const updateThemeIcon = theme => {
       const icon = document.getElementById('themeIcon');
       const text = document.getElementById('themeBtnText');
       if (!icon || !text) return;
       if (theme === 'dark') {
         icon.className = 'bi bi-moon-stars';
         text.textContent = 'Dark Mode';
       } else {
         icon.className = 'bi bi-sun-fill';
         text.textContent = 'Light Mode';
       }
     };
   
     window.addEventListener('DOMContentLoaded', () => {
       const currentTheme = getPreferredTheme();
       setTheme(currentTheme);
       updateThemeIcon(currentTheme);
   
       const darkToggleBtn = document.getElementById('darkToggleBtn');
       if (darkToggleBtn) {
         darkToggleBtn.addEventListener('click', () => {
           const current = getStoredTheme() || getPreferredTheme();
           const newTheme = current === 'dark' ? 'light' : 'dark';
           setStoredTheme(newTheme);
           setTheme(newTheme);
           updateThemeIcon(newTheme);
         });
       }
     });
   })();

   // Select all images
const images = document.querySelectorAll('.previos-img');
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
 let currentIndex = 0;
// Add click event to each image
 function showImage(index) {
  modalImg.src = images[index].src;
  modalImg.classList.add('zoom-in'); // Add animation
 }
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index; // Update current index
    modal.style.display = 'flex';
    showImage(currentIndex); // Show the clicked image
  });
});

// Close the modal when clicking the close button
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalImg.classList.remove('zoom-in');
});
 prevBtn.addEventListener('click', (e) => { 
  e.preventDefault();
  currentIndex = (currentIndex -1 + images.length) % images.length;
  showImage(currentIndex);
 });
 nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentIndex = (currentIndex  +1) % images.length;
  showImage(currentIndex);
 })
// Optional: Close modal if user clicks outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalImg.classList.remove('zoom-in');
  }
});



  
   