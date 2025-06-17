document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded fired.');
    const chatbotData = {
        welcome: "Hello! I'm your Locus assistant. I can help you with information about our logistics solutions, platform features, and more. What would you like to know?",
        quickReplies: [
            "What is Locus?",
            "Platform Features",
            "industries served",
            "Pricing",
            "Contact Sales",
            "Technical Support",
            "case studies",
            "api documentation",
            "company locations",
            "partnership programs"
        ],
        responses: {
            "what is locus": "Locus is a cutting-edge logistics optimization platform that leverages advanced AI and machine learning to transform supply chain and last-mile delivery operations. The company provides intelligent decision-making solutions for enterprises to automate and optimize their logistics workflows.",
            "platform features": "The Locus platform includes:\n• AI-Powered Route Optimization\n• Dynamic Fleet Management\n• Real-time Shipment Tracking\n• Automated Dispatch System\n• Predictive Analytics\n• Customer Experience Tools\n• Driver Mobile Applications\n• Multi-modal Transportation Support",
            "industries served": "Locus serves multiple industries including:\n• E-commerce & Retail\n• Logistics Service Providers\n• Food & Beverage\n• Healthcare & Pharmaceuticals\n• Field Services\n• Manufacturing & Industrial",
            "pricing": "Locus offers flexible pricing models tailored to your business scale and requirements. Pricing depends on factors like shipment volume, features needed, and integration complexity. Contact our team for a personalized quote.",
            "contact sales": "Reach our sales team at:\n• Email: sales@locus.sh\n• Phone: +1 (800) XXX-XXXX (US)\n• International numbers available on our website\n• Book a demo through our website contact form",
            "technical support": "Technical support options:\n• 24/7 Support Portal: support.locus.sh\n• Email: support@locus.sh\n• Priority support for enterprise customers\n• Comprehensive documentation and API guides",
            "case studies": "Locus has successfully implemented solutions for:\n• Major e-commerce platforms (30% reduction in delivery costs)\n• Global logistics providers (25% improvement in fleet utilization)\n• Food delivery companies (20% increase in on-time deliveries)\n• Healthcare organizations (improved cold-chain compliance)",
            "api documentation": "Our comprehensive API documentation is available at developers.locus.sh, featuring:\n• Detailed endpoints\n• SDKs for multiple languages\n• Sandbox environment\n• Integration tutorials",
            "company locations": "Locus has offices in:\n• Bangalore, India (HQ)\n• Singapore\n• United States\n• United Arab Emirates\n• Indonesia",
            "partnership programs": "We offer partnership opportunities including:\n• Technology Partnerships\n• System Integrator Programs\n• Reseller Programs\n• Strategic Alliances\nContact partners@locus.sh for details"
        }
    };

    const chatbotButton = document.querySelector('.chatbot-button');
    const chatContainer = document.querySelector('.chat-container');
    const closeChatbotBtn = document.querySelector('.close-chatbot-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const quickRepliesContainer = document.querySelector('.quick-replies');
    const userInput = document.querySelector('.chat-input input');
    const sendMessageBtn = document.querySelector('.chat-input button');

    console.log('chatbotButton:', chatbotButton);
    console.log('chatContainer:', chatContainer);

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `<div class="message-content">${message.replace(/\n/g, '<br>')}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    function addQuickReplies() {
        quickRepliesContainer.innerHTML = '';
        // Show only first 5 quick replies initially
        const initialReplies = chatbotData.quickReplies.slice(0, 5);
        
        initialReplies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'quick-reply-btn';
            button.textContent = reply;
            button.onclick = () => handleQuickReply(reply);
            quickRepliesContainer.appendChild(button);
        });

        // Add More button if there are more replies
        if (chatbotData.quickReplies.length > 5) {
            const moreButton = document.createElement('button');
            moreButton.className = 'more-options-btn';
            moreButton.textContent = 'More Options';
            moreButton.onclick = () => {
                quickRepliesContainer.classList.toggle('expanded');
                if (quickRepliesContainer.classList.contains('expanded')) {
                    // Add remaining replies
                    chatbotData.quickReplies.slice(5).forEach(reply => {
                        const button = document.createElement('button');
                        button.className = 'quick-reply-btn';
                        button.textContent = reply;
                        button.onclick = () => handleQuickReply(reply);
                        quickRepliesContainer.appendChild(button);
                    });
                    moreButton.textContent = 'Show Less';
                } else {
                    // Remove extra replies
                    const buttons = quickRepliesContainer.querySelectorAll('.quick-reply-btn');
                    buttons.forEach((button, index) => {
                        if (index >= 5) button.remove();
                    });
                    moreButton.textContent = 'More Options';
                }
            };
            quickRepliesContainer.appendChild(moreButton);
        }
    }

    function handleQuickReply(reply) {
        addUserMessage(reply);
        const indicator = showTypingIndicator();
        
        setTimeout(() => {
            indicator.remove();
            if (reply.toLowerCase() === 'contact sales') {
                window.location.href = 'Pages/schedule-demo.html';
            } else {
                const response = chatbotData.responses[reply.toLowerCase()] ||
                    "I'm not sure about that. Could you please rephrase your question?";
                addBotMessage(response);
            }
        }, 1000);
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            const indicator = showTypingIndicator();
            setTimeout(() => {
                indicator.remove();
                const response = chatbotData.responses[message.toLowerCase()] ||
                    "I'm not sure about that. Could you please rephrase your question?";
                addBotMessage(response);
            }, 1000);
        }
    }

    if (chatbotButton) {
        chatbotButton.addEventListener('click', () => {
            console.log('Chatbot button clicked!');
            if (chatContainer) {
                chatContainer.classList.add('open');
                console.log('Added open class to chatContainer.');
                setTimeout(() => {
                    addBotMessage(chatbotData.welcome);
                    addQuickReplies();
                }, 300);
            } else {
                console.error('chatContainer not found!');
            }
        });
    } else {
        console.error('chatbotButton not found!');
    }

    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => {
            console.log('Close chatbot button clicked!');
            chatContainer.classList.remove('open');
            chatMessages.innerHTML = ''; // Clear messages when closing
        });
    } else {
        console.error('closeChatbotBtn not found!');
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    } else {
        console.error('sendMessageBtn not found!');
    }

    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        console.error('userInput not found!');
    }

    // Initialize chat on DOMContentLoaded
    // This ensures the chatbot is ready as soon as the page structure is available
    // and avoids conflicts with window.onload if other scripts are using it.
    setTimeout(() => {
        addBotMessage(chatbotData.welcome);
        addQuickReplies();
    }, 500);
}); // End of DOMContentLoaded listener

