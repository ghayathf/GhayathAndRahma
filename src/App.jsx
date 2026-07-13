import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Languages,
  MapPin,
  Sparkles,
} from "lucide-react";
import "./App.css";

const translations = {
  en: {
    dir: "ltr",
    switchLabel: "العربية",
    together: "TOGETHER WITH THEIR FAMILIES",
    groom: "Ghayath",
    bride: "Rahma",
    welcomeLine1: "Request the pleasure of your company",
    welcomeLine2: "at the celebration of their wedding",
    openInvitation: "Open Invitation",
    saveDate: "SAVE THE DATE",
    marriageHeading: "ARE GETTING MARRIED",
    invitation:
      "With joyful hearts, we invite you to share in the beginning of our new chapter.",
    day: "Saturday",
    month: "August",
    time: "7:00 PM",
    venueLabel: "THE CELEBRATION WILL TAKE PLACE AT",
    venue: "Huson Hills",
    venueDescription:
      "We would be delighted to celebrate this special evening with you.",
    directions: "Directions",
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
    month: "آب",
    time: "الساعة 7:00 مساءً",
    venueLabel: "سيقام حفل الزفاف في",
    venue: "حصن هيلز",
    venueDescription:
      "يسعدنا ويشرفنا أن نحتفل معكم في هذه الأمسية المميزة.",
    directions: "الموقع",
    calendar: "إضافة إلى التقويم",
    closing: "بانتظار مشاركتكم فرحتنا",
    calendarTitle: "حفل زفاف غياث ورحمة",
    calendarDescription:
      "يسعدنا دعوتكم لمشاركة غياث ورحمة فرحة زفافهما.",
  },
};

function WeddingName({ children, isArabic, variant }) {
  return (
    <div
      className={`${variant}-name ${
        isArabic ? `${variant}-name--arabic` : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {children}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState("en");
  const [isOpened, setIsOpened] = useState(false);

  const text = translations[language];
  const isArabic = language === "ar";

  const locationUrl =
    "https://maps.app.goo.gl/q65BfzAxQ2MuegHN6";

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "ar" : "en"
    );
  };

  const addToCalendar = () => {
    const title = encodeURIComponent(text.calendarTitle);
    const description = encodeURIComponent(text.calendarDescription);
    const location = encodeURIComponent(text.venue);

    const dates =
      "20260815T160000Z/20260815T200000Z";

    const calendarUrl =
      "https://calendar.google.com/calendar/render" +
      "?action=TEMPLATE" +
      `&text=${title}` +
      `&dates=${dates}` +
      `&details=${description}` +
      `&location=${location}`;

    window.open(
      calendarUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main
      className={`wedding-site ${
        isArabic
          ? "wedding-site--arabic"
          : "wedding-site--english"
      }`}
      lang={language}
      dir={text.dir}
    >
      <button
        type="button"
        className="language-switch"
        onClick={toggleLanguage}
        aria-label={
          isArabic
            ? "Switch to English"
            : "التبديل إلى اللغة العربية"
        }
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
            exit={{
              opacity: 0,
              scale: 1.04,
            }}
            transition={{ duration: 0.7 }}
          >
            <div className="background-glow background-glow--one" />
            <div className="background-glow background-glow--two" />

            <motion.div
              className="welcome-panel"
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
            >
              <span className="frame-corner frame-corner--tl" />
              <span className="frame-corner frame-corner--tr" />
              <span className="frame-corner frame-corner--bl" />
              <span className="frame-corner frame-corner--br" />

              <div className="monogram" dir="ltr">
                <span>G</span>
                <i>&amp;</i>
                <span>R</span>
              </div>

              <p className="welcome-kicker">
                {text.together}
              </p>

              <div className="welcome-names">
                <WeddingName
                  isArabic={isArabic}
                  variant="welcome"
                >
                  {text.groom}
                </WeddingName>

                <div className="welcome-ampersand">
                  &amp;
                </div>

                <WeddingName
                  isArabic={isArabic}
                  variant="welcome"
                >
                  {text.bride}
                </WeddingName>
              </div>

              <p className="welcome-description">
                {text.welcomeLine1}
                <br />
                {text.welcomeLine2}
              </p>

              <motion.button
                type="button"
                className="open-invitation-button"
                onClick={() => setIsOpened(true)}
                whileHover={{ scale: 1.04 }}
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
            initial={{
              opacity: 0,
              y: 55,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            <article className="invitation-paper">
              <div className="botanical botanical--top">
                <span className="botanical-stem" />
                <span className="botanical-leaf botanical-leaf--1" />
                <span className="botanical-leaf botanical-leaf--2" />
                <span className="botanical-leaf botanical-leaf--3" />
                <span className="botanical-leaf botanical-leaf--4" />
              </div>

              <div className="botanical botanical--bottom">
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

              <p className="section-kicker">
                {text.saveDate}
              </p>

              <header className="invitation-names">
                <WeddingName
                  isArabic={isArabic}
                  variant="invitation"
                >
                  {text.groom}
                </WeddingName>

                <div className="invitation-ampersand">
                  &amp;
                </div>

                <WeddingName
                  isArabic={isArabic}
                  variant="invitation"
                >
                  {text.bride}
                </WeddingName>
              </header>

              <p className="marriage-heading">
                {text.marriageHeading}
              </p>

              <p className="invitation-description">
                {text.invitation}
              </p>

              <section className="date-grid">
                <div className="date-side">
                  <span>{text.day}</span>
                </div>

                <div className="date-main">
                  <strong>15</strong>
                  <span>{text.month}</span>
                  <small>2026</small>
                </div>

                <div className="date-side">
                  <span>{text.time}</span>
                </div>
              </section>

              <div className="ornament-divider">
                <span />
                <i />
                <span />
              </div>

              <section className="venue-block">
                <p className="venue-label">
                  {text.venueLabel}
                </p>

                <h2>{text.venue}</h2>

                <p>{text.venueDescription}</p>
              </section>

              <div className="invitation-actions">
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="invitation-action"
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

              <p className="closing-message">
                {text.closing}
              </p>
            </article>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;