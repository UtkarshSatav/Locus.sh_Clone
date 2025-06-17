document.querySelectorAll('.frequently-asked-questions-1 h2').forEach(question => {
    question.addEventListener('click', () => {
        // Remove active class from all other questions
        document.querySelectorAll('.frequently-asked-questions-1 h2').forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
            }
        });
        // Toggle active class on clicked question
        question.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll functionality
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const logo = document.querySelector('.logo-W');
        const navLinks = document.querySelectorAll('.nav-links p');
        const globe = document.querySelector('.language-selector img');
        const languageText = document.querySelector('.language-selector span');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            logo.src = '/assets/img/logo/locus-black.svg';
            globe.src = '/assets/globe-logo-black.svg';
            navLinks.forEach(link => {
                link.style.color = '#000';
            });
            languageText.style.color = '#000';
        } else {
            navbar.classList.remove('scrolled');
            logo.src = '/assets/img/logo/locus-white.svg';
            globe.src = '/assets/globe-logo-white.svg';
            navLinks.forEach(link => {
                link.style.color = '#f8f9fa';
            });
            languageText.style.color = '#f8f9fa';
        }
    });

    // Dropdown items with nested dropdowns
    const nestedTriggerItems = document.querySelectorAll('.dropdown-item, .dropdown-header.has-nested');
    let hoverTimeout;

    nestedTriggerItems.forEach(item => {
        const nestedDropdown = item.querySelector('.nested-dropdown');
        const arrowImage = item.querySelector('.dropdown-arrow');

        if (!nestedDropdown) return;

        item.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                document.querySelectorAll('.nested-dropdown').forEach(dropdown => {
                    if (dropdown !== nestedDropdown) {
                        dropdown.style.display = 'none';
                        dropdown.style.opacity = '0';
                        dropdown.style.transform = 'translateX(10px)';
                    }
                });

                nestedDropdown.style.display = 'block';
                nestedDropdown.style.opacity = '0';
                nestedDropdown.style.transform = 'translateX(10px)';

                requestAnimationFrame(() => {
                    nestedDropdown.style.opacity = '1';
                    nestedDropdown.style.transform = 'translateX(0)';
                });

                if (arrowImage) {
                    
                }
            }, 100);
        });

        item.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                nestedDropdown.style.opacity = '0';
                nestedDropdown.style.transform = 'translateX(10px)';

                setTimeout(() => {
                    nestedDropdown.style.display = 'none';
                }, 200);

                // if (arrowImage) {
                //     arrowImage.src = 'assets/img/header_arrow.svg';
                // }
            }, 100);
        });

        nestedDropdown.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            // if (arrowImage) {
            //     arrowImage.src = 'assets/img/header-arrow-orange.svg';
            // }
        });

        nestedDropdown.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                nestedDropdown.style.opacity = '0';
                nestedDropdown.style.transform = 'translateX(10px)';

                setTimeout(() => {
                    nestedDropdown.style.display = 'none';
                }, 200);

                // if (arrowImage) {
                //     arrowImage.src = 'assets/img/header_arrow.svg';
                // }
            }, 100);
        });
    });

    // Main dropdown animations
    const mainDropdowns = document.querySelectorAll('.nav-links > li > .dropdown');

    mainDropdowns.forEach(dropdown => {
        const parent = dropdown.parentElement;
        const mainArrow = parent.querySelector('img.dropdown-arrow');

        parent.addEventListener('mouseenter', () => {
            mainDropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.style.display = 'none';
                    d.style.opacity = '0';
                    d.style.transform = 'translateY(10px)';
                }
            });

            dropdown.style.display = 'block';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(10px)';

            requestAnimationFrame(() => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0)';
            });

            if (mainArrow) {
                mainArrow.style.transform = 'rotate(180deg)';
            }
        });

        parent.addEventListener('mouseleave', () => {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(10px)';

            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 200);

            if (mainArrow) {
                mainArrow.style.transform = 'rotate(0deg)';
            }
        });
    });

    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle the clicked FAQ item
            if (isActive) {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = '0';
                question.setAttribute('aria-expanded', 'false');
            } else {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Set initial aria-expanded state
        question.setAttribute('aria-expanded', 'false');
    });
});



