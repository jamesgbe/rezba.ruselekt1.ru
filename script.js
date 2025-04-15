document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Form submission handling
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = quoteForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';

            try {
                const formData = new FormData(quoteForm);
                const response = await fetch(quoteForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
                    quoteForm.reset();
                } else {
                    throw new Error('Ошибка отправки формы');
                }
            } catch (error) {
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
                console.error('Form submission error:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Отправить заявку';
            }
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('contact');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                const matches = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                if (matches) {
                    e.target.value = '+7 ' + 
                        (matches[1] ? '(' + matches[1] + ') ' : '') +
                        (matches[2] ? matches[2] : '') +
                        (matches[3] ? '-' + matches[3] : '') +
                        (matches[4] ? '-' + matches[4] : '');
                }
            }
        });
    }

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});
