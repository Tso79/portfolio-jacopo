// ===== MAIN JAVASCRIPT =====

class JacopoPortfolio {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupAnimations();
        this.createParticles();
        this.initCustomCursor();
    }

    init() {
        // Loading screen
        this.hideLoadingScreen();

        // Mobile menu
        this.mobileMenuOpen = false;

        // Theme
        this.initTheme();

        // Navbar scroll
        this.initNavbarScroll();

        // Typewriter effect
        this.initTypewriter();

        // Counter animation
        this.initCounters();

        // Intersection Observer
        this.initIntersectionObserver();

        console.log('🚀 Jacopo Portfolio initialized!');
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileOverlay = document.getElementById('mobile-menu-overlay');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', (e) => {
                if (e.target === mobileOverlay) {
                    this.closeMobileMenu();
                }
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Project video modals
        document.querySelectorAll('.play-video').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const videoSrc = btn.getAttribute('data-video');
                this.openVideoModal(videoSrc);
            });
        });
    }

    setupAnimations() {
        // GSAP Setup
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            this.initGSAPAnimations();
        }

        // CSS Animation triggers
        this.initScrollAnimations();
    }

    // ===== LOADING SCREEN =====
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }

    // ===== MOBILE MENU =====
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        const toggle = document.getElementById('mobile-menu-toggle');
        const overlay = document.getElementById('mobile-menu-overlay');

        if (this.mobileMenuOpen) {
            toggle.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.mobileMenuOpen = false;
        document.getElementById('mobile-menu-toggle').classList.remove('active');
        document.getElementById('mobile-menu-overlay').classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== THEME TOGGLE =====
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // ===== NAVBAR SCROLL =====
    initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    // ===== TYPEWRITER EFFECT =====
    initTypewriter() {
        const typewriter = document.querySelector('.typewriter-text');
        if (!typewriter) return;

        const texts = [
            'Strategie di Marketing che Convertono',
            'Musica che Racconta Storie',
            'Creatività Senza Limiti',
            'Innovazione da Asti al Mondo'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentText = texts[textIndex];

            if (isPaused) {
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    type();
                }, pauseTime);
                return;
            }

            if (isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
            } else {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                    isPaused = true;
                }
            }

            setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
        };

        type();
    }

    // ===== COUNTER ANIMATION =====
    initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);

                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        };

        // Trigger animation when counter comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // ===== INTERSECTION OBSERVER =====
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in-observer, .slide-in-left-observer, .slide-in-right-observer, .scale-in-observer').forEach(el => {
            observer.observe(el);
        });

        // Stagger animations
        document.querySelectorAll('.stagger-container').forEach(container => {
            const staggerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        staggerObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            staggerObserver.observe(container);
        });
    }

    // ===== GSAP ANIMATIONS =====
    initGSAPAnimations() {
        // Hero parallax
        gsap.utils.toArray('.floating-element').forEach((element, i) => {
            gsap.to(element, {
                y: -50,
                rotation: 360,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                delay: i * 0.3
            });
        });

        // Scroll-triggered animations
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: i * 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Skill bars animation
        gsap.utils.toArray('.skill-fill').forEach(skill => {
            const skillValue = skill.getAttribute('data-skill');

            gsap.fromTo(skill,
                { width: "0%" },
                {
                    width: skillValue + "%",
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: skill,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Music player vinyl animation
        const vinyl = document.querySelector('.vinyl-record');
        if (vinyl) {
            gsap.to(vinyl, {
                rotation: 360,
                duration: 3,
                repeat: -1,
                ease: "none",
                paused: true,
                id: "vinylRotation"
            });
        }

        // Music waves
        gsap.utils.toArray('.wave').forEach((wave, i) => {
            gsap.to(wave, {
                scaleY: gsap.utils.random(0.5, 2),
                duration: gsap.utils.random(0.5, 1.5),
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                delay: i * 0.1
            });
        });
    }

    // ===== PARTICLES =====
    createParticles() {
        const particlesContainer = document.getElementById('hero-particles');
        if (!particlesContainer) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
            `;

            particlesContainer.appendChild(particle);
        }
    }

    // ===== CUSTOM CURSOR =====
    initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');

        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;

        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animate cursor
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.9;
            cursorY += (mouseY - cursorY) * 0.9;

            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Cursor hover effects
        document.querySelectorAll('a, button, .clickable').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                follower.classList.add('cursor-hover');
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                follower.classList.remove('cursor-hover');
            });
        });
    }

    // ===== VIDEO MODAL =====
    openVideoModal(videoSrc) {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-backdrop">
                <div class="video-modal-content">
                    <button class="video-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <video controls autoplay>
                        <source src="${videoSrc}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close modal events
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };

        modal.querySelector('.video-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.video-modal-backdrop').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // ===== UTILITY METHODS =====
    handleScroll() {
        // Additional scroll handlers can be added here
    }

    handleResize() {
        // Handle responsive changes
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    // ===== SMOOTH SCROLLING =====
    smoothScrollTo(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - 80; // Account for navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    new JacopoPortfolio();
});

// ===== ADDITIONAL UTILITIES =====

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Generate random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Clamp number between min and max
function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

console.log('🎵 Jacopo Portfolio - Ready to rock! 🚀');