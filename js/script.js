// carousel
const slides = document.querySelector('.carousel-slides');
const images = [
    "/assets/images/carousel/1.jpg",
    "/assets/images/carousel/2.jpg",
    "/assets/images/carousel/3.jpg"
]
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
let autoPlayInterval;


// preload gambar
function preloadImages(imagesArray) {
    imagesArray.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};


// function to update background-image
function updateBackgroundImage() {
    const img = new Image();
    img.src = images[currentIndex];
    img.onload = () => {
        slides.style.backgroundImage = `url("${images[currentIndex]}")`;
    };
    updateDots(); //new
};


function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateBackgroundImage();
    }, 3000);
};

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
};


function createDots() {
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateBackgroundImage();
            startAutoPlay();
        });
        dotsContainer.appendChild(dot);
    });
};

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
};


btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateBackgroundImage();
    startAutoPlay();
});

btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateBackgroundImage();
    startAutoPlay();
});



preloadImages(images);
createDots();
updateBackgroundImage();
startAutoPlay();




// hamburger menu
const navbar = document.querySelector('.menu');

function menuToggle() {
    navbar.classList.toggle('active');
};

// menutup hamburger menu ketika klik diluar elemen
const hamburgerMenuClose = document.querySelector('.menu-toggle');

document.addEventListener('click', function(e) {
    if(!hamburgerMenuClose.contains(e.target) && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
    };
});



// dark mode
document.addEventListener('DOMContentLoaded', function() {
    const btnTheme = document.getElementById('theme');
    const iconTheme = btnTheme.querySelector('i');
    const bodyHtml = document.body;

    // set theme based on local storage
    const currentTheme = localStorage.getItem('theme');

    if(currentTheme) {
        bodyHtml.classList.add(currentTheme);

        if(currentTheme === 'dark-mode') {
            iconTheme.classList.replace('fa-moon', 'fa-sun');
        };
    };

    btnTheme.addEventListener('click', function() {
        bodyHtml.classList.toggle('dark-mode');

        if(bodyHtml.classList.contains('dark-mode')) {
            iconTheme.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            iconTheme.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light-mode');
        };
    });
});


// menghetikan effect refresh saat dropdown a di klik
document.querySelector('.dropdown-toggle').addEventListener('click', function(e) {
    e.preventDefault(); //mencegah tindakan default seperti refresh halaman
    // const dropdown = this.parentElement;

    // dropdown.classList.toggle('active')
});


// alert sementara
alert('Website masih dalam tahap pengembangan mohon dimengerti');




// test
const container = document.querySelector('.testimonial-container');

let isDragging = false;
let startX, scrollLeft;

// Event saat mulai men-drag
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
    isDragging = false;
});

container.addEventListener('mouseup', () => {
    isDragging = false;
});

container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Sesuaikan sensitivitas
    container.scrollLeft = scrollLeft - walk;
});

// Untuk layar sentuh (touch events)
container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
});

container.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Sesuaikan sensitivitas
    container.scrollLeft = scrollLeft - walk;
});
