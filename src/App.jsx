import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Heart,
  Languages,
  MapPin,
  Sparkles,
} from "lucide-react";
import "./App.css";

const WEDDING_DATE = new Date("2026-08-15T19:00:00+03:00");

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
    invitation:
      "With joyful hearts, we invite you to share the beginning of our new chapter.",
    day: "Saturday",
    fullDate: "15 August 2026",
    month: "August",
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
    venue: "Huson Hills",
    venueDescription:
      "We would be delighted to celebrate this unforgettable evening with you.",
    directions: "Get Directions",
    calendar: "Add to Calendar",
    closing: "We look forward to celebrating with you",
    calendarTitle: "Ghayath & Rahma Wedding",
    calendarDescription:
      "You are invited to celebrate the wedding of Ghayath and Rahma.",
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
    invitation:
      "بقلوب مملوءة بالفرح، يسعدنا أن تشاركونا بداية فصل جديد من حياتنا.",
    day: "السبت",
    fullDate: "15 آب 2026",
    month: "آب",
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
    venue: "الحصن هيلز",
    venueDescription:
      "يسعدنا ويشرفنا أن نحتفل معكم في هذه الأمسية التي لا تُنسى.",
    directions: "الموقع",
    calendar: "إضافة إلى التقويم",
    closing: "بانتظار مشاركتكم فرحتنا",
    calendarTitle: "حفل زفاف غياث ورحمة",
    calendarDescription:
      "يسعدنا دعوتكم لمشاركة غياث ورحمة فرحة زفافهما.",
  },
};

function getTimeRemaining() {
  const difference = WEDDING_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function WeddingName({ children, isArabic, variant }) {
  return (
    <div
      className={`${variant}-name ${isArabic ? `${variant}-name--arabic` : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {children}
    </div>
  );
}

function Countdown({ text }) {
  const [remaining, setRemaining] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = useMemo(
    () => [
      { value: remaining.days, label: text.days },
      { value: remaining.hours, label: text.hours },
      { value: remaining.minutes, label: text.minutes },
      { value: remaining.seconds, label: text.seconds },
    ],
    [remaining, text]
  );

  return (
    <motion.section
      className="countdown-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65 }}
      aria-live="polite"
    >
      <div className="countdown-heading">
        <Clock3 size={20} aria-hidden="true" />
        <span>
          {remaining.total > 0 ? text.countdownTitle : text.celebrationStarted}
        </span>
      </div>

      {remaining.total > 0 ? (
        <div className="countdown-grid">
          {units.map((unit) => (
            <div className="countdown-unit" key={unit.label}>
              <strong>{String(unit.value).padStart(2, "0")}</strong>
              <span>{unit.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="countdown-finished">{text.weddingToday}</p>
      )}
    </motion.section>
  );
}

function App() {
  const [language, setLanguage] = useState("en");
  const [isOpened, setIsOpened] = useState(false);

  const text = translations[language];
  const isArabic = language === "ar";
  const locationUrl = "https://maps.app.goo.gl/q65BfzAxQ2MuegHN6";

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "ar" : "en"
    );
  };

  const openInvitation = () => {
    setIsOpened(true);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const addToCalendar = () => {
    const title = encodeURIComponent(text.calendarTitle);
    const description = encodeURIComponent(text.calendarDescription);
    const location = encodeURIComponent(text.venue);
    const dates = "20260815T160000Z/20260815T200000Z";

    const calendarUrl =
      "https://calendar.google.com/calendar/render" +
      "?action=TEMPLATE" +
      `&text=${title}` +
      `&dates=${dates}` +
      `&details=${description}` +
      `&location=${location}`;

    window.open(calendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main
      className={`wedding-site ${
        isArabic ? "wedding-site--arabic" : "wedding-site--english"
      }`}
      lang={language}
      dir={text.dir}
    >
      <button
        type="button"
        className="language-switch"
        onClick={toggleLanguage}
        aria-label={isArabic ? "Switch to English" : "التبديل إلى اللغة العربية"}
      >
        <Languages size={18} />
        <span>{text.switchLabel}</span>
      </button>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.section
            key={`welcome-${language}`}
            className="welcome-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.65 }}
          >
            <div className="background-glow background-glow--one" />
            <div className="background-glow background-glow--two" />

            <motion.div
              className="welcome-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <span className="frame-corner frame-corner--tl" />
              <span className="frame-corner frame-corner--tr" />
              <span className="frame-corner frame-corner--bl" />
              <span className="frame-corner frame-corner--br" />

              <motion.div
                className="monogram"
                dir="ltr"
                animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>G</span>
                <i>&amp;</i>
                <span>R</span>
              </motion.div>

              <p className="welcome-kicker">{text.together}</p>

              <div className="welcome-names">
                <WeddingName isArabic={isArabic} variant="welcome">
                  {text.groom}
                </WeddingName>
                <div className="welcome-ampersand">&amp;</div>
                <WeddingName isArabic={isArabic} variant="welcome">
                  {text.bride}
                </WeddingName>
              </div>

              <div className="welcome-event-chip">
                <CalendarDays size={17} />
                <span>{text.fullDate}</span>
                <i aria-hidden="true" />
                <Clock3 size={17} />
                <strong>{text.time}</strong>
              </div>

              <p className="welcome-description">
                {text.welcomeLine1}
                <br />
                {text.welcomeLine2}
              </p>

              <motion.button
                type="button"
                className="open-invitation-button"
                onClick={openInvitation}
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={18} />
                <span>{text.openInvitation}</span>
              </motion.button>
            </motion.div>
          </motion.section>
        ) : (
          <motion.section
            key={`invitation-${language}`}
            className="invitation-section"
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <article className="invitation-paper">
              <div className="botanical botanical--top" aria-hidden="true">
                <span className="botanical-stem" />
                <span className="botanical-leaf botanical-leaf--1" />
                <span className="botanical-leaf botanical-leaf--2" />
                <span className="botanical-leaf botanical-leaf--3" />
                <span className="botanical-leaf botanical-leaf--4" />
              </div>

              <div className="botanical botanical--bottom" aria-hidden="true">
                <span className="botanical-stem" />
                <span className="botanical-leaf botanical-leaf--1" />
                <span className="botanical-leaf botanical-leaf--2" />
                <span className="botanical-leaf botanical-leaf--3" />
                <span className="botanical-leaf botanical-leaf--4" />
              </div>

              <div className="paper-monogram" dir="ltr">
                <span />
                <i>G&amp;R</i>
                <span />
              </div>

              <p className="section-kicker">{text.saveDate}</p>

              <header className="invitation-names">
                <WeddingName isArabic={isArabic} variant="invitation">
                  {text.groom}
                </WeddingName>
                <div className="invitation-ampersand">&amp;</div>
                <WeddingName isArabic={isArabic} variant="invitation">
                  {text.bride}
                </WeddingName>
              </header>

              <p className="marriage-heading">{text.marriageHeading}</p>
              <p className="invitation-description">{text.invitation}</p>

              <section className="event-moment" aria-label={`${text.fullDate}, ${text.time}`}>
                <div className="event-moment-date">
                  <span>{text.day}</span>
                  <strong>15</strong>
                  <small>{text.month} 2026</small>
                </div>

                <motion.div
                  className="event-moment-time"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(184,155,99,0)",
                      "0 0 0 10px rgba(184,155,99,0.10)",
                      "0 0 0 0 rgba(184,155,99,0)",
                    ],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Clock3 size={25} />
                  <div>
                    <strong>{text.time}</strong>
                    <span>{text.timeNote}</span>
                  </div>
                </motion.div>
              </section>

              <Countdown text={text} />

              <div className="ornament-divider" aria-hidden="true">
                <span />
                <Heart size={16} fill="currentColor" />
                <span />
              </div>

              <section className="venue-block">
                <p className="venue-label">{text.venueLabel}</p>
                <h2>{text.venue}</h2>
                <p>{text.venueDescription}</p>
              </section>

              <div className="invitation-actions">
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="invitation-action invitation-action--primary"
                >
                  <MapPin size={21} />
                  <span>{text.directions}</span>
                </a>

                <button
                  type="button"
                  className="invitation-action"
                  onClick={addToCalendar}
                >
                  <CalendarDays size={21} />
                  <span>{text.calendar}</span>
                </button>
              </div>

              <p className="closing-message">{text.closing}</p>
            </article>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;