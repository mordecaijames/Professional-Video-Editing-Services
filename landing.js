/* ===================================
   LANDING PAGE - JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initStickyCTA();
    initFAQ();
    initContactForm();
    initScrollReveal();
    initNavbarScroll();
});

/* ===================================
   SMOOTH SCROLLING
   =================================== */

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   STICKY CTA BUTTON
   =================================== */

function initStickyCTA() {
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.querySelector('.hero');
    const contactSection = document.getElementById('contact');
    
    if (!stickyCta || !heroSection) return;
    
    window.addEventListener('scroll', throttle(() => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const contactTop = contactSection ? contactSection.offsetTop : Infinity;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Show sticky CTA after hero section, hide when contact form is visible
        if (window.scrollY > heroBottom && scrollPosition < contactTop) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    }, 100));
}

/* ===================================
   FAQ ACCORDION
   =================================== */

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* ===================================
   CONTACT FORM HANDLING
   =================================== */

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        
        // Simulate form submission (replace with actual API call)
        try {
            await simulateFormSubmission(data);
            
            // Success
            showFormMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
            
            // Track conversion (add your analytics code here)
            console.log('Form submitted:', data);
            
        } catch (error) {
            // Error
            showFormMessage('Oops! Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

function validateForm(data) {
    const requiredFields = ['name', 'email', 'projectType', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Here you would typically send the data to your server
            // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
            resolve();
        }, 1500);
    });
}

/* ===================================
   SCROLL REVEAL ANIMATIONS
   =================================== */

function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.feature-card, .step-card, .portfolio-item, .testimonial-card, .pricing-card'
    );
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ===================================
   NAVBAR SCROLL EFFECT
   =================================== */

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    }, 100));
}

/* ===================================
   PLAY BUTTON FUNCTIONALITY
   =================================== */

// Add event listeners to all play buttons
document.querySelectorAll('.play-btn, .play-btn-large').forEach(button => {
    button.addEventListener('click', function() {
        // Get the parent element that contains video information
        const videoContainer = this.closest('.mockup-screen, .portfolio-thumbnail');
        
        // Here you would typically:
        // 1. Get the video URL from a data attribute
        // 2. Open a modal with the video player
        // 3. Or navigate to a video page
        
        console.log('Play button clicked - Video would play here');
        
        // Example of opening a modal (you would need to implement the modal)
        // openVideoModal(videoUrl);
    });
});

/* ===================================
   NUMBER COUNTER ANIMATION
   =================================== */

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe trust numbers and animate when visible
const trustNumbers = document.querySelectorAll('.trust-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                element.textContent = '0';
                animateCounter(element, number);
            }
            
            counterObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

trustNumbers.forEach(el => counterObserver.observe(el));

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ===================================
   ANALYTICS TRACKING (Optional)
   =================================== */

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-cta').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log('CTA clicked:', buttonText);
        
        // Add your analytics tracking here
        // Example: gtag('event', 'cta_click', { button_text: buttonText });
    });
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', throttle(() => {
    const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestones
        if (maxScrollDepth === 25 || maxScrollDepth === 50 || maxScrollDepth === 75 || maxScrollDepth === 100) {
            console.log('Scroll depth:', maxScrollDepth + '%');
            // Add your analytics tracking here
        }
    }
}, 500));

/* ===================================
   PAGE LOAD ANIMATIONS
   =================================== */

window.addEventListener('load', () => {
    // Add entrance animations
    document.body.classList.add('loaded');
    
    // Trigger any additional load animations here
    console.log('Landing page loaded successfully');
});
