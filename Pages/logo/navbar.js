document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll functionality with throttling
    let ticking = false;
    const scrollThreshold = 50;

    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        const logo = document.querySelector('.logo-W');
        const navLinks = document.querySelectorAll('.nav-links p');
        const globe = document.querySelector('.language-selector img');
        const languageText = document.querySelector('.language-selector span');
        
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
            logo.src = '../assets/img/logo/locus-black.svg';
            globe.src = '../assets/globe-logo-black.svg';
            navLinks.forEach(link => {
                link.style.color = '#000';
            });
            languageText.style.color = '#000';
        } else {
            navbar.classList.remove('scrolled');
            logo.src = '../assets/img/logo/locus-white.svg';
            globe.src = '../assets/globe-logo-white.svg';
            navLinks.forEach(link => {
                link.style.color = '#f8f9fa';
            });
            languageText.style.color = '#f8f9fa';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
            });
            ticking = true;
        }
    });

    // Initial check for scroll position
    updateNavbar();

    // Handle all dropdowns
    const dropdownTriggers = document.querySelectorAll('.nav-links > li > a');
    let activeDropdown = null;

    dropdownTriggers.forEach(trigger => {
        const dropdown = trigger.nextElementSibling;
        if (!dropdown || !dropdown.classList.contains('dropdown')) return;

        trigger.addEventListener('mouseenter', () => {
            if (activeDropdown && activeDropdown !== dropdown) {
                activeDropdown.style.display = 'none';
                activeDropdown.style.opacity = '0';
                activeDropdown.style.transform = 'translateY(10px)';
            }

            dropdown.style.display = 'block';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(10px)';

            requestAnimationFrame(() => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0)';
            });

            activeDropdown = dropdown;
        });

        trigger.parentElement.addEventListener('mouseleave', () => {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(10px)';
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 200);
            activeDropdown = null;
        });
    });

    // Handle nested dropdowns
    const nestedTriggers = document.querySelectorAll('.dropdown-header.has-nested');
    let activeNestedDropdown = null;

    nestedTriggers.forEach(trigger => {
        const nestedDropdown = trigger.querySelector('.nested-dropdown');
        if (!nestedDropdown) return;

        trigger.addEventListener('mouseenter', () => {
            if (activeNestedDropdown && activeNestedDropdown !== nestedDropdown) {
                activeNestedDropdown.style.display = 'none';
                activeNestedDropdown.style.opacity = '0';
                activeNestedDropdown.style.transform = 'translateX(10px)';
            }

            nestedDropdown.style.display = 'block';
            nestedDropdown.style.opacity = '0';
            nestedDropdown.style.transform = 'translateX(10px)';

            requestAnimationFrame(() => {
                nestedDropdown.style.opacity = '1';
                nestedDropdown.style.transform = 'translateX(0)';
            });

            activeNestedDropdown = nestedDropdown;
        });

        trigger.addEventListener('mouseleave', () => {
            nestedDropdown.style.opacity = '0';
            nestedDropdown.style.transform = 'translateX(10px)';
            setTimeout(() => {
                nestedDropdown.style.display = 'none';
            }, 200);
            activeNestedDropdown = null;
        });

        // Keep nested dropdown visible when hovering over it
        nestedDropdown.addEventListener('mouseenter', () => {
            nestedDropdown.style.display = 'block';
            nestedDropdown.style.opacity = '1';
            nestedDropdown.style.transform = 'translateX(0)';
        });

        nestedDropdown.addEventListener('mouseleave', () => {
            nestedDropdown.style.opacity = '0';
            nestedDropdown.style.transform = 'translateX(10px)';
            setTimeout(() => {
                nestedDropdown.style.display = 'none';
            }, 200);
        });
    });

    // Handle dropdown arrows
    const dropdownArrows = document.querySelectorAll('.dropdown-arrow');
    dropdownArrows.forEach(arrow => {
        const parent = arrow.closest('a, .dropdown-header');
        if (!parent) return;

        parent.addEventListener('mouseenter', () => {
            arrow.style.transform = 'rotate(180deg)';
        });

        parent.addEventListener('mouseleave', () => {
            arrow.style.transform = 'rotate(0deg)';
        });
    });
});
