// === GLOBAL STATE ===
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentView = 'homepage';
let currentViewMode = 'grid'; // 'grid' or 'list'
let currentPropertyId = null;
let currentBackgroundIndex = 0;
let isSearchModalOpen = false;

const API_URL = 'stayfinderold-production.up.railway.app';
// Define your background images (videos removed as per request)
const backgrounds = [
    { type: 'image', src: 'stayfinder/images/bg2.png', thumbnail: 'stayfinder/images/bg2.png' },
    { type: 'image', src: 'stayfinder/images/bg1.png', thumbnail: 'stayfinder/images/bg1.png' },
    { type: 'image', src: 'stayfinder/images/property1.jpg', thumbnail: 'stayfinder/images/property1.jpg' },
    { type: 'image', src: 'stayfinder/images/property6-4.jpg', thumbnail: 'stayfinder/images/property6-4.jpg' },
    // Add more image paths here if you have them
];

let filters = {
    location: '',
    priceRange: [5000, 20000], // Default min/max prices
    propertyTypes: [], // e.g., ['apartment', 'hotel']
    amenities: [], // e.g., ['wifi', 'pool']
    rating: [] // e.g., ['4', '5'] (for 4+ stars, 5 stars)
};

// === SAMPLE DATA (Updated to be more comprehensive) ===
const properties = [
    {
        id: 1,
        title: "Luxury Apartment in Kolkata",
        location: "Kolkata",
        type: "apartment",
        price: 13549,
        basePrice: 6775,
        nights: 2,
        rating: 4.59,
        reviews: 1628,
        images: [
            "stayfinder/images/property1.jpg",
            "stayfinder/images/property1-1.jpg",
            "stayfinder/images/property1-2.jpg",
            "stayfinder/images/property1-3.jpg",
            "stayfinder/images/property1-4.jpg"
        ],
        isFavorite: false,
        description: "This stylish apartment in the heart of Kolkata offers modern amenities and breathtaking city views. Perfect for business travelers and tourists alike.",
        host: {
            name: "Amit Kumar",
            since: "2018",
            avatar: "AK"
        },
        coordinates: [22.5726, 88.3639],
        amenities: ["WiFi", "Air Conditioning", "Kitchen", "Washer", "Elevator", "TV", "Essentials"],
        specs: {
            bedrooms: 2,
            beds: 3,
            baths: 2,
            maxGuests: 4
        },
        fees: {
            cleaning: 500,
            service: 812
        },
        userReviews: [
            { id: 101, userName: "Rohan D.", rating: 5, text: "Absolutely stunning! The view was incredible and the host was very welcoming.", date: "2024-05-10T10:00:00Z" },
            { id: 102, userName: "Priya S.", rating: 4, text: "Great location and comfortable stay. Minor issue with the wifi but overall good.", date: "2024-04-22T14:30:00Z" }
        ]
    },
    {
        id: 2,
        title: "Modern Flat in New Town",
        location: "New Town",
        type: "apartment",
        price: 11549,
        basePrice: 8739,
        nights: 2,
        rating: 4.72,
        reviews: 874,
        images: [
            "stayfinder/images/property2.jpg",
            "stayfinder/images/property2-1.jpg",
            "stayfinder/images/property2-2.jpg",
            "stayfinder/images/property2-3.jpg",
            "stayfinder/images/property2-4.jpg"
        ],
        isFavorite: false,
        description: "Contemporary flat with all modern conveniences in the developing New Town area. Excellent connectivity and peaceful environment.",
        host: {
            name: "Manoj Singh",
            since: "2019",
            avatar: "MS"
        },
        coordinates: [22.5815, 88.4544],
        amenities: ["WiFi", "Air Conditioning", "Kitchen", "Washer", "Elevator", "TV", "Gym"],
        specs: {
            bedrooms: 2,
            beds: 3,
            baths: 2,
            maxGuests: 4
        },
        fees: {
            cleaning: 500,
            service: 812
        },
        userReviews: []
    },
    {
        id: 3,
        title: "Heritage Home in North Kolkata",
        location: "Kolkata",
        type: "villa",
        price: 17549,
        basePrice: 8793,
        nights: 2,
        rating: 4.53,
        reviews: 1833,
        images: [
            "stayfinder/images/property3.jpg",
            "stayfinder/images/property3-1.jpg",
            "stayfinder/images/property3-2.jpg",
            "stayfinder/images/property3-3.jpg",
            "stayfinder/images/property3-4.jpg"
        ],
        isFavorite: false,
        description: "Experience traditional Bengali culture in this beautifully restored heritage home. Rich history meets modern comfort.",
        host: {
            name: "Hardik Patel",
            since: "2020",
            avatar: "HP"
        },
        coordinates: [22.5915, 88.3644],
        amenities: ["WiFi", "Air Conditioning", "Kitchen", "Washer", "TV", "Garden", "Heritage"],
        specs: {
            bedrooms: 3,
            beds: 4,
            baths: 2,
            maxGuests: 6
        },
        fees: {
            cleaning: 700,
            service: 1052
        },
        userReviews: []
    },
    {
        id: 4,
        title: "Riverside Villa in Barrackpore",
        location: "Barrackpore",
        type: "villa",
        price: 13854,
        basePrice: 6432,
        nights: 2,
        rating: 4.73,
        reviews: 568,
        images: [
            "stayfinder/images/property4.jpg",
            "stayfinder/images/property4-1.jpg",
            "stayfinder/images/property4-2.jpg",
            "stayfinder/images/property4-3.jpg",
            "stayfinder/images/property4-4.jpg"
        ],
        isFavorite: false,
        description: "Beautiful villa with private garden and river view. Perfect for families seeking tranquility away from city chaos.",
        host: {
            name: "Zaid Ahmed",
            since: "2016",
            avatar: "ZA"
        },
        coordinates: [22.7615, 88.3644],
        amenities: ["WiFi", "Air Conditioning", "Kitchen", "Pool", "Garden", "TV", "River View"],
        specs: {
            bedrooms: 4,
            beds: 5,
            baths: 3,
            maxGuests: 8
        },
        fees: {
            cleaning: 1000,
            service: 1200
        },
        userReviews: []
    },
    {
        id: 5,
        title: "Cozy Studio in Salt Lake",
        location: "Salt Lake",
        type: "studio",
        price: 13998,
        basePrice: 6775,
        nights: 2,
        rating: 4.55,
        reviews: 754,
        images: [
            "stayfinder/images/property5.jpg",
            "stayfinder/images/property5-1.jpg",
            "stayfinder/images/property5-2.jpg",
            "stayfinder/images/property5-3.jpg",
            "stayfinder/images/property5-4.jpg"
        ],
        isFavorite: false,
        description: "Compact and efficient studio apartment in the well-planned Salt Lake area. Ideal for solo travelers and couples.",
        host: {
            name: "Priya Sharma",
            since: "2018",
            avatar: "PS"
        },
        coordinates: [22.5815, 88.4144],
        amenities: ["WiFi", "Air Conditioning", "Kitchenette", "TV", "Essentials"],
        specs: {
            bedrooms: 1,
            beds: 1,
            baths: 1,
            maxGuests: 2
        },
        fees: {
            cleaning: 300,
            service: 600
        },
        userReviews: []
    },
    {
        id: 6,
        title: "Luxury Hotel Suite in New Town",
        location: "New Town",
        type: "hotel",
        price: 14849,
        basePrice: 7389,
        nights: 2,
        rating: 4.73,
        reviews: 1262,
        images: [
            "stayfinder/images/property6.jpg",
            "stayfinder/images/property6-1.jpg",
            "stayfinder/images/property6-2.jpg",
            "stayfinder/images/property6-3.jpg",
            "stayfinder/images/property6-4.jpg"
        ],
        isFavorite: false,
        description: "Stunning hotel suite with panoramic views of the city. Premium amenities and world-class service.",
        host: {
            name: "Aman Hotels",
            since: "2020",
            avatar: "AH"
        },
        coordinates: [22.5715, 88.3244],
        amenities: ["WiFi", "Air Conditioning", "Room Service", "Concierge", "Spa", "Restaurant", "Balcony"],
        specs: {
            bedrooms: 1,
            beds: 1,
            baths: 1,
            maxGuests: 2
        },
        fees: {
            cleaning: 0,
            service: 1100
        },
        userReviews: []
    },
    {
        id: 7,
        title: "Luxury Apartment in New Town",
        location: "New Town",
        type: "apartment",
        price: 15754,
        basePrice: 7775,
        nights: 2,
        rating: 4.61,
        reviews: 1965,
        images: [
            "stayfinder/images/property7.jpg",
            "stayfinder/images/property7-1.jpg",
            "stayfinder/images/property7-2.jpg",
            "stayfinder/images/property7-3.jpg",
            "stayfinder/images/property7-4.jpg"
        ],
        isFavorite: false,
        description: "This stylish apartment in the heart of New Town offers modern amenities and breathtaking city views. Perfect for business travelers and tourists alike.",
        host: {
            name: "Manoj Gupta",
            since: "2015",
            avatar: "MG"
        },
        coordinates: [22.5726, 88.3639],
        amenities: ["WiFi", "Air Conditioning", "Kitchen", "Washer", "Elevator", "TV", "Essentials"],
        specs: {
            bedrooms: 2,
            beds: 3,
            baths: 2,
            maxGuests: 4
        },
        fees: {
            cleaning: 500,
            service: 812
        },
        userReviews: [
            { id: 101, userName: "Sumit k.", rating: 5, text: "Absolutely stunning! The view was incredible and the host was very welcoming.", date: "2024-05-10T10:00:00Z" },
            { id: 102, userName: "Priyaanka S.", rating: 4, text: "Great location and comfortable stay. Minor issue with the wifi but overall good.", date: "2024-04-22T14:30:00Z" }
        ]
    },
    {
        id: 8,
        title: "Luxury Apartment in Salt Lake",
        location: "Salt Lake",
        type: "apartment",
        price: 16458,
        basePrice: 8775,
        nights: 2,
        rating: 4.46,
        reviews: 2543,
        images: [
            "stayfinder/images/property8.jpg",
            "stayfinder/images/property8-1.jpg",
            "stayfinder/images/property8-2.jpg",
            "stayfinder/images/property8-3.jpg",
            "stayfinder/images/property8-4.jpg"
        ],
        isFavorite: false,
        description: "This stylish apartment in the heart of Salt Lake offers modern amenities and breathtaking city views. Perfect for business travelers and tourists alike.",
        host: {
            name: "Deep Das",
            since: "2011",
            avatar: "DD"
        },
        coordinates: [22.5726, 88.3639],
        amenities: ["WiFi", "Air Conditioning", "Kitchen", "Washer", "Elevator", "TV", "Essentials"],
        specs: {
            bedrooms: 2,
            beds: 3,
            baths: 2,
            maxGuests: 4
        },
        fees: {
            cleaning: 500,
            service: 812
        },
        userReviews: [
            { id: 101, userName: "Piyush U.", rating: 5, text: "Absolutely stunning! The view was incredible and the host was very welcoming.", date: "2024-05-10T10:00:00Z" },
            { id: 102, userName: "Nandini S.", rating: 4, text: "Great location and comfortable stay. Minor issue with the wifi but overall good.", date: "2024-04-22T14:30:00Z" }
        ]
    },
];

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupThemeToggle();
    setupDatePickers(); // Make sure this is called early enough
    updateUserInterface();
    setupFilters();
    setupPriceSlider();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput) checkinInput.value = formatDateToISO(today);
    if (checkoutInput) checkoutInput.value = formatDateToISO(tomorrow);

    // Enhanced initialization with small delay for DOM readiness
    setTimeout(() => {
        showView('homepage');
        setupBackgroundCarousel();
        setupAdvancedSearch(); // Add this line
    }, 100);
}
// Optional: Add touch/swipe support for mobile
function setupTouchControls() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next background
                const newIndex = currentBackgroundIndex < backgrounds.length - 1 ? currentBackgroundIndex + 1 : 0;
                changeBackground(newIndex);
            } else {
                // Swipe right - previous background
                const newIndex = currentBackgroundIndex > 0 ? currentBackgroundIndex - 1 : backgrounds.length - 1;
                changeBackground(newIndex);
            }
        }
    }
}
// Call touch controls setup after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupTouchControls();
});

// Add keyboard navigation for thumbnails
function setupBackgroundKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Only if no modal is open
        if (document.querySelector('.modal.visible')) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const newIndex = currentBackgroundIndex > 0 ? currentBackgroundIndex - 1 : backgrounds.length - 1;
            changeBackground(newIndex);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const newIndex = currentBackgroundIndex < backgrounds.length - 1 ? currentBackgroundIndex + 1 : 0;
            changeBackground(newIndex);
        }
    });
}
// Enhanced setup function
function setupBackgroundCarousel() {
    // Initialize carousel
    initializeBackgroundCarousel();
    
    // Setup keyboard navigation
    setupBackgroundKeyboardNav();
    
    // Preload next/previous images for smoother transitions
    preloadAdjacentBackgrounds();
}
// Preload adjacent backgrounds for smoother experience
function preloadAdjacentBackgrounds() {
    const preloadImage = (src) => {
        const img = new Image();
        img.src = src;
    };
    
    backgrounds.forEach((bg, index) => {
        // Preload first 3 backgrounds immediately
        if (index < 3) {
            preloadImage(bg.src);
        }
    });
}
// === EVENT LISTENERS ===
function setupEventListeners() {
    // Search form
    document.getElementById('search-form').addEventListener('submit', handleSearch);
    
    // Auth forms
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('profile-form').addEventListener('submit', handleProfileUpdate);
    
    // Review form is handled inside setupReviewRating for selectedRating
    
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
    });
    
    // Mobile menu
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    
    // Review rating input
    setupReviewRating();
    
    // Modal close on backdrop click
    document.getElementById('auth-modal').addEventListener('click', (e) => {
        if (e.target.id === 'auth-modal') closeAuthModal();
    });
    
    document.getElementById('property-modal').addEventListener('click', (e) => {
        if (e.target.id === 'property-modal') closePropertyModal();
    });
    
    document.getElementById('review-modal').addEventListener('click', (e) => {
        if (e.target.id === 'review-modal') closeReviewModal();
    });

    // // Event listeners for view toggle buttons (grid/list)
    // document.querySelectorAll('.view-toggle button').forEach(button => {
    //     button.addEventListener('click', (e) => {
    //         const mode = e.currentTarget.classList.contains('active') ? '' : (e.currentTarget.querySelector('.fa-th') ? 'grid' : 'list');
    //         toggleView(mode);
    //     });
    // });

    // Setup filter checkboxes listeners
    document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Event listeners for background thumbnails
    document.getElementById('control-thumbnails').addEventListener('click', (e) => {
        const thumbnailItem = e.target.closest('.thumbnail-item');
        if (thumbnailItem) {
            const index = parseInt(thumbnailItem.dataset.index);
            changeBackground(index);
        }
    });
}


function setupDatePickers() {
    flatpickr("#checkin", {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length > 0) {
                const nextDay = new Date(selectedDates[0]);
                nextDay.setDate(nextDay.getDate() + 1);
                // Update minDate for checkout picker, and adjust checkout date if it's before checkin
                const checkoutPicker = document.getElementById('checkout')._flatpickr;
                checkoutPicker.set('minDate', nextDay);
                if (new Date(checkoutPicker.selectedDates[0]) < nextDay) {
                    checkoutPicker.setDate(nextDay);
                }
            }
        }
    });
    
    flatpickr("#checkout", {
        minDate: new Date().fp_incr(1), // Tomorrow
        dateFormat: "Y-m-d"
    });

    // Date pickers for property modal
    flatpickr("#modal-checkin", {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: function(selectedDates) {
            if (selectedDates.length > 0) {
                const nextDay = new Date(selectedDates[0]);
                nextDay.setDate(nextDay.getDate() + 1);
                const modalCheckout = document.getElementById('modal-checkout')._flatpickr;
                modalCheckout.set('minDate', nextDay);
                if (new Date(modalCheckout.selectedDates[0]) < nextDay) {
                    modalCheckout.setDate(nextDay);
                }
            }
        }
    });

    flatpickr("#modal-checkout", {
        minDate: new Date().fp_incr(1), // Tomorrow
        dateFormat: "Y-m-d"
    });
}

function setupThemeToggle() {
    const toggles = ['dark-mode-toggle', 'dark-mode-toggle-results', 'dark-mode-toggle-wishlist', 'dark-mode-toggle-profile', 'dark-mode-toggle-bookings'];
    
    // Check for saved theme preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        toggles.forEach(id => {
            const toggle = document.getElementById(id);
            if (toggle) toggle.checked = true;
        });
    }
    
    // Add event listeners to all toggles
    toggles.forEach(id => {
        const toggle = document.getElementById(id);
        if (toggle) {
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'enabled');
                    // Sync all toggles
                    toggles.forEach(toggleId => {
                        const otherToggle = document.getElementById(toggleId);
                        if (otherToggle) otherToggle.checked = true;
                    });
                } else {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('darkMode', 'disabled');
                    // Sync all toggles
                    toggles.forEach(toggleId => {
                        const otherToggle = document.getElementById(toggleId);
                        if (otherToggle) otherToggle.checked = false;
                    });
                }
            });
        }
    });
}


function setupReviewRating() {
    const ratingInputDiv = document.getElementById('rating-input');
    if (!ratingInputDiv) return; // Exit if element doesn't exist

    const stars = ratingInputDiv.querySelectorAll('i');
    let selectedRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStars(selectedRating);
        });
        
        star.addEventListener('mouseover', () => {
            updateStars(index + 1);
        });
    });
    
    ratingInputDiv.addEventListener('mouseleave', () => {
        updateStars(selectedRating);
    });
    
    // Handle form submission for review
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (selectedRating === 0) {
                showNotification('Please select a rating', 'error');
                return;
            }
            handleReviewSubmit(e, selectedRating);
            selectedRating = 0; // Reset selected rating after submission
        });
    }

    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#FCD34D'; // Filled star color
            } else {
                star.style.color = 'var(--light-border)'; // Empty star color (from CSS var)
                if (document.body.classList.contains('dark-mode')) {
                    star.style.color = 'var(--dark-border)'; // Dark mode empty star
                }
            }
        });
    }
}
// === UPGRADED SLIDER LOGIC ===
function setupPriceSlider() {
    // Correctly get elements inside the function where the DOM is ready
    const priceMinInput = document.getElementById('price-range-min');
    const priceMaxInput = document.getElementById('price-range-max');
    const minValSpan = document.getElementById('price-min-value');
    const maxValSpan = document.getElementById('price-max-value');
    const sliderTrack = document.querySelector('.price-range-slider');

    if (!priceMinInput || !priceMaxInput || !minValSpan || !maxValSpan || !sliderTrack) return;

    function updateSlider() {
        let min = parseInt(priceMinInput.value);
        let max = parseInt(priceMaxInput.value);

        // Ensure min value does not exceed max value
        if (min > max) {
            min = max;
            priceMinInput.value = min;
        }

        // Ensure max value does not go below min value
        if (max < min) {
            max = min;
            priceMaxInput.value = max;
        }

        // Update the displayed values
        minValSpan.textContent = `₹${min.toLocaleString()}`;
        maxValSpan.textContent = `₹${max.toLocaleString()}`;

        // Update CSS variables for track styling
        const minPercent = (min / priceMinInput.max) * 100;
        const maxPercent = (max / priceMaxInput.max) * 100;

        sliderTrack.style.setProperty('--min-percent', `${minPercent}%`);
        sliderTrack.style.setProperty('--track-width', `${maxPercent - minPercent}%`);

        // Update global filters and apply
        filters.priceRange[0] = min;
        filters.priceRange[1] = max;
        applyFilters();
    }

    // Add event listeners
    priceMinInput.addEventListener('input', updateSlider);
    priceMaxInput.addEventListener('input', updateSlider);

    // Initial setup on page load
    priceMinInput.value = filters.priceRange[0];
    priceMaxInput.value = filters.priceRange[1];
    updateSlider();
}
// === NEW: CONTACT FORM SUBMISSION ===
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would send this data to your backend API
            // using a `fetch` request. For now, we'll just simulate success.
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;

            console.log("Contact Form Submitted:", { name, email, subject, message });
            
            // Simulate a successful submission
            showNotification(`Thank you, ${name}! Your message has been sent.`, 'success');
            
            // Reset the form
            contactForm.reset();
        });
    }
});

// === BACKGROUND CAROUSEL LOGIC ===
function initializeBackgroundCarousel() {
    const backgroundContainer = document.getElementById('background-container');
    const thumbnailsContainer = document.getElementById('control-thumbnails');

    if (!backgroundContainer || !thumbnailsContainer) {
        console.warn('Background carousel containers not found');
        return;
    }

    // Clear existing content
    backgroundContainer.innerHTML = '';
    thumbnailsContainer.innerHTML = '';

    // Populate background items and thumbnails dynamically (Images Only)
    backgrounds.forEach((bg, index) => {
        // Create background item
        const backgroundItem = document.createElement('div');
        backgroundItem.className = 'background-item';
        backgroundItem.dataset.index = index;

        // Always create an image tag
        backgroundItem.innerHTML = `
            <img src="${bg.src}" alt="Background ${index + 1}" loading="lazy" onerror="console.error('Background image load error: ${bg.src}')">
        `;
        backgroundContainer.appendChild(backgroundItem);

        // Create thumbnail item
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'thumbnail-item';
        thumbnailItem.dataset.index = index;
        thumbnailItem.setAttribute('title', `Switch to background ${index + 1}`);

        // Always create an image tag for thumbnail
        thumbnailItem.innerHTML = `
            <img src="${bg.thumbnail}" alt="Thumbnail ${index + 1}" loading="lazy" onerror="console.error('Thumbnail image load error: ${bg.thumbnail}')">
        `;
        
        // Add click event to thumbnail
        thumbnailItem.addEventListener('click', () => {
            changeBackground(index);
        });

        thumbnailsContainer.appendChild(thumbnailItem);
    });

    // Initialize with first background
    changeBackground(0);
}

function changeBackground(index) {
    if (index < 0 || index >= backgrounds.length) {
        console.warn('Invalid background index:', index);
        return;
    }

    const backgroundItems = document.querySelectorAll('.background-item');
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');

    // Remove active class from all items
    backgroundItems.forEach((item) => {
        item.classList.remove('active');
        // No videos to pause/reset anymore
    });

    thumbnailItems.forEach(item => {
        item.classList.remove('active');
    });

    // Activate the selected background
    const selectedBackground = backgroundItems[index];
    const selectedThumbnail = thumbnailItems[index];

    if (selectedBackground) {
        selectedBackground.classList.add('active');
        // No video playback logic needed here anymore
    }

    if (selectedThumbnail) {
        selectedThumbnail.classList.add('active');
    }

    // Update global index
    currentBackgroundIndex = index;
    
    // Add a subtle animation effect (if desired, CSS handles it)
    // selectedBackground?.style.setProperty('--animation-delay', '0.3s'); // This is handled by CSS transition
}


// === VIEW MANAGEMENT ===
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('#homepage-view, #results-view, #wishlist-view, #profile-view, #bookings-view').forEach(view => {
        view.classList.add('hidden');
    });

    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.remove('hidden');
        currentView = viewName;
        
        // Get the header elements that might need to be shown/hidden
        const mainNav = document.getElementById('main-nav');
        const homepageSearchContainer = document.getElementById('homepage-search-container');

        // Update content and header based on view
        switch(viewName) {
            case 'homepage':
                if (mainNav) mainNav.classList.remove('hidden'); // <-- SHOW NAV BAR
                if (homepageSearchContainer) homepageSearchContainer.classList.remove('hidden'); // <-- SHOW SEARCH BAR
                updateHeaderTransparency(viewName);
                changeBackground(0);
                break;
            case 'results':
                if (mainNav) mainNav.classList.add('hidden'); // <-- HIDE NAV BAR
                if (homepageSearchContainer) homepageSearchContainer.classList.add('hidden');
                renderProperties();
                break;
            case 'bookings':
                if (mainNav) mainNav.classList.add('hidden'); // <-- HIDE NAV BAR
                if (homepageSearchContainer) homepageSearchContainer.classList.add('hidden');
                if (!currentUser) {
                    showAuthModal('login');
                    localStorage.setItem('redirectAfterLogin', 'bookings');
                    return;
                }
                renderBookings();
                break;
            case 'wishlist':
                if (mainNav) mainNav.classList.add('hidden'); // <-- HIDE NAV BAR
                if (homepageSearchContainer) homepageSearchContainer.classList.add('hidden');
                if (!currentUser) {
                    showAuthModal('login');
                    localStorage.setItem('redirectAfterLogin', 'wishlist');
                    return;
                }
                renderWishlist();
                break;
            case 'profile':
                if (mainNav) mainNav.classList.add('hidden'); // <-- HIDE NAV BAR
                if (homepageSearchContainer) homepageSearchContainer.classList.add('hidden');
                if (!currentUser) {
                    showAuthModal('login');
                    localStorage.setItem('redirectAfterLogin', 'profile');
                    return;
                }
                renderProfile();
                break;
        }
        
        updateHeaderTransparency(viewName);
    }
}

function updateHeaderTransparency(viewName) {
    const header = document.querySelector('.main-header');
    if (header) {
        if (viewName === 'homepage') {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
        }
    }
}

function toggleView(mode) {
    currentViewMode = mode;
    const container = document.getElementById('properties-container');
    const buttons = document.querySelectorAll('.view-toggle button');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Set active class based on the mode
    if (mode === 'list') {
        container.classList.add('list-view');
        document.querySelector('.view-toggle button:last-child').classList.add('active'); // List button
    } else {
        container.classList.remove('list-view');
        document.querySelector('.view-toggle button:first-child').classList.add('active'); // Grid button
    }
    
    renderProperties();
}


function toggleMobileMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('active');
}

// === USER AUTHENTICATION ===
function updateUserInterface() {
    const userMenus = [
        document.getElementById('user-menu-home'),
        document.getElementById('user-menu-results'),
        document.getElementById('user-menu-wishlist'),
        document.getElementById('user-menu-profile'),
        document.getElementById('user-menu-bookings')
    ];
    
    userMenus.forEach(menu => {
        if (menu) {
            if (currentUser) {
                menu.innerHTML = `
                    <div class="user-dropdown">
                        <button class="user-greeting">Hi, ${currentUser.name.split(' ')[0]}!</button>
                        <div class="dropdown-menu">
                            <a href="#" onclick="showView('profile')">My Profile</a>
                            <a href="#" onclick="showView('bookings')">My Bookings</a>
                            <a href="#" onclick="showView('wishlist')">Wishlist</a>
                            <a href="#" onclick="logout()">Logout</a>
                        </div>
                    </div>
                `;
            } else {
                menu.innerHTML = `
                    <button class="login-btn" onclick="showAuthModal('login')">Login</button>
                `;
            }
        }
    });
}

function showAuthModal(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('visible');
    switchAuthTab(tab);
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('visible');
}

function switchAuthTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(`${tab}-form`).classList.add('active');
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('https://stayfinderold-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            // Save token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            closeAuthModal();
            updateUserInterface();
            showNotification('Welcome back!', 'success');
            showView('homepage'); // Redirect to homepage after login
        } else {
            showNotification(data.message || 'Login failed', 'error');
        }
    } catch (err) {
        showNotification('Server error', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const res = await fetch('https://stayfinderold-production.up.railway.app/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role: "Student" })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            closeAuthModal();
            updateUserInterface();
            showNotification('Account created successfully!', 'success');
            showView('homepage'); // Redirect to homepage after registration
        } else {
            showNotification(data.message || 'Registration failed', 'error');
        }
    } catch (err) {
        showNotification('Server error', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    showView('homepage');
    showNotification('Logged out successfully', 'success');
}

// === PROPERTY MANAGEMENT ===
function renderProperties(propertiesToRender = null) {
    const container = document.getElementById('properties-container');
    if (!container) return; // Ensure the container exists

    const props = propertiesToRender || getFilteredProperties();
    
    if (props.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h2 class="empty-title">No properties found</h2>
                <p class="empty-description">Try adjusting your filters or search criteria</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = props.map(property => createPropertyCard(property)).join('');
    
    // Add event listeners
    addPropertyEventListeners();
}

function createPropertyCard(property) {
    const isListView = currentViewMode === 'list';
    // Check if the property is in the current user's wishlist
    const isFavorite = currentUser && currentUser.wishlist.includes(property.id);
    const heartIcon = isFavorite ? 'fas' : 'far';
    const badge = property.rating > 4.6 ? '<div class="property-badge">Guest Favourite</div>' : '';
    
    return `
        <div class="property-card ${isListView ? 'list-view' : ''}" data-id="${property.id}">
            <div class="property-image-container">
                <img src="${property.images[0]}" alt="${property.title}" class="property-image">
                <button class="wishlist-btn ${isFavorite ? 'active' : ''}" data-id="${property.id}">
                    <i class="${heartIcon} fa-heart"></i>
                </button>
                ${badge}
            </div>
            <div class="property-info">
                <div class="property-header">
                    <h3 class="property-title">${property.title}</h3>
                </div>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-features">
                    <span>${property.specs.bedrooms} bed</span>
                    <span>${property.specs.baths} bath</span>
                    <span>${property.specs.maxGuests} guests</span>
                </div>
                <div class="property-rating">
                    <div class="rating-stars">
                        ${generateStars(property.rating)}
                    </div>
                    <span class="rating-number">${property.rating}</span>
                    <span class="rating-reviews">(${property.reviews + property.userReviews.length} reviews)</span>
                </div>
                <div class="property-price">
                    <span>₹${property.price.toLocaleString()}</span>
                    <span class="price-period">night</span>
                </div>
            </div>
        </div>
    `;
}

function addPropertyEventListeners() {
    // Property card clicks
    document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.wishlist-btn')) {
                showPropertyModal(parseInt(card.dataset.id));
            }
        });
    });
    
    // Wishlist button clicks
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click when clicking heart button
            toggleWishlist(parseInt(btn.dataset.id));
        });
    });
}

function showPropertyModal(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    currentPropertyId = propertyId;
    const modal = document.getElementById('property-modal');
    const modalBody = document.getElementById('property-modal-body');
    
    modalBody.innerHTML = createPropertyModalContent(property);
    modal.classList.add('visible');
    
    // Initialize map
    // Ensure map container is rendered before initializing map
    setTimeout(() => initializeMap(property.coordinates), 50); 
    
    // Add event listeners for booking and reviews
    setupPropertyModalEvents(propertyId);
}

function createPropertyModalContent(property) {
    return `
        <div class="property-gallery">
            ${property.images.slice(0, 5).map((img, index) => `
                <img src="${img}" alt="Property view ${index + 1}" class="gallery-image ${index === 0 ? 'gallery-main' : ''}" onclick="openImageLightbox('${img}')">
            `).join('')}
        </div>
        
        <div class="property-details">
            <div class="property-description">
                <h2>${property.title}</h2>
                <div class="property-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${property.location}</span>
                    <span><i class="fas fa-star"></i> ${property.rating} (${property.reviews + property.userReviews.length} reviews)</span>
                    <span><i class="fas fa-user"></i> ${property.specs.maxGuests} guests</span>
                </div>
                
                <p style="margin: 20px 0;">${property.description}</p>
                
                <div style="margin: 20px 0;">
                    <strong>Hosted by ${property.host.name}</strong>
                    <p style="color: var(--light-text-secondary); font-size: 0.9rem;">Hosting since ${property.host.since}</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <strong>Property Details</strong>
                    <p>${property.specs.bedrooms} bedrooms • ${property.specs.beds} beds • ${property.specs.baths} baths</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <strong>Amenities</strong>
                    <div class="amenities-grid">
                        ${property.amenities.map(amenity => `
                            <div class="amenity-item">
                                <span class="amenity-icon">${getAmenityIcon(amenity)}</span>
                                <span>${amenity}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div id="property-map" style="height: 200px; border-radius: 12px; margin: 20px 0;"></div>
            </div>
            
            <div class="booking-widget">
                <div class="price-display">
                    ₹${property.price.toLocaleString()} <span style="font-size: 1rem; font-weight: 400;">/ night</span>
                </div>
                
                <form class="booking-form" id="property-booking-form"> <div class="date-inputs">
                        <div class="form-group">
                            <label for="modal-checkin">Check-in</label>
                            <input type="date" class="form-control" id="modal-checkin">
                        </div>
                        <div class="form-group">
                            <label for="modal-checkout">Check-out</label>
                            <input type="date" class="form-control" id="modal-checkout">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="modal-guests">Guests</label>
                        <select class="form-control" id="modal-guests">
                            ${Array.from({ length: property.specs.maxGuests }, (_, i) => `<option value="${i + 1}">${i + 1} Guest${i === 0 ? '' : 's'}</option>`).join('')}
                        </select>
                    </div>
                    
                    <button type="submit" class="book-btn">
                        <i class="fas fa-calendar-check"></i>
                        Reserve Now
                    </button>
                </form>
                
                <p style="text-align: center; margin: 15px 0; color: var(--light-text-secondary); font-size: 0.9rem;">
                    You won't be charged yet
                </p>
                
                <div class="price-breakdown">
                    <div class="price-row">
                        <span>₹${property.basePrice.toLocaleString()} × ${property.nights} nights</span>
                        <span>₹${(property.basePrice * property.nights).toLocaleString()}</span>
                    </div>
                    ${property.fees.cleaning > 0 ? `
                        <div class="price-row">
                            <span>Cleaning fee</span>
                            <span>₹${property.fees.cleaning.toLocaleString()}</span>
                        </div>
                    ` : ''}
                    <div class="price-row">
                        <span>Service fee</span>
                        <span>₹${property.fees.service.toLocaleString()}</span>
                    </div>
                    <div class="price-total price-row">
                        <span>Total</span>
                        <span>₹${property.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="reviews-section">
            <div class="reviews-header">
                <div class="reviews-summary">
                    <div class="rating-large">${property.rating.toFixed(2)}</div>
                    <div>
                        <div class="rating-stars">
                            ${generateStars(property.rating)}
                        </div>
                        <div>${property.reviews + property.userReviews.length} reviews</div>
                    </div>
                </div>
                ${currentUser ? `
                    <button class="add-review-btn" onclick="showReviewModal()">
                        <i class="fas fa-plus"></i>
                        Add Review
                    </button>
                ` : ''}
            </div>
            
            <div class="reviews-grid" id="reviews-container">
                ${property.userReviews.length > 0 ? property.userReviews.map(review => createReviewCard(review)).join('') : '<p style="text-align: center; color: var(--light-text-secondary);">No user reviews yet. Be the first to review!</p>'}
            </div>
        </div>
    `;
}

function createReviewCard(review) {
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.userName.charAt(0).toUpperCase()}</div>
                    <div>
                        <strong>${review.userName}</strong>
                        <div class="rating-stars">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                </div>
                <div style="font-size: 0.9rem; color: var(--light-text-secondary);">
                    ${formatDate(new Date(review.date))}
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `;
}

function setupPropertyModalEvents(propertyId) {
    // Booking form inside modal
    const bookingFormInModal = document.getElementById('property-booking-form');
    if (bookingFormInModal) {
        bookingFormInModal.addEventListener('submit', (e) => {
            e.preventDefault();
            handleBooking(propertyId);
        });
    }
    
    // Set default dates in modal (using Flatpickr) - these are now handled in setupDatePickers
}

function closePropertyModal() {
    const modal = document.getElementById('property-modal');
    modal.classList.remove('visible');
    currentPropertyId = null;
}

function handleBooking(propertyId) {
    if (!currentUser) {
        showAuthModal('login');
        localStorage.setItem('redirectAfterLogin', 'property-' + propertyId); // Redirect back to property after login
        return;
    }
    
    const property = properties.find(p => p.id === propertyId);
    const checkin = document.getElementById('modal-checkin').value;
    const checkout = document.getElementById('modal-checkout').value;
    const guests = parseInt(document.getElementById('modal-guests').value);
    
    if (!checkin || !checkout) {
        showNotification('Please select check-in and check-out dates', 'error');
        return;
    }

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    let diffDays = Math.ceil(Math.abs(checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)); 
    
    if (diffDays === 0) { // If checkin and checkout are same day, set to 1 night
        diffDays = 1;
    }

    const totalPrice = (property.basePrice * diffDays) + property.fees.cleaning + property.fees.service;

    const booking = {
        id: Date.now(),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.images[0],
        checkin,
        checkout,
        guests,
        nights: diffDays,
        totalPrice: totalPrice,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
    };
    
    // Add to user's bookings
    currentUser.bookings = currentUser.bookings || [];
    currentUser.bookings.unshift(booking);
    
    // Update localStorage
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex > -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    closePropertyModal();
    showNotification(`Booking for ${property.title} confirmed!`, 'success');
    
    // Show booking confirmation (you could create a modal for this)
    setTimeout(() => {
        // Using a custom message box instead of confirm()
        const confirmBox = document.createElement('div');
        confirmBox.className = 'custom-confirm-box';
        confirmBox.innerHTML = `
            <div class="custom-confirm-content">
                <p>Would you like to view your bookings?</p>
                <div class="custom-confirm-buttons">
                    <button id="confirm-yes" class="auth-submit">Yes</button>
                    <button id="confirm-no" class="auth-submit" style="background-color: var(--danger-color);">No</button>
                </div>
            </div>
        `;
        document.body.appendChild(confirmBox);

        document.getElementById('confirm-yes').addEventListener('click', () => {
            document.body.removeChild(confirmBox);
            showView('profile');
        });
        document.getElementById('confirm-no').addEventListener('click', () => {
            document.body.removeChild(confirmBox);
        });
    }, 1000);
}

function toggleWishlist(propertyId) {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }
    
    // Find the property in the global properties array
    const property = properties.find(p => p.id === propertyId);
    if (!property) return; // Should not happen if data-id is correctly set

    // Ensure currentUser.wishlist is initialized
    currentUser.wishlist = currentUser.wishlist || [];
    
    // Check if property is currently favorited by the current user
    const isCurrentlyFavorite = currentUser.wishlist.includes(propertyId);

    if (isCurrentlyFavorite) {
        // Remove from wishlist
        currentUser.wishlist = currentUser.wishlist.filter(id => id !== propertyId);
        showNotification('Removed from wishlist', 'success');
    } else {
        // Add to wishlist
        currentUser.wishlist.push(propertyId);
        showNotification('Added to wishlist', 'success');
    }
    
    // Update localStorage
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex > -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    // Update UI
    updateWishlistButton(propertyId, !isCurrentlyFavorite);
    
    // If we're on wishlist view, re-render to reflect changes
    if (currentView === 'wishlist') {
        renderWishlist();
    }
}


function updateWishlistButton(propertyId, isFavorite) {
    // Select all wishlist buttons for this property ID (could be on results page or wishlist page)
    document.querySelectorAll(`.wishlist-btn[data-id="${propertyId}"]`).forEach(btn => {
        const icon = btn.querySelector('i');
        if (isFavorite) {
            btn.classList.add('active');
            icon.className = 'fas fa-heart';
        } else {
            btn.classList.remove('active');
            icon.className = 'far fa-heart';
        }
    });
}

// === SEARCH & FILTERS ===
function handleSearch(e) {
    e.preventDefault();
    
    const location = document.getElementById('location-select').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = parseInt(document.getElementById('guests-select').value);
    
    // Update global filters object with basic search criteria
    filters.location = location;
    filters.guests = guests;
    // Add date filters (though not explicitly used in getFilteredProperties yet, good for future expansion)
    filters.checkinDate = checkin;
    filters.checkoutDate = checkout;

    // Update results title based on search
    const resultsTitle = document.getElementById('results-title');
    if (resultsTitle) { // Check if element exists before accessing
        const title = location ? `Stays in ${location}` : 'All Stays';
        resultsTitle.textContent = title;
    }
    
    // Show results view and hide homepage search bar
    showView('results');
    
    // Apply all filters and render properties
    applyFilters();
}

function getFilteredProperties() {
    return properties.filter(property => {
        // Location filter
        if (filters.location && filters.location !== 'Anywhere' && property.location !== filters.location) {
            return false;
        }
        
        // Guest capacity filter
        if (filters.guests && property.specs.maxGuests < filters.guests) {
            return false;
        }
        
        // Price range filter (using static range for now, extend with actual slider values)
        if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
             return false; 
        }
        
        // Property type filter
        if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.type)) {
            return false;
        }
        
        // Amenities filter
        if (filters.amenities.length > 0) {
            const hasRequiredAmenities = filters.amenities.every(amenity => 
                property.amenities.some(propAmenity => 
                    propAmenity.toLowerCase().includes(amenity.toLowerCase())
                )
            );
            if (!hasRequiredAmenities) return false;
        }
        
        // Rating filter
        if (filters.rating.length > 0) {
            const meetRatingCriteria = filters.rating.some(rating => {
                const minRating = parseFloat(rating);
                // For 5 stars, check for 4.8 or higher, for 4 stars check 4.0 or higher etc.
                if (minRating === 5) return property.rating >= 4.8; 
                if (minRating === 4) return property.rating >= 4.0;
                if (minRating === 3) return property.rating >= 3.0;
                return false;
            });
            if (!meetRatingCriteria) return false;
        }
        
        return true;
    });
}

function applyFilters() {
    // Collect filter values from the sidebar
    filters.propertyTypes = Array.from(document.querySelectorAll('.filters-sidebar input[type="checkbox"][value="apartment"], .filters-sidebar input[type="checkbox"][value="hotel"], .filters-sidebar input[type="checkbox"][value="villa"], .filters-sidebar input[type="checkbox"][value="studio"]'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
        
    filters.amenities = Array.from(document.querySelectorAll('.filters-sidebar input[type="checkbox"][value="wifi"], .filters-sidebar input[type="checkbox"][value="parking"], .filters-sidebar input[type="checkbox"][value="pool"], .filters-sidebar input[type="checkbox"][value="gym"], .filters-sidebar input[type="checkbox"][value="restaurant"]'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
        
    filters.rating = Array.from(document.querySelectorAll('.filters-sidebar input[type="checkbox"][value="5"], .filters-sidebar input[type="checkbox"][value="4"], .filters-sidebar input[type="checkbox"][value="3"]'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    // Re-render properties with the new filters
    renderProperties();
}

// This function was missing its definition, causing the ReferenceError.
// It applies the currently active filters to the UI checkboxes in the sidebar.
function setupFilters() {
    // Load preferences on startup after DOM content is loaded
    loadPreferences(); // This will populate the 'filters' object based on localStorage

    // Now, apply these filters to the UI checkboxes
    if (filters.propertyTypes.length > 0) {
        filters.propertyTypes.forEach(type => {
            const checkbox = document.querySelector(`.filters-sidebar input[type="checkbox"][value="${type}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    if (filters.amenities.length > 0) {
        filters.amenities.forEach(amenity => {
            const checkbox = document.querySelector(`.filters-sidebar input[type="checkbox"][value="${amenity}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    if (filters.rating.length > 0) {
        filters.rating.forEach(rating => {
            const checkbox = document.querySelector(`.filters-sidebar input[type="checkbox"][value="${rating}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
}


// === REVIEWS ===
function showReviewModal() {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }
    
    const modal = document.getElementById('review-modal');
    modal.classList.add('visible');
    // Reset stars when opening modal
    document.querySelectorAll('#rating-input i').forEach(star => {
        star.style.color = 'var(--light-border)'; // Reset to empty color
        if (document.body.classList.contains('dark-mode')) {
            star.style.color = 'var(--dark-border)';
        }
    });
}

function closeReviewModal() {
    const modal = document.getElementById('review-modal');
    modal.classList.remove('visible');
    
    // Reset form
    document.getElementById('review-form').reset();
}

function handleReviewSubmit(e, rating) {
    e.preventDefault();
    
    if (!currentUser || !currentPropertyId) {
        showNotification('Error: User or property not identified for review.', 'error');
        return;
    }
    
    const reviewText = document.getElementById('review-text').value.trim();
    
    if (!reviewText) {
        showNotification('Please write a review', 'error');
        return;
    }
    
    const review = {
        id: Date.now(),
        propertyId: currentPropertyId,
        userId: currentUser.id,
        userName: currentUser.name,
        rating: rating,
        text: reviewText,
        date: new Date().toISOString()
    };
    
    // Add review to property
    const property = properties.find(p => p.id === currentPropertyId);
    if (property) {
        property.userReviews = property.userReviews || [];
        property.userReviews.unshift(review); // Add to the beginning of the array
        
        // Update average rating dynamically
        // Recalculate based on initial reviews + user reviews
        let totalRatingSum = property.userReviews.reduce((sum, r) => sum + r.rating, 0);
        let totalReviewCount = property.userReviews.length;
        
        // Include initial "reviews" and "rating" if they exist, to form a more complete average
        // This is a simplification; in a real system, 'reviews' would represent all past reviews
        // and 'rating' the initial average, which would then be updated.
        // For this simulation, we'll assume 'reviews' is a count of prior system reviews.
        // and 'rating' the initial average, which would then be updated.
        if (property.reviews > 0 && property.rating > 0) {
            totalRatingSum += (property.rating * property.reviews);
            totalReviewCount += property.reviews;
        }

        property.rating = (totalReviewCount > 0) ? parseFloat((totalRatingSum / totalReviewCount).toFixed(2)) : 0;
    }
    
    // Add to user's reviews (for their profile history)
    currentUser.reviews = currentUser.reviews || [];
    currentUser.reviews.unshift(review);
    
    // Update localStorage for users and currentUser
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex > -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    closeReviewModal();
    showNotification('Review added successfully!', 'success');
    
    // Refresh property modal if open to show new review
    if (currentPropertyId) {
        showPropertyModal(currentPropertyId);
    }
}
// === BOOKINGS VIEW ===
function renderBookings() {
    const container = document.getElementById('bookings-container');
    const emptyState = document.getElementById('bookings-empty');
    const bookings = currentUser?.bookings || []; // Use optional chaining for safety

    if (!container || !emptyState) return;

    if (bookings.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    container.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <div class="booking-image-container">
                <img src="${booking.propertyImage}" alt="${booking.propertyTitle}" class="booking-image">
            </div>
            <div class="booking-details">
                <h3 class="booking-title">${booking.propertyTitle}</h3>
                <p class="booking-info">
                    <strong>Check-in:</strong> ${formatDate(new Date(booking.checkin))}
                </p>
                <p class="booking-info">
                    <strong>Check-out:</strong> ${formatDate(new Date(booking.checkout))}
                </p>
                <p class="booking-info">
                    <strong>Guests:</strong> ${booking.guests}
                </p>
                <p class="booking-info">
                    <strong>Nights:</strong> ${booking.nights}
                </p>
                <div class="booking-price">
                    <strong>Total Price:</strong> ₹${booking.totalPrice.toLocaleString()}
                </div>
            </div>
        </div>
    `).join('');

    // Update the theme toggle for the new view
    const toggle = document.getElementById('dark-mode-toggle-bookings');
    if (toggle) {
        toggle.checked = document.body.classList.contains('dark-mode');
    }
}

// === WISHLIST VIEW ===
function renderWishlist() {
    const container = document.getElementById('wishlist-container');
    const emptyState = document.getElementById('wishlist-empty');
    
    if (!container || !emptyState) return;

    if (!currentUser || !currentUser.wishlist || currentUser.wishlist.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        document.getElementById('wishlist-count').textContent = 0; // Update profile stat
        return;
    }
    
    emptyState.style.display = 'none';
    
    const wishlistProperties = properties.filter(p => 
        currentUser.wishlist.includes(p.id)
    );
    
    // Ensure wishlist properties are marked as favorites in the UI
    wishlistProperties.forEach(p => { 
        // We don't need to modify the original property object's isFavorite in the 'properties' array
        // as the UI is driven by currentUser.wishlist. However, for createPropertyCard to show it correctly,
        // we might temporarily set it or just ensure createPropertyCard checks currentUser.wishlist.
        // The createPropertyCard already checks currentUser.wishlist, so no direct modification needed here.
    });
    
    container.innerHTML = wishlistProperties.map(property => createPropertyCard(property)).join('');
    addPropertyEventListeners(); // Re-add listeners for new cards
    document.getElementById('wishlist-count').textContent = currentUser.wishlist.length; // Update profile stat
}

// === PROFILE VIEW ===
function renderProfile() {
    if (!currentUser) return;
    
    // Update profile info
    const profileAvatar = document.getElementById('profile-avatar');
    const profileNameDisplay = document.getElementById('profile-name');
    const profileEmailDisplay = document.getElementById('profile-email');

    if (profileAvatar) profileAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
    if (profileNameDisplay) profileNameDisplay.textContent = currentUser.name;
    if (profileEmailDisplay) profileEmailDisplay.textContent = currentUser.email;
    
    // Update stats
    const bookingsCount = document.getElementById('bookings-count');
    const wishlistCount = document.getElementById('wishlist-count');
    
    if (bookingsCount) bookingsCount.textContent = (currentUser.bookings || []).length;
    if (wishlistCount) wishlistCount.textContent = (currentUser.wishlist || []).length;
    
    // Populate form
    const profileNameInput = document.getElementById('profile-name-input');
    const profileEmailInput = document.getElementById('profile-email-input');
    const profilePhoneInput = document.getElementById('profile-phone-input');
    const profileAddressInput = document.getElementById('profile-address-input');

    if (profileNameInput) profileNameInput.value = currentUser.name || '';
    if (profileEmailInput) profileEmailInput.value = currentUser.email || '';
    if (profilePhoneInput) profilePhoneInput.value = currentUser.phone || '';
    if (profileAddressInput) profileAddressInput.value = currentUser.address || '';
    
    // Render recent bookings
    renderRecentBookings();
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    if (!currentUser) return;
    
    currentUser.name = document.getElementById('profile-name-input').value;
    currentUser.phone = document.getElementById('profile-phone-input').value;
    currentUser.address = document.getElementById('profile-address-input').value;
    
    // Update localStorage
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex > -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    showNotification('Profile updated successfully!', 'success');
    renderProfile(); // Re-render profile details on page
    updateUserInterface(); // Update header greeting
}

// === UTILITY FUNCTIONS ===
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function getAmenityIcon(amenity) {
    const icons = {
        'WiFi': '<i class="fas fa-wifi"></i>',
        'Air Conditioning': '<i class="fas fa-snowflake"></i>',
        'Kitchen': '<i class="fas fa-utensils"></i>',
        'Washer': '<i class="fas fa-tshirt"></i>',
        'Elevator': '<i class="fas fa-elevator"></i>',
        'TV': '<i class="fas fa-tv"></i>',
        'Pool': '<i class="fas fa-swimming-pool"></i>',
        'Gym': '<i class="fas fa-dumbbell"></i>',
        'Restaurant': '<i class="fas fa-concierge-bell"></i>', // Changed for variety
        'Parking': '<i class="fas fa-parking"></i>',
        'Garden': '<i class="fas fa-seedling"></i>',
        'Balcony': '<i class="fas fa-building"></i>',
        'Room Service': '<i class="fas fa-bell-concierge"></i>', // Changed for variety
        'Concierge': '<i class="fas fa-bell-concierge"></i>',
        'Spa': '<i class="fas fa-spa"></i>',
        'Heritage': '<i class="fas fa-landmark"></i>',
        'River View': '<i class="fas fa-water"></i>',
        'Kitchenette': '<i class="fas fa-blender"></i>', // Changed for variety
        'Essentials': '<i class="fas fa-soap"></i>' // Changed for variety
    };
    
    return icons[amenity] || '<i class="fas fa-check"></i>'; // Default icon
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateToISO(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function initializeMap(coordinates) {
    const mapContainer = document.getElementById('property-map');
    if (mapContainer && typeof L !== 'undefined') {
        // Clear existing map instance if any to prevent errors
        if (mapContainer._leaflet_id) {
            mapContainer._leaflet_id = null; // Clear Leaflet's internal ID
            mapContainer.innerHTML = ''; // Clear map content
        }
        
        try {
            const map = L.map(mapContainer).setView(coordinates, 14);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            L.marker(coordinates).addTo(map);
        } catch (error) {
            console.error("Error initializing map:", error);
            mapContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--light-text-secondary);">Map unavailable</p>';
            if (document.body.classList.contains('dark-mode')) {
                mapContainer.querySelector('p').style.color = 'var(--dark-text-secondary)';
            }
        }
    }
}

function openImageLightbox(imageSrc) {
    // Simple image lightbox
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);

    lightbox.addEventListener('click', () => {
        // Animate out
        lightbox.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300); // Match CSS transition duration
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 4000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('property-modal').classList.contains('visible')) {
            closePropertyModal();
        } else if (document.getElementById('auth-modal').classList.contains('visible')) {
            closeAuthModal();
        } else if (document.getElementById('review-modal').classList.contains('visible')) {
            closeReviewModal();
        }
    }
});

// === AUTO-SAVE PREFERENCES (Not fully implemented for all preferences yet, but structure is here) ===
function savePreferences() {
    const preferences = {
        filters: filters,
        viewMode: currentViewMode
        // Add other preferences here
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

function loadPreferences() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        // Only load if the filter object has properties (i.e., not just an empty default)
        if (Object.keys(preferences.filters).length > 0) {
            filters = { ...filters, ...preferences.filters };
        }
        currentViewMode = preferences.viewMode || 'grid'; // Default to grid
        // Apply initial view mode after loading
        const gridBtn = document.querySelector('.view-toggle button:first-child');
        const listBtn = document.querySelector('.view-toggle button:last-child');
        if (gridBtn && listBtn) {
            if (currentViewMode === 'list') {
                listBtn.classList.add('active');
                gridBtn.classList.remove('active');
                document.getElementById('properties-container').classList.add('list-view');
            } else {
                gridBtn.classList.add('active');
                listBtn.classList.remove('active');
                document.getElementById('properties-container').classList.remove('list-view');
            }
        }
        
        // Re-apply filters from loaded preferences to update UI checkboxes
        if (filters.propertyTypes.length > 0) {
            filters.propertyTypes.forEach(type => {
                const checkbox = document.querySelector(`.filters-sidebar input[type="checkbox"][value="${type}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        if (filters.amenities.length > 0) {
            filters.amenities.forEach(amenity => {
                const checkbox = document.querySelector(`.filters-sidebar input[type="checkbox"][value="${amenity}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        if (filters.rating.length > 0) {
            filters.rating.forEach(rating => {
                const checkbox = document.querySelector(`.filters-sidebar input[type="checkbox"][value="${rating}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
    }
}

// Load preferences on startup after DOM content is loaded
document.addEventListener('DOMContentLoaded', loadPreferences);

// You would call savePreferences() whenever filter options or view mode changes
// For now, it's not hooked up to every filter change automatically, but the function exists.
// For example, you could add it to the end of applyFilters()
