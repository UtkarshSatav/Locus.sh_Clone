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
            logo.src = 'assets/img/logo/locus-black.svg';
            globe.src = 'assets/globe-logo-black.svg';
            navLinks.forEach(link => {
                link.style.color = '#000';
            });
            languageText.style.color = '#000';
        } else {
            navbar.classList.remove('scrolled');
            logo.src = 'assets/img/logo/locus-white.svg';
            globe.src = 'assets/globe-logo-white.svg';
            navLinks.forEach(link => {
                link.style.color = '#f8f9fa';
            });
            languageText.style.color = '#f8f9fa';
        }
    });

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

    // Card section data and functionality
    const cardData = [
        {
            image: 'https://locus.sh/assets/img/home/platform-image-capacity-management.webp',
            title: 'Capacity Management',
            subtitle: 'Always Be There for Your Customers',
            paragraphs: [
                'Ensure consistent fulfillment with adaptable scheduling to manage demand fluctuations and resource availability.',
                'Our <a href="#" class="capacity-link">Capacity Management</a> solutions forecast and orchestrate resources, including fleet and driver availability, to meet growing customer expectations.'
            ]
        },
        {
            image: 'https://locus.sh/assets/img/home/platform-image-hub-operations.webp',
            title: 'Dispatch Planning',
            subtitle: 'Optimize Routes, Minimize Costs',
            paragraphs: [
                'Efficiently plan and optimize delivery routes with our advanced dispatch planning solution.',
                'Reduce fuel costs, increase driver efficiency, and improve overall delivery times.'
            ]
        },
        {
            image: 'https://locus.sh/assets/img/home/platform-image-customer-experience.webp',
            title: 'Delivery Orchestration',
            subtitle: 'Seamless End-to-End Delivery',
            paragraphs: [
                'Manage your entire delivery ecosystem from order creation to final delivery with real-time visibility.',
                'Automate workflows and provide exceptional customer experiences with proactive updates.'
            ]
        },
        {
            image: 'https://locus.sh/assets/img/home/platform-image-orchestration.webp',
            title: 'Track and Trace',
            subtitle: 'Real-time Visibility, Happy Customers',
            paragraphs: [
                'Provide your customers with accurate real-time tracking of their deliveries.',
                'Reduce WISMO calls and enhance customer satisfaction with transparent communication.'
            ]
        }
    ];

    const cardImage = document.getElementById('card-image');
    const cardTitle = document.getElementById('card-title');
    const cardSubtitle = document.getElementById('card-subtitle');
    const cardParagraphsContainer = document.getElementById('card-paragraphs');
    const cardDotsContainer = document.querySelector('.card-dots');

    let currentCardIndex = 0;
    let intervalId;

    function updateCardContent() {
        const currentCard = cardData[currentCardIndex];
        cardImage.src = currentCard.image;
        cardTitle.textContent = currentCard.title;
        cardSubtitle.textContent = currentCard.subtitle;

        cardParagraphsContainer.innerHTML = ''; 

        currentCard.paragraphs.forEach(pText => {
            const p = document.createElement('p');
            p.innerHTML = pText;
            cardParagraphsContainer.appendChild(p);
        });

        document.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === currentCardIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function createDots() {
        cardData.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentCardIndex = index;
                updateCardContent();
                resetInterval();
            });
            cardDotsContainer.appendChild(dot);
        });
    }

    function nextCard() {
        currentCardIndex = (currentCardIndex + 1) % cardData.length;
        updateCardContent();
    }

    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(nextCard, 5000); // Change card every 5 seconds
    }

    if (cardImage && cardTitle && cardSubtitle && cardParagraphsContainer && cardDotsContainer) {
        createDots();
        updateCardContent(); // Initial content load
        resetInterval();
    }

    // Video comparison functionality
    const comparisonButtons = document.querySelectorAll('.comparison-button');
    const comparisonVideo = document.getElementById('comparisonVideo');

    if (comparisonButtons.length > 0 && comparisonVideo) {
        comparisonButtons.forEach(button => {
            button.addEventListener('click', () => {
                comparisonButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (button.textContent === 'With Locus') {
                    comparisonVideo.src = 'assets/Clip2.mov';
                } else {
                    comparisonVideo.src = 'assets/Clip1.mov';
                }
                comparisonVideo.play();
            });
        });
    }

    // Solutions section interactivity
    const solutionIcons = document.querySelectorAll('.solution-icon-box');
    const solutionContents = document.querySelectorAll('.solution-content');

    solutionIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Remove active class and specific color classes from all icons
            solutionIcons.forEach(item => {
                item.classList.remove('active');
                item.classList.remove('all-mile', 'customer-experience', 'workforce-empowerment', 'advanced-analytics', 'sustainability');
            });
            solutionContents.forEach(item => item.classList.remove('active'));

            // Add active class and specific color class to the clicked icon
            const solutionType = icon.dataset.solution;
            icon.classList.add('active');
            icon.classList.add(solutionType); // Add the data-solution as a class

            const targetContent = document.getElementById(`${solutionType}-content`);

            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Form validation and submission for Schedule a Meeting page
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Validate all required text/email/tel inputs
            const requiredInputs = contactForm.querySelectorAll('input[required], select[required]');
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red'; // Highlight invalid fields
                } else {
                    input.style.borderColor = '#ccc'; // Reset border color
                }
            });

            // Specific email validation
            const emailInput = document.getElementById('email');
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (emailInput && !emailPattern.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.style.borderColor = 'red';
            }

            // Phone number validation (basic check for non-empty)
            const phoneInput = document.getElementById('phone');
            if (phoneInput && !phoneInput.value.trim()) {
                isValid = false;
                phoneInput.style.borderColor = 'red';
            }

            // Privacy policy checkbox validation
            const privacyCheckbox = document.getElementById('privacy');
            if (privacyCheckbox && !privacyCheckbox.checked) {
                isValid = false;
                // alert('Please accept the Privacy Policy to proceed.');
            }

            if (isValid) {
                // Simulate form submission
                alert('Thank you! We\'ll get in touch shortly.');
                contactForm.reset(); // Reset the form
                // Optionally, integrate with a dummy backend:
                /*
                const formData = new FormData(contactForm);
                fetch('/api/submit-form', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    alert('Thank you! We\'ll get in touch shortly.');
                    contactForm.reset();
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error submitting the form. Please try again.');
                });
                *///
            } else {
                alert('Please fill in all required fields and correct any errors.');
            }
        });

        // Real-time input validation feedback
        const formInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#ccc'; // Reset border if value exists
                }

                if (this.id === 'email') {
                    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    if (emailPattern.test(this.value.trim())) {
                        this.style.borderColor = '#ccc';
                    } else if (this.value.trim() !== '') { // Only highlight if not empty and invalid
                        this.style.borderColor = 'red';
                    }
                }
            });
        });

         // Reset border color for checkboxes when clicked
         const checkboxes = contactForm.querySelectorAll('input[type="checkbox"]');
         checkboxes.forEach(checkbox => {
             checkbox.addEventListener('change', function() {
                 // No visual feedback needed for checkboxes other than required validation
             });
         });
    }
});

