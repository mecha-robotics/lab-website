
document.addEventListener('DOMContentLoaded', () => {
    // This command finds all the icon placeholders and replaces them with the actual SVG icons.
    feather.replace();

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Smooth Scrolling for anchor links on the same page ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu on link click
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'text-blue-600 mt-4 text-center';

            if (window.db) {
                try {
                    await window.addDoc(window.collection(window.db, "contact_messages"), {
                        name: contactForm.name.value,
                        email: contactForm.email.value,
                        message: contactForm.message.value,
                        sentAt: window.serverTimestamp()
                    });

                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    formStatus.className = 'text-green-600 mt-4 text-center';
                    contactForm.reset();
                } catch (error) {
                    console.error("Error sending message: ", error);
                    formStatus.textContent = 'Sorry, there was an error. Please try again.';
                    formStatus.className = 'text-red-600 mt-4 text-center';
                }
            } else {
                console.warn("Firebase is not configured. Simulating form submission.");
                setTimeout(() => {
                    formStatus.textContent = 'Thank you for your message!';
                    formStatus.className = 'text-green-600 mt-4 text-center';
                    contactForm.reset();
                }, 1500);
            }
            
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

    // --- Initialize the Swiper Image Slider ---
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
  // Mobile/Tablet: wire existing menu button and sidebar with backdrop
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  let navBackdrop = null;

  const ensureBackdrop = () => {
    if (!navBackdrop) {
      navBackdrop = document.createElement('div');
      navBackdrop.className = 'nav-backdrop';
      document.body.appendChild(navBackdrop);
      navBackdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        navBackdrop.classList.remove('is-visible');
      });
    }
  };

  if (menuBtn && sidebar) {
    ensureBackdrop();
    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      navBackdrop.classList.add('is-visible');
    });
    const closeBtn = sidebar.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
        navBackdrop.classList.remove('is-visible');
      });
    }
  }
});

  // legacy sidebar handlers removed

// About section start here
 function handleAboutCTA() {
            const button = event.target;
            
            // Add click animation
            button.style.transform = 'scale(0.95) translateY(-3px)';
            setTimeout(() => {
                button.style.transform = 'translateY(-3px)';
            }, 150);

            // Add your navigation/action logic here
            console.log('About section CTA clicked');
            alert('Ready to start your financial journey! Contact our team to get personalized advice.');
        }

        // Handle tag interactions
        document.addEventListener('DOMContentLoaded', function() {
            const tags = document.querySelectorAll('.about__tag');
            
            tags.forEach(tag => {
                tag.addEventListener('click', function() {
                    // Remove active class from all tags
                    tags.forEach(t => t.classList.remove('about__tag--active'));
                    
                    // Add active class to clicked tag
                    this.classList.add('about__tag--active');
                    
                    // You can add logic here to filter content based on selected tag
                    console.log('Selected tag:', this.textContent);
                });
            });

            // Add keyboard navigation for tags
            tags.forEach((tag, index) => {
                tag.setAttribute('tabindex', '0');
                tag.setAttribute('role', 'button');
                tag.setAttribute('aria-label', `Filter by ${tag.textContent}`);
                
                tag.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });

            // Add scroll animation trigger
            const aboutSection = document.querySelector('.about');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('about--animated');
                    }
                });
            }, {
                threshold: 0.1
            });

            observer.observe(aboutSection);

            // Add accessibility improvements
            const button = document.querySelector('.about__button');
            button.setAttribute('aria-label', 'Start your financial planning journey');

            // Responsive image loading optimization
            const image = document.querySelector('.about__image');
            image.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        });

        // Handle window resize for optimal responsive behavior
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Recalculate any dynamic layouts if needed
                const content = document.querySelector('.about__content');
                content.style.transition = 'all 0.3s ease';
            }, 250);
        });


        // Home page carousal
        

  const swiper = new Swiper('.achievements-section__swiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });

