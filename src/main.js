// Dark Mode Toggle
function initTheme() {
    const themeToggle = document.getElementById("themeToggle")
    const themeIcon = document.getElementById("themeIcon")
    const html = document.documentElement

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem("theme") || "light"
    html.setAttribute("data-theme", savedTheme)
    updateThemeIcon(savedTheme)

    themeToggle.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-theme")
        const newTheme = currentTheme === "dark" ? "light" : "dark"

        html.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
        updateThemeIcon(newTheme)

        updateNavbarTheme(newTheme)
    })
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById("themeIcon")
    if (theme === "dark") {
        themeIcon.className = "bi bi-sun-fill"
    } else {
        themeIcon.className = "bi bi-moon-fill"
    }
}

function updateNavbarTheme(theme) {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
        if (theme === "dark") {
            navbar.style.backgroundColor = "rgba(26, 26, 26, 0.95)"
        } else {
            navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
        }
    }
}

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", initTheme)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            const offsetTop = target.offsetTop - 80 // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            })
        }
    })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    const currentTheme = document.documentElement.getAttribute("data-theme")

    if (window.scrollY > 50) {
        navbar.classList.add("shadow-lg")
        updateNavbarTheme(currentTheme) // Update navbar theme immediately
        navbar.style.backdropFilter = "blur(10px)"
    } else {
        navbar.classList.remove("shadow-lg")
        navbar.style.backgroundColor = ""
        navbar.style.backdropFilter = "none"
    }
})

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Basic validation
    if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.")
        return
    }

    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]')
    const originalText = submitButton.innerHTML

    submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...'
    submitButton.disabled = true

    setTimeout(() => {
        alert("Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.")
        this.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
    }, 2000)
})

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
        }
    })
}, observerOptions)

// Observe feature cards and testimonial cards
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".feature-card, .testimonial-card, .price-card")

    animatedElements.forEach((el) => {
        el.style.opacity = "0"
        el.style.transform = "translateY(30px)"
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        observer.observe(el)
    })
})

// Auto-advance testimonials carousel
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("testimonialsCarousel")
    if (carousel) {
        const bootstrap = window.bootstrap // Declare the bootstrap variable
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
        })
    }
})

// Add active class to navigation items based on scroll position
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

    let current = ""
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id")
        }
    })

    navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active")
        }
    })
})

// Add hover effects to buttons
document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
    })
})

// Countdown timer for limited offer (optional)
function startCountdown() {
    const countdownDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000 // 7 days from now

    const timer = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownDate - now

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        // Update countdown display if element exists
        const countdownElement = document.getElementById("countdown")
        if (countdownElement) {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`
        }

        if (distance < 0) {
            clearInterval(timer)
            if (countdownElement) {
                countdownElement.innerHTML = "Oferta Expirada"
            }
        }
    }, 1000)
}

// Initialize countdown on page load
document.addEventListener("DOMContentLoaded", startCountdown)

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
        img.addEventListener("load", function () {
            this.style.opacity = "1"
        })

        // Set initial opacity
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s ease"
    })
})
