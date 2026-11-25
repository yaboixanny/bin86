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
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const phoneIcon = '<svg class="phone-icon ring-animation" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 2.09 4.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    const callNumber = () => window.bin86ForwardingNumber || '6042591386';
    const trackCall = () => { if (typeof window.gtag === 'function') window.gtag('event', 'conversion', { send_to: 'AW-852974928/p6guCNbJqZwcENC63ZYD' }); };
    document.querySelector('#header-call-link .phone-icon')?.classList.add('ring-animation');

    document.querySelectorAll('.header-booking-btn').forEach((link) => {
        link.innerHTML = 'Get a Quote <span aria-hidden="true">&#8594;</span>';
    });

    document.querySelectorAll('#hero-quote-btn, .floating-cta-v2').forEach((link) => {
        link.textContent = 'Get My Junk Removal Quote';
    });

    document.querySelectorAll('#hero-call-btn').forEach((link) => {
        link.removeAttribute('onclick');
        const update = () => {
            link.href = mobileQuery.matches ? 'tel:' + callNumber() : '#quote-form';
            link.innerHTML = mobileQuery.matches ? phoneIcon + ' Call (604) 259-1386' : 'Get My Junk Removal Quote';
        };
        update();
        mobileQuery.addEventListener('change', update);
        link.addEventListener('click', () => { if (mobileQuery.matches) trackCall(); });
    });

    document.querySelectorAll('#hero-text-btn').forEach((link) => {
        const update = () => {
            link.href = mobileQuery.matches ? 'sms:6042591386' : 'tel:' + callNumber();
            link.textContent = mobileQuery.matches ? 'Send Text Instead' : 'Call';
        };
        update();
        mobileQuery.addEventListener('change', update);
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
        desktopLabel.textContent = 'Bin 86 Junk';
        const mobileLabel = document.createElement('span');
        mobileLabel.className = 'hero-mobile-label';
        mobileLabel.textContent = 'Bin 86 Junk';
        heroEyebrow.replaceChildren(desktopLabel, mobileLabel);
    }

    document.querySelectorAll('.owner-cta a').forEach((link) => {
        const syncLabel = () => { link.innerHTML = mobileQuery.matches ? phoneIcon + ' Call Sterling' : 'Get a Junk Removal Quote'; };
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

    document.querySelectorAll('#why-pick-call-btn, #final-call-btn').forEach((link) => {
        const original = link.innerHTML;
        link.removeAttribute('onclick');
        const update = () => {
            link.href = mobileQuery.matches ? 'tel:' + callNumber() : '#quote-form';
            link.innerHTML = mobileQuery.matches ? original : 'Get a Quote';
        };
        update();
        mobileQuery.addEventListener('change', update);
        link.addEventListener('click', () => { if (mobileQuery.matches) trackCall(); });
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
            links[0].removeAttribute('onclick');
            links[0].href = 'tel:' + callNumber();
            links[0].innerHTML = phoneIcon + ' Call (604) 259-1386';
            links[0].addEventListener('click', trackCall);
        }
        if (links[1]) {
            links[1].remove();
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
