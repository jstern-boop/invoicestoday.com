/* =====================================================================
   SITE SETTINGS — edit these two things, then commit the file.
   ===================================================================== */
const SITE_CONFIG = {
  // 1) PAYMENT LINKS
  // Create a Stripe Payment Link (or PayPal/Square link) for each service
  // and paste the URL between the quotes. Leave a link blank ("") and the
  // button sends people to the Contact page instead, so nothing breaks.
  // For "website" use a ONE-TIME payment link, NOT a subscription,
  // because that plan is renewed manually each year.
  paymentLinks: {
    micro:    "",   // Micro Automation — $100
    pack3:    "",   // Package of 3, Micro Automations — $400
    advanced: "",   // One Advanced Automation — $1,500
    website:  ""    // Automation-Ready Website — $125 per year
  },

  // 2) CONTACT FORM
  // GitHub Pages can't send email, so the form posts to an outside service.
  // Paste a Formspree form URL (https://formspree.io/f/xxxxxx) or a Zapier
  // "Catch Hook" webhook URL (https://hooks.zapier.com/hooks/catch/...).
  formEndpoint: "",

  // Scheduling link used by the "Book" buttons
  bookingLink: "https://calendly.com/jstern-invoicestoday/30min"
};

/* ===================================================================== */

(function () {
  const root = document.body.dataset.root || "./";

  // When the site is opened straight from your computer (not a web server),
  // folder links need "index.html" added so they open the page.
  if (location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach(a => {
      const h = a.getAttribute("href");
      if (/^(\.{1,2}\/)*([\w-]+\/)*$/.test(h) || h === "./" || h === "../") {
        a.setAttribute("href", h + "index.html");
      }
    });
  }

  // Mobile menu
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  // Booking buttons
  document.querySelectorAll("[data-book]").forEach(a => {
    a.href = SITE_CONFIG.bookingLink;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Payment buttons
  document.querySelectorAll("[data-pay]").forEach(a => {
    const key = a.dataset.pay;
    const link = (SITE_CONFIG.paymentLinks[key] || "").trim();
    if (link) {
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.href = root + "contact/?service=" + encodeURIComponent(a.dataset.service || key);
      a.textContent = "Request this service";
    }
  });

  // Contact form
  const form = document.querySelector("#contact-form");
  if (form) {
    const status = form.querySelector(".form-status");
    const params = new URLSearchParams(location.search);
    const svc = params.get("service");
    if (svc) {
      const msg = form.querySelector("textarea[name=message]");
      if (msg && !msg.value) msg.value = "I'm interested in: " + svc + "\n\n";
    }
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (form.querySelector(".hp input").value) return; // spam bot
      const endpoint = SITE_CONFIG.formEndpoint.trim();
      if (!endpoint) {
        status.textContent = "The contact form isn't connected yet. Please use the Book button to schedule a call.";
        return;
      }
      status.textContent = "Sending…";
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = "Thanks! We'll be in touch shortly.";
      } catch (err) {
        status.textContent = "Sorry, something went wrong. Please try again or book a call instead.";
      }
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
})();
