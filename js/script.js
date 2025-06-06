 // Mobile Menu Toggle
 const mobileMenuBtn = document.getElementById('mobileMenuBtn');
 const nav = document.getElementById('nav');

 mobileMenuBtn.addEventListener('click', () => {
     nav.classList.toggle('active');
     mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
         '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
 });

 // Close mobile menu when clicking a link
 document.querySelectorAll('nav ul li a').forEach(link => {
     link.addEventListener('click', () => {
         nav.classList.remove('active');
         mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
     });
 });

 // Header scroll effect
 const header = document.getElementById('header');
 window.addEventListener('scroll', () => {
     if (window.scrollY > 100) {
         header.classList.add('scrolled');
     } else {
         header.classList.remove('scrolled');
     }
 });

 // Animate service cards on scroll
 const serviceCards = document.querySelectorAll('.service-card');
 const animateOnScroll = () => {
     serviceCards.forEach(card => {
         const cardPosition = card.getBoundingClientRect().top;
         const screenPosition = window.innerHeight / 1.3;
         
         if (cardPosition < screenPosition) {
             card.classList.add('animate');
         }
     });
 };

 window.addEventListener('scroll', animateOnScroll);
 // Trigger once on page load
 animateOnScroll();

 // Testimonial slider
 const slides = document.querySelectorAll('.testimonial-slide');
 const dots = document.querySelectorAll('.slider-dot');
 let currentSlide = 0;

 const showSlide = (index) => {
     slides.forEach(slide => slide.classList.remove('active'));
     dots.forEach(dot => dot.classList.remove('active'));
     
     slides[index].classList.add('active');
     dots[index].classList.add('active');
     currentSlide = index;
 };

 dots.forEach(dot => {
     dot.addEventListener('click', (e) => {
         const slideIndex = parseInt(e.target.getAttribute('data-slide'));
         showSlide(slideIndex);
     });
 });

 // Auto slide change
 setInterval(() => {
     currentSlide = (currentSlide + 1) % slides.length;
     showSlide(currentSlide);
 }, 5000);

 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         const targetElement = document.querySelector(targetId);
         
         if (targetElement) {
             window.scrollTo({
                 top: targetElement.offsetTop - 80,
                 behavior: 'smooth'
             });
         }
     });
 });

 document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('deliveryForm');
    const formStatus = document.getElementById('formStatus');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        
        // Change button text to indicate loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = 'Thank you! Your delivery request has been submitted. We will contact you shortly.';
                formStatus.className = 'form-status success';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again later or contact us directly.';
            formStatus.className = 'form-status error';
            console.error('Error:', error);
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Scroll to show the status message
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        form.reset();

    });
});
    
