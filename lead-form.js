window.applyGooglePhoneNumber = function (formattedNumber, mobileNumber) {
    const phone = mobileNumber || formattedNumber.replace(/[^\d+]/g, '');
    window.bin86ForwardingNumber = phone;
    const apply = () => {
        document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
            link.href = 'tel:' + phone;
        });
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (!node.parentElement.closest('script, style, noscript')) {
                node.nodeValue = node.nodeValue.replace(/\(604\) 259-1386/g, formattedNumber);
            }
        }
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply, { once: true });
    } else {
        apply();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const conversionEvent = 'form_submit';

    document.querySelectorAll('.header-booking-btn').forEach((link) => {
        link.innerHTML = 'Get a Quote <span aria-hidden="true">&#8594;</span>';
    });

    document.querySelectorAll('#hero-quote-btn, .floating-cta-v2').forEach((link) => {
        link.textContent = 'Get My Junk Removal Quote';
    });

    document.querySelectorAll('#hero-call-btn').forEach((link) => {
        link.href = '#quote-form';
        link.removeAttribute('onclick');
        link.textContent = 'Get My Junk Removal Quote';
    });

    document.querySelectorAll('#hero-text-btn').forEach((link) => {
        link.href = 'tel:6042591386';
        link.textContent = 'Call';
    });

    document.querySelectorAll('.floating-cta-v2').forEach((link) => {
        link.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3l14 9-7 1-3 7z"/></svg> Get a Quote';
    });

    const heroContainer = document.querySelector('.hero-container');
    const originalForm = document.getElementById('lead-form');
    if (heroContainer && originalForm) {
        const panel = document.createElement('div');
        panel.className = 'hero-quote-panel';
        panel.innerHTML = '<h2>Get a Free, Upfront Price</h2><p>Tell us what you need removed.</p>';
        const heroForm = originalForm.cloneNode(true);
        heroForm.id = 'hero-lead-form';
        heroForm.querySelectorAll('[id]').forEach((field) => {
            const label = heroForm.querySelector('label[for="' + field.id + '"]');
            if (label) label.htmlFor = 'hero-' + field.id;
            field.id = 'hero-' + field.id;
        });
        panel.appendChild(heroForm);
        heroContainer.appendChild(panel);
    }

    const heroEyebrow = document.querySelector('.hero-content > p');
    if (heroEyebrow) {
        const desktopLabel = document.createElement('span');
        desktopLabel.className = 'hero-desktop-label';
        desktopLabel.textContent = 'Benny 86 Junk';
        const mobileLabel = document.createElement('span');
        mobileLabel.className = 'hero-mobile-label';
        mobileLabel.textContent = heroEyebrow.textContent;
        heroEyebrow.replaceChildren(desktopLabel, mobileLabel);
    }

    document.querySelectorAll('.owner-cta a').forEach((link) => {
        const mobileText = link.textContent;
        const syncLabel = () => { link.textContent = window.matchMedia('(max-width: 768px)').matches ? mobileText : 'Get a Junk Removal Quote'; };
        syncLabel();
        window.matchMedia('(max-width: 768px)').addEventListener('change', syncLabel);
    });

    document.querySelectorAll('.owner-title').forEach((title) => {
        title.innerHTML = title.innerHTML.replace('Your Best Choice for ', '');
    });

    document.querySelectorAll('.owner-cta a').forEach((link) => {
        link.removeAttribute('onclick');
        link.addEventListener('click', (event) => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', { send_to: 'AW-852974928/p6guCNbJqZwcENC63ZYD' });
                }
                return;
            }

            event.preventDefault();
            document.getElementById('quote-form')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });

    document.querySelectorAll('#reviews-call-btn').forEach((link) => {
        link.removeAttribute('onclick');
        if (!window.matchMedia('(max-width: 768px)').matches) {
            link.textContent = 'Get Your Junk Removal Quote';
        }

        link.addEventListener('click', (event) => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', { send_to: 'AW-852974928/p6guCNbJqZwcENC63ZYD' });
                }
                return;
            }

            event.preventDefault();
            document.getElementById('quote-form')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });

    document.querySelectorAll('.hero-content a[href*="maps.app.goo.gl"] span:last-child').forEach((rating) => {
        rating.textContent = '5.0 Google Rating · 150+ Reviews';
    });

    document.querySelectorAll('.team-grid img, .reviews-grid-v2 img').forEach((image) => {
        image.loading = 'lazy';
        image.decoding = 'async';
    });

    document.querySelectorAll('.team-grid').forEach((gallery) => {
        gallery.querySelectorAll('.team-item:nth-child(n + 4)').forEach((item) => item.remove());
    });

    document.querySelectorAll('main').forEach((main) => {
        const gallery = main.querySelector('.team-gallery');
        const reviews = main.querySelector('.reviews');
        const form = main.querySelector('.quote-form-section-v2');

        if (gallery && reviews) main.insertBefore(reviews, gallery);
        if (gallery && form) main.insertBefore(form, gallery);
    });

    document.querySelectorAll('.mobile-cta-bar').forEach((bar) => {
        const links = bar.querySelectorAll('a');
        if (links[0]) {
            links[0].href = '#quote-form';
            links[0].textContent = 'Check Availability';
        }
        if (links[1]) {
            links[1].href = 'tel:6042591386';
            links[1].textContent = 'Call';
        }
    });

    if (window.bin86PhoneSwap) {
        window.applyGooglePhoneNumber(...window.bin86PhoneSwap);
    }

    document.querySelectorAll('#lead-form, #hero-lead-form').forEach((form) => {
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.querySelector('span').textContent = 'Get My Price';

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const error = form.querySelector('.form-submit-error') || document.createElement('p');
            error.className = 'form-submit-error';
            error.setAttribute('role', 'alert');
            error.hidden = true;
            error.textContent = 'We could not send your request. Please try again or call (604) 259-1386.';
            form.appendChild(error);

            submitButton.disabled = true;
            submitButton.querySelector('span').textContent = 'Sending...';

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(form)).toString(),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                if (!response.ok) throw new Error(`Submission failed: ${response.status}`);

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: conversionEvent });
                document.body.setAttribute('data-form-status', conversionEvent);
                window.dispatchEvent(new CustomEvent('form-submit-success'));

                const modal = document.getElementById('success-modal');
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }

                form.reset();
                submitButton.disabled = false;
                submitButton.querySelector('span').textContent = 'Get My Price';
            } catch (submissionError) {
                console.error(submissionError);
                error.hidden = false;
                submitButton.disabled = false;
                submitButton.querySelector('span').textContent = 'Try Again';
            }
        }, true);
    });
});
