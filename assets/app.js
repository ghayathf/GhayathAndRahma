(() => {
  "use strict";

  const EVENT = {
    date: new Date("2026-08-11T19:00:00+03:00"),
    calendarDates: "20260811T160000Z/20260811T200000Z",
    locationUrl: "https://maps.app.goo.gl/SQRDEtAfUsWxgLCe8",
  };

  const translations = {
    en: {
      dir: "ltr",
      switchLabel: "العربية",
      together: "TOGETHER WITH THEIR FAMILIES",
      groom: "Ghayath",
      bride: "Rahma",
      welcomeLine1: "They are honored to invite you to share",
      welcomeLine2: "in the joy of celebrating their wedding.",
      openInvitation: "Open Invitation",
      saveDate: "SAVE THE DATE",
      marriageHeading: "ARE GETTING MARRIED",
      invitation: "With joyful hearts, we invite you to share the beginning of our new chapter.",
      day: "Tuesday",
      fullDate: "11 August 2026",
      dateNumber: "11",
      monthYear: "August 2026",
      time: "7:00 PM",
      timeNote: "The celebration begins promptly",
      countdownTitle: "Counting down to our special evening",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      weddingToday: "Today is the day!",
      celebrationStarted: "The celebration has begun",
      venueLabel: "THE CELEBRATION WILL TAKE PLACE AT",
      venue: "Zoya Events Garden",
      venueAddress: "Irbid · Petra Street",
      venueDescription: "We would be delighted to celebrate this unforgettable evening with you.",
      directions: "Get Directions",
      calendar: "Add to Calendar",
      closing: "We look forward to celebrating with you",
      calendarTitle: "Ghayath & Rahma Wedding",
      calendarDescription: "You are invited to celebrate the wedding of Ghayath and Rahma.",
    },
    ar: {
      dir: "rtl",
      switchLabel: "English",
      together: "بمشاركة عائلتيهما",
      groom: "غياث",
      bride: "رحمة",
      welcomeLine1: "يتشرفان بدعوتكم لمشاركتهما",
      welcomeLine2: "فرحة الاحتفال بزفافهما",
      openInvitation: "فتح الدعوة",
      saveDate: "احفظوا الموعد",
      marriageHeading: "يحتفلان بزفافهما",
      invitation: "بقلوب مملوءة بالفرح، يسعدنا أن تشاركونا بداية فصل جديد من حياتنا.",
      day: "الثلاثاء",
      fullDate: "11 آب 2026",
      dateNumber: "11",
      monthYear: "آب 2026",
      time: "7:00 مساءً",
      timeNote: "يبدأ الحفل في الموعد المحدد",
      countdownTitle: "العد التنازلي لأمسيتنا المميزة",
      days: "يوم",
      hours: "ساعة",
      minutes: "دقيقة",
      seconds: "ثانية",
      weddingToday: "اليوم يوم فرحتنا!",
      celebrationStarted: "بدأت فرحتنا",
      venueLabel: "سيقام حفل الزفاف في",
      venue: "Zoya Events Garden",
      venueAddress: "إربد · شارع البتراء",
      venueDescription: "يسعدنا ويشرفنا أن نحتفل معكم في هذه الأمسية التي لا تُنسى.",
      directions: "الموقع",
      calendar: "إضافة إلى التقويم",
      closing: "بانتظار مشاركتكم فرحتنا",
      calendarTitle: "حفل زفاف غياث ورحمة",
      calendarDescription: "يسعدنا دعوتكم لمشاركة غياث ورحمة فرحة زفافهما.",
    },
  };

  const root = document.getElementById("root");
  let language = "en";
  let isOpened = false;
  let countdownTimer = null;

  const icons = {
    languages: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',
    calendar: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
    clock: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    sparkles: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/></svg>',
    pin: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    heart: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.3l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>',
  };

  function floral(position) {
    return `<div class="floral-cluster floral-cluster--${position}" aria-hidden="true">
      <span class="floral-branch floral-branch--one"></span>
      <span class="floral-branch floral-branch--two"></span>
      <span class="floral-leaf floral-leaf--navy floral-leaf--one"></span>
      <span class="floral-leaf floral-leaf--navy floral-leaf--two"></span>
      <span class="floral-leaf floral-leaf--gold floral-leaf--three"></span>
      <span class="floral-leaf floral-leaf--gold floral-leaf--four"></span>
      <span class="floral-leaf floral-leaf--cream floral-leaf--five"></span>
      <span class="floral-rose floral-rose--large"></span>
      <span class="floral-rose floral-rose--small"></span>
      <span class="floral-bud floral-bud--one"></span>
      <span class="floral-bud floral-bud--two"></span>
    </div>`;
  }

  function crown() {
    return '<div class="crown-ornament" aria-hidden="true"><span></span><i></i><span></span></div>';
  }

  function getTimeRemaining() {
    const difference = EVENT.date.getTime() - Date.now();
    if (difference <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      total: difference,
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  function countdownMarkup(text) {
    return `<section class="countdown-card" aria-live="polite">
      <div class="countdown-heading">${icons.clock}<span id="countdown-title">${text.countdownTitle}</span></div>
      <div class="countdown-grid" id="countdown-grid">
        ${[text.days, text.hours, text.minutes, text.seconds].map((label, index) => `<div class="countdown-unit"><strong id="countdown-${index}">00</strong><span>${label}</span></div>`).join("")}
      </div>
      <p class="countdown-finished" id="countdown-finished" hidden>${text.weddingToday}</p>
    </section>`;
  }

  function welcomeMarkup(text, isArabic) {
    return `<section class="welcome-section">
      <div class="welcome-panel invitation-arch">
        ${floral("top")}${floral("bottom")}${crown()}
        <div class="monogram" dir="ltr"><span>G</span><i>&amp;</i><span>R</span></div>
        <p class="welcome-kicker">${text.together}</p>
        <div class="welcome-names">
          <div class="welcome-name ${isArabic ? "welcome-name--arabic" : ""}" dir="${isArabic ? "rtl" : "ltr"}">${text.groom}</div>
          <div class="welcome-ampersand">&amp;</div>
          <div class="welcome-name ${isArabic ? "welcome-name--arabic" : ""}" dir="${isArabic ? "rtl" : "ltr"}">${text.bride}</div>
        </div>
        <div class="welcome-event-chip">${icons.calendar}<span>${text.fullDate}</span><i aria-hidden="true"></i>${icons.clock}<strong>${text.time}</strong></div>
        <p class="welcome-description">${text.welcomeLine1}<br>${text.welcomeLine2}</p>
        <button type="button" class="open-invitation-button" id="open-invitation">${icons.sparkles}<span>${text.openInvitation}</span></button>
      </div>
    </section>`;
  }

  function invitationMarkup(text, isArabic) {
    return `<section class="invitation-section">
      <article class="invitation-paper invitation-arch">
        ${floral("top")}${floral("bottom")}${crown()}
        <div class="paper-monogram" dir="ltr"><span></span><i>G&amp;R</i><span></span></div>
        <p class="section-kicker">${text.saveDate}</p>
        <header class="invitation-names">
          <div class="invitation-name ${isArabic ? "invitation-name--arabic" : ""}" dir="${isArabic ? "rtl" : "ltr"}">${text.groom}</div>
          <div class="invitation-ampersand">&amp;</div>
          <div class="invitation-name ${isArabic ? "invitation-name--arabic" : ""}" dir="${isArabic ? "rtl" : "ltr"}">${text.bride}</div>
        </header>
        <p class="marriage-heading">${text.marriageHeading}</p>
        <p class="invitation-description">${text.invitation}</p>
        <section class="event-moment" aria-label="${text.fullDate}, ${text.time}">
          <div class="event-moment-date"><span>${text.day}</span><strong>${text.dateNumber}</strong><small>${text.monthYear}</small></div>
          <div class="event-moment-time">${icons.clock}<div><strong>${text.time}</strong><span>${text.timeNote}</span></div></div>
        </section>
        ${countdownMarkup(text)}
        <div class="ornament-divider" aria-hidden="true"><span></span>${icons.heart}<span></span></div>
        <section class="venue-block">
          <p class="venue-label">${text.venueLabel}</p>
          <h2>${text.venue}</h2>
          <p class="venue-address">${icons.pin}<span>${text.venueAddress}</span></p>
          <p class="venue-description">${text.venueDescription}</p>
        </section>
        <div class="invitation-actions">
          <a href="${EVENT.locationUrl}" target="_blank" rel="noopener noreferrer" class="invitation-action invitation-action--primary">${icons.pin}<span>${text.directions}</span></a>
          <button type="button" class="invitation-action" id="add-calendar">${icons.calendar}<span>${text.calendar}</span></button>
        </div>
        <p class="closing-message">${text.closing}</p>
      </article>
    </section>`;
  }

  function updateCountdown() {
    const text = translations[language];
    const remaining = getTimeRemaining();
    const grid = document.getElementById("countdown-grid");
    const finished = document.getElementById("countdown-finished");
    const title = document.getElementById("countdown-title");
    if (!grid || !finished || !title) return;

    if (remaining.total <= 0) {
      grid.hidden = true;
      finished.hidden = false;
      title.textContent = text.celebrationStarted;
      return;
    }

    grid.hidden = false;
    finished.hidden = true;
    title.textContent = text.countdownTitle;
    [remaining.days, remaining.hours, remaining.minutes, remaining.seconds].forEach((value, index) => {
      const element = document.getElementById(`countdown-${index}`);
      if (element) element.textContent = String(value).padStart(2, "0");
    });
  }

  function addToCalendar() {
    const text = translations[language];
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: text.calendarTitle,
      dates: EVENT.calendarDates,
      details: text.calendarDescription,
      location: `${text.venue}, ${text.venueAddress}`,
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener,noreferrer");
  }

  function render() {
    if (countdownTimer) window.clearInterval(countdownTimer);
    const text = translations[language];
    const isArabic = language === "ar";
    document.documentElement.lang = language;
    document.documentElement.dir = text.dir;

    root.innerHTML = `<main class="wedding-site ${isArabic ? "wedding-site--arabic" : "wedding-site--english"}" lang="${language}" dir="${text.dir}">
      <button type="button" class="language-switch" id="language-switch" aria-label="${isArabic ? "Switch to English" : "التبديل إلى اللغة العربية"}">${icons.languages}<span>${text.switchLabel}</span></button>
      ${isOpened ? invitationMarkup(text, isArabic) : welcomeMarkup(text, isArabic)}
    </main>`;

    document.getElementById("language-switch")?.addEventListener("click", () => {
      language = language === "en" ? "ar" : "en";
      render();
    });

    document.getElementById("open-invitation")?.addEventListener("click", () => {
      isOpened = true;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("add-calendar")?.addEventListener("click", addToCalendar);

    if (isOpened) {
      updateCountdown();
      countdownTimer = window.setInterval(updateCountdown, 1000);
    }
  }

  render();
})();
