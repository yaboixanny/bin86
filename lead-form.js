document.addEventListener('DOMContentLoaded', () => {
    const conversionEvent = 'form_submit';

    document.querySelectorAll('.header-booking-btn').forEach((link) => {
        link.innerHTML = 'Check Availability <span aria-hidden="true">&#8594;</span>';
    });

    document.querySelectorAll('#hero-quote-btn, .floating-cta-v2').forEach((link) => {
        link.textContent = 'Check Same-Day Availability';
    });

    document.querySelectorAll('#hero-call-btn').forEach((link) => {
        link.href = '#quote-form';
        link.removeAttribute('onclick');
        link.textContent = 'Check Same-Day Availability';
    });

    document.querySelectorAll('#hero-text-btn').forEach((link) => {
        link.href = 'tel:6042591386';
        link.textContent = 'Call';
    });

    document.querySelectorAll('.desktop-cta-container').forEach((cta) => cta.remove());

    document.querySelectorAll('.hero-actions-container').forEach((actions) => {
        const certainty = document.createElement('p');
        certainty.className = 'hero-price-certainty';
        certainty.textContent = 'Pickups from $99. Final price confirmed before we start.';
        actions.insertAdjacentElement('afterend', certainty);
    });

    document.querySelectorAll('.hero-content a[href*="maps.app.goo.gl"] span:last-child').forEach((rating) => {
        rating.textContent = '5.0 Google Rating · 150+ Reviews';
    });

    document.querySelectorAll('.hero-trust-list').forEach((list) => {
        const items = list.querySelectorAll('.hero-trust-item');
        if (items[0]) items[0].innerHTML = '<strong>5.0 Google Rating</strong><span>150+ reviews</span>';
        if (items[1]) items[1].innerHTML = '<strong>Pickups from $99</strong><span>Final price confirmed first</span>';
        if (items[3]) items[3].innerHTML = '<strong>Reliable, On-Time Service</strong>';
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

    document.querySelectorAll('#lead-form').forEach((form) => {
        const submitButton = form.querySelector('button[type="submit"]');
        const details = document.createElement('div');
        details.className = 'lead-form-step lead-form-details';
        details.hidden = true;

        [...form.children].forEach((child) => {
            if (child !== submitButton) details.appendChild(child);
        });

        const email = details.querySelector('input[type="email"]');
        const notes = details.querySelector('textarea');
        if (email) email.required = false;
        if (notes) {
            notes.required = false;
            notes.placeholder = 'Anything else we should know? (optional)';
            const notesLabel = details.querySelector('label[for="needs"]');
            if (notesLabel) notesLabel.textContent = 'Anything else we should know? (optional)';
        }

        const firstStep = document.createElement('div');
        firstStep.className = 'lead-form-step lead-form-start';
        firstStep.innerHTML = `
            <p class="lead-form-kicker">Step 1 of 2</p>
            <label for="item-type">What do you need removed?</label>
            <select id="item-type" name="item_type" required>
                <option value="" selected disabled>Select an option</option>
                <option>Furniture or mattress</option>
                <option>Appliance</option>
                <option>Household junk</option>
                <option>Renovation debris</option>
                <option>Estate or business cleanup</option>
                <option>Something else</option>
            </select>
            <button type="button" class="btn btn-primary form-next-button">Check Same-Day Availability</button>
            <p class="lead-form-note">No obligation. We confirm your price before any work starts.</p>
        `;

        form.insertBefore(firstStep, submitButton);
        form.insertBefore(details, submitButton);
        submitButton.hidden = true;
        submitButton.querySelector('span').textContent = 'Get My Price';

        firstStep.querySelector('.form-next-button').addEventListener('click', () => {
            const itemType = firstStep.querySelector('select');
            if (!itemType.reportValidity()) return;
            firstStep.hidden = true;
            details.hidden = false;
            submitButton.hidden = false;
            details.querySelector('input[type="text"]').focus();
        });

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
            } catch (submissionError) {
                console.error(submissionError);
                error.hidden = false;
                submitButton.disabled = false;
                submitButton.querySelector('span').textContent = 'Try Again';
            }
        }, true);
    });
});
