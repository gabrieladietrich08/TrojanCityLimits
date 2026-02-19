/* =============================================
   TROJAN CITY LIMITS - Main JavaScript
   ============================================= */

// =============================================
// PRODUCT SELECTION STATE
// =============================================

const productState = {
  color: 'white',
  material: 'cotton',
  size: 'l',
  prices: {
    cotton: 20,
    drifit: 25
  }
};

// Product images for each color + material combination
const productImages = {
  white: {
    cotton: {
      front: 'images/cotton-front.png',
      back: 'images/cotton-back.png'
    },
    drifit: {
      front: 'images/drifit-front.png',
      back: 'images/drifit-back.png'
    }
  },
  lightblue: {
    cotton: {
      front: 'images/lightblue-cotton-front.png',
      back: 'images/lightblue-cotton-back.png'
    },
    drifit: {
      front: 'images/drifit-front.png',
      back: 'images/drifit-back.png'
    }
  }
};

// Track which view is currently shown (front or back)
let currentView = 'front';

// =============================================
// SQUARE CHECKOUT LINKS
// =============================================

// IMPORTANT: Replace these placeholder URLs with your actual Square checkout links
// To create these:
// 1. Go to Square Dashboard > Online Checkout > Checkout Links
// 2. Create a link for each product variant
// 3. Paste the URLs below

const checkoutLinks = {
  // White Cotton variants
  'white-cotton-s': 'https://square.link/u/Q0LjTU4a',
  'white-cotton-m': 'https://square.link/u/nT8QW0px',
  'white-cotton-l': 'https://square.link/u/46Qxdz5j',
  'white-cotton-xl': 'https://square.link/u/JJIq6C9e',

  // White Dri-Fit variants
  'white-drifit-s': 'https://square.link/u/WFzboNTb',
  'white-drifit-m': 'https://square.link/u/4WJH7Fkj',
  'white-drifit-l': 'https://square.link/u/qAAHJAof',
  'white-drifit-xl': 'https://square.link/u/LJ7NRRJC',

  // Light Blue Cotton variants
  'lightblue-cotton-s': 'https://square.link/u/pPYpsSW7',
  'lightblue-cotton-m': 'https://square.link/u/B09n8uWY',
  'lightblue-cotton-l': 'https://square.link/u/E84uVnqz',
  'lightblue-cotton-xl': 'https://square.link/u/CZMTATdb',

  // Light Blue Dri-Fit variants
  'lightblue-drifit-s': 'https://square.link/u/vjl5cpMy',
  'lightblue-drifit-m': 'https://square.link/u/lfOPj45r',
  'lightblue-drifit-l': 'https://square.link/u/0TOkPtpW',
  'lightblue-drifit-xl': 'https://square.link/u/qrLNBaKN',
};

// =============================================
// NAVIGATION
// =============================================

function toggleNav() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('nav--open');
}

// Close nav when clicking a link (mobile)
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      nav.classList.remove('nav--open');
    });
  });
});

// =============================================
// PRODUCT IMAGE GALLERY
// =============================================

function changeImage(view, thumbElement) {
  // Update current view
  currentView = view;

  // Get the correct image based on color, material and view
  const color = productState.color;
  const material = productState.material;
  const imageSrc = productImages[color][material][view];

  // Update main image
  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = imageSrc;
      mainImage.style.opacity = '1';
    }, 50);
  }

  // Update active thumbnail
  const thumbs = document.querySelectorAll('.product__thumb');
  thumbs.forEach(thumb => thumb.classList.remove('product__thumb--active'));
  if (thumbElement) {
    thumbElement.classList.add('product__thumb--active');
  }
}

// Update all product images when material changes
function updateProductImages() {
  const color = productState.color;
  const material = productState.material;
  const frontImg = productImages[color][material].front;
  const backImg = productImages[color][material].back;

  // Update thumbnails
  const thumbFrontImg = document.getElementById('thumbFrontImg');
  const thumbBackImg = document.getElementById('thumbBackImg');
  if (thumbFrontImg) thumbFrontImg.src = frontImg;
  if (thumbBackImg) thumbBackImg.src = backImg;

  // Update main image to match current view
  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = productImages[color][material][currentView];
      mainImage.style.opacity = '1';
    }, 100);
  }
}

// =============================================
// PRODUCT OPTIONS SELECTION
// =============================================

function selectOption(type, value, buttonElement) {
  // Update state
  productState[type] = value;

  // Update button styles
  const container = buttonElement.parentElement;
  const buttons = container.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.classList.remove('option-btn--selected'));
  buttonElement.classList.add('option-btn--selected');

  // Update price and images if material or color changed
  if (type === 'material') {
    updatePrice();
    updateProductImages();
  }
  if (type === 'color') {
    updateProductImages();
  }

  // Update checkout link
  updateCheckoutLink();
}

function updatePrice() {
  const priceElement = document.getElementById('productPrice');
  if (priceElement) {
    const price = productState.prices[productState.material];
    priceElement.textContent = `$${price}`;

    // Add a little animation
    priceElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
      priceElement.style.transform = 'scale(1)';
    }, 150);
  }
}

function updateCheckoutLink() {
  const buyButton = document.getElementById('buyButton');
  if (buyButton) {
    const key = `${productState.color}-${productState.material}-${productState.size}`;
    const link = checkoutLinks[key];

    if (link && link !== 'YOUR_SQUARE_CHECKOUT_LINK_HERE') {
      buyButton.href = link;
      buyButton.target = '_blank';
      buyButton.rel = 'noopener noreferrer';
      buyButton.onclick = null;
    } else {
      // If no link configured, show a message
      buyButton.href = '#';
      buyButton.target = '';
      buyButton.onclick = (e) => {
        e.preventDefault();
        alert('Checkout is being set up! Please check back soon or contact us on Instagram @trojancitylimits');
      };
    }
  }
}

// Initialize checkout link on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCheckoutLink();
});

// =============================================
// EMAIL SIGNUP
// =============================================

function handleEmailSubmit(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const successMessage = document.getElementById('emailSuccess');
  const form = document.getElementById('emailForm');

  if (emailInput && emailInput.value) {
    // Store email locally (you can replace this with actual email service integration)
    const emails = JSON.parse(localStorage.getItem('tcl_emails') || '[]');
    if (!emails.includes(emailInput.value)) {
      emails.push(emailInput.value);
      localStorage.setItem('tcl_emails', JSON.stringify(emails));
    }

    // Show success message
    if (form) form.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';

    console.log('Email subscribed:', emailInput.value);
    console.log('All emails:', emails);
  }
}

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// =============================================
// HEADER SCROLL EFFECT
// =============================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }

  lastScroll = currentScroll;
});

// =============================================
// IMAGE LAZY LOADING & TRANSITIONS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    mainImage.style.transition = 'opacity 0.3s ease';
  }
});

// =============================================
// UTILITY: Get all stored emails (for admin use)
// =============================================

function getAllEmails() {
  const emails = JSON.parse(localStorage.getItem('tcl_emails') || '[]');
  console.log('Collected emails:');
  console.table(emails);
  return emails;
}

// You can call getAllEmails() in the browser console to see collected emails

// =============================================
// SCROLL ANIMATIONS (Intersection Observer)
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(
          entry.target.classList.contains('fade-in') ? 'fade-in--visible' :
          entry.target.classList.contains('fade-in-left') ? 'fade-in-left--visible' :
          'fade-in-right--visible'
        );

        // Also reveal staggered children
        if (entry.target.querySelector('.fade-in-stagger')) {
          const children = entry.target.querySelectorAll('.fade-in-stagger > *');
          children.forEach(child => child.classList.add('fade-in--visible'));
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  fadeElements.forEach(el => observer.observe(el));

  // Also observe staggered containers directly
  const staggerContainers = document.querySelectorAll('.fade-in-stagger');
  staggerContainers.forEach(container => {
    const children = container.children;
    for (let child of children) {
      child.classList.add('fade-in');
    }
  });
});

// =============================================
// BACK TO TOP BUTTON
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTop.classList.add('back-to-top--visible');
    } else {
      backToTop.classList.remove('back-to-top--visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// =============================================
// FAQ ACCORDION
// =============================================

function toggleFaq(button) {
  const faqItem = button.parentElement;
  const isOpen = faqItem.classList.contains('faq__item--open');

  // Close all other FAQ items
  document.querySelectorAll('.faq__item').forEach(item => {
    item.classList.remove('faq__item--open');
  });

  // Toggle current item
  if (!isOpen) {
    faqItem.classList.add('faq__item--open');
  }
}

// =============================================
// CONTACT FORM
// =============================================

function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contactName');
  const email = document.getElementById('contactEmail');
  const message = document.getElementById('contactMessage');
  const successMessage = document.getElementById('contactSuccess');
  const form = document.getElementById('contactForm');

  if (name && email && message) {
    // Store contact submission locally
    const contacts = JSON.parse(localStorage.getItem('tcl_contacts') || '[]');
    contacts.push({
      name: name.value,
      email: email.value,
      message: message.value,
      date: new Date().toISOString()
    });
    localStorage.setItem('tcl_contacts', JSON.stringify(contacts));

    // Show success message
    if (form) form.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';

    console.log('Contact form submitted:', { name: name.value, email: email.value, message: message.value });
  }
}

// Utility: Get all contact submissions (for admin use)
function getAllContacts() {
  const contacts = JSON.parse(localStorage.getItem('tcl_contacts') || '[]');
  console.log('Contact submissions:');
  console.table(contacts);
  return contacts;
}
