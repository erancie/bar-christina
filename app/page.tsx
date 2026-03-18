"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "Hidden in plain sight - a simple formula that works brilliantly.",
    author: "Lachlan F. · Local Guide",
  },
  {
    quote:
      "A beautiful, welcoming space that feels intimate and familiar from the moment you walk in.",
    author: "Madeleine B.",
  },
  {
    quote:
      "Sophisticated venue with the atmosphere of your friendly local neighbourhood bar.",
    author: "Jade H.",
  },
  {
    quote: "Exactly what the neighbourhood needed. Perfectly stylish.",
    author: "Andrew W. · Local Guide",
  },
];

const heroImageNumbers = [3, 5, 8, 11];

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorXRef = useRef(0);
  const cursorYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cursorXRef.current = event.clientX;
      cursorYRef.current = event.clientY;
      rafRef.current = requestAnimationFrame(() => {
        if (!cursorRef.current) return;
        cursorRef.current.style.transform = `translate3d(${cursorXRef.current}px, ${cursorYRef.current}px, 0)`;
      });
    };

    const interactiveNodes = document.querySelectorAll<HTMLElement>("a, button");
    const onEnter = () => {
      if (!cursorRef.current) return;
      cursorRef.current.classList.add("is-hover");
    };
    const onLeave = () => {
      if (!cursorRef.current) return;
      cursorRef.current.classList.remove("is-hover");
    };

    interactiveNodes.forEach((node) => {
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      interactiveNodes.forEach((node) => {
        node.removeEventListener("mouseenter", onEnter);
        node.removeEventListener("mouseleave", onLeave);
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) => (currentIndex + 1) % heroImageNumbers.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div id="cursor" ref={cursorRef} />

      <nav className={`siteNav ${navScrolled ? "is-scrolled" : ""}`}>
        <a className="navLogo" href="#home">Bar Christina</a>
        <div className="navLinks">
          <a href="#reservations">Reservations</a>
          <a href="#functions">Functions</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="heroImgPlaceholder" aria-hidden="true">
            {heroImageNumbers.map((imageNumber, index) => (
              <div
                key={imageNumber}
                className={`heroSlide ${index === activeHeroIndex ? "is-active" : ""}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(10, 9, 6, 0.35), rgba(10, 9, 6, 0.35)), url("/images/${imageNumber}.jpg")`,
                }}
              />
            ))}
          </div>
          <div className="heroBg" />
          <div className="heroInner">
            <p className="heroEyebrow">663 High Street - Kew East</p>
            <h1 className="heroTitle">Bar<br />Christina</h1>
            <p className="heroSub">A neighbourhood bar done beautifully</p>
            <div className="heroActions">
              <a href="#reservations" className="btnOutline">Reserve a Table</a>
              <a href="#functions" className="btnGold">Host an Event</a>
            </div>
          </div>

          <div className="marqueeWrap">
            <div className="marqueeTrack">
              <span>
                663 HIGH STREET<span className="sep">◆</span>KEW EAST, MELBOURNE
                <span className="sep">◆</span>WED-THU 4PM-9PM
                <span className="sep">◆</span>FRI-SAT 1PM-10:30PM
                <span className="sep">◆</span>SUN 3PM-7PM
                <span className="sep">◆</span>0423 481 755
                <span className="sep">◆</span>@BAR_CHRISTINA_
                <span className="sep">◆</span>
              </span>
              <span>
                663 HIGH STREET<span className="sep">◆</span>KEW EAST, MELBOURNE
                <span className="sep">◆</span>WED-THU 4PM-9PM
                <span className="sep">◆</span>FRI-SAT 1PM-10:30PM
                <span className="sep">◆</span>SUN 3PM-7PM
                <span className="sep">◆</span>0423 481 755
                <span className="sep">◆</span>@BAR_CHRISTINA_
                <span className="sep">◆</span>
              </span>
            </div>
          </div>
        </section>

        <section className="about sectionWrap" id="about">
          <div className="aboutInner">
            <div className="aboutImageCol reveal">
              <div className="aboutImg" />
              <div className="aboutImgFloat" />
            </div>
            <div className="aboutText">
              <div className="sectionLabel reveal">Our Story</div>
              <div className="goldRule reveal reveal-delay-1" />
              <h2 className="aboutTitle reveal reveal-delay-1">
                Made for this street.
                <br />
                <em>Made for this neighbourhood.</em>
              </h2>
              <p className="aboutBody reveal reveal-delay-2">
                Bar Christina is exactly what Kew East needed - a beautiful,
                welcoming space that feels intimate and familiar from the moment
                you walk in. Born from a genuine love of community, great wine,
                and the pleasure of a well-made cocktail.
              </p>
              <p className="aboutBody reveal reveal-delay-2">
                Step inside to find cosy candlelit tables, a thoughtfully curated
                wine list, and warm hospitality. Or settle into our sunny
                courtyard - dog-friendly, sun-dappled, and entirely unhurried.
              </p>
              <a className="sisterLink reveal reveal-delay-3" href="#contact">
                Sister venue to Westbrook →
              </a>
            </div>
          </div>
        </section>

        <section className="offer sectionWrap" id="offer">
          <div className="offerInner">
            <div className="offerHeader reveal">
              <div>
                <div className="sectionLabel">What We Offer</div>
                <h2 className="offerTitle">The full experience</h2>
              </div>
            </div>
            <div className="offerCards">
              <article className="offerCard reveal">
                <div className="offerNum">01</div>
                <h3 className="offerCardTitle">The Drinks</h3>
                <p className="offerCardBody">
                  An extensive, <strong>hand-curated wine list</strong> spanning
                  classic and natural. Craft cocktails — the Tommy&apos;s Margarita
                  is a standout. <strong>Japanese beer on tap</strong> alongside
                  rotating local brews.
                </p>
              </article>
              <article className="offerCard reveal reveal-delay-1">
                <div className="offerNum">02</div>
                <h3 className="offerCardTitle">The Food</h3>
                <p className="offerCardBody">
                  Snacks done right — <strong>roasted peppers and ricotta</strong>,
                  grazing boards stacked generously, and bar bites made for
                  lingering. Plus the option to order directly from{" "}
                  <strong>DiPalmas</strong> across the road when the mood calls
                  for pizza.
                </p>
              </article>
              <article className="offerCard reveal reveal-delay-2">
                <div className="offerNum">03</div>
                <h3 className="offerCardTitle">The Space</h3>
                <p className="offerCardBody">
                  A warm, intimate interior with{" "}
                  <strong>beautiful ambient lighting</strong>, and a sunny
                  courtyard garden that&apos;s become a neighbourhood favourite.
                  Dog-friendly. Walk-in welcome. <strong>Groups of six or more</strong>{" "}
                  can book ahead.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="reservations" className="sectionWrap">
          <div className="reservations">
            <div>
              <div className="sectionLabel reveal">Book a Table</div>
              <h2 className="resTitle reveal reveal-delay-1">
                Join
                <br />
                Us.
              </h2>
              <p className="resSub reveal reveal-delay-2">
                We take bookings for groups of six or more. Smaller party? Walk in
                and we will always do our best to find you a spot.
              </p>
              <a href="tel:0423481755" className="resPhone reveal reveal-delay-2">
                0423 481 755
              </a>
              <a href="tel:0423481755" className="btnGold reveal reveal-delay-3">
                Call to Book
              </a>
            </div>
            <div className="resRight reveal reveal-delay-1">
              <p className="resNote">Current Opening Hours</p>
              <div className="hoursRow">
                <span className="day">Wednesday - Thursday</span>
                <span className="time">4:00 pm - 9:00 pm</span>
              </div>
              <div className="hoursRow">
                <span className="day">Friday - Saturday</span>
                <span className="time">1:00 pm - 10:30 pm</span>
              </div>
              <div className="hoursRow noBorder">
                <span className="day">Sunday</span>
                <span className="time">3:00 pm - 7:00 pm</span>
              </div>
            </div>
          </div>
        </section>

        <section id="functions" className="events sectionWrap">
          <div className="eventsInner">
            <div className="sectionLabel reveal">Private Functions</div>
            <div className="eventsHeroImg reveal reveal-delay-1">
              <h2 className="eventsHeroHeadline">
                Your Occasion,
                <br />
                Our Stage.
              </h2>
            </div>
            <div className="eventsGrid">
              <div>
                <div className="sectionLabel reveal">Capacity</div>
                <div className="statBlock">
                  <div className="statRow reveal reveal-delay-1">
                    <span className="statNum">30</span>
                    <span className="statLabel">Indoor - Seated</span>
                  </div>
                  <div className="statRow reveal reveal-delay-1">
                    <span className="statNum">50</span>
                    <span className="statLabel">Indoor - Cocktail Style</span>
                  </div>
                  <div className="statRow reveal reveal-delay-2">
                    <span className="statNum">50</span>
                    <span className="statLabel">Courtyard - Seated</span>
                  </div>
                  <div className="statRow full reveal reveal-delay-2">
                    <span className="statNum fullVenue">
                      Full
                      <br />
                      Venue
                    </span>
                    <span className="statLabel">
                      Exclusive hire available
                      <br />
                      <span className="statSub">Minimum spend applies</span>
                    </span>
                  </div>
                </div>
                <div className="drinkPackages reveal">
                  <div className="sectionLabel">Drink Packages</div>
                  <div className="drinkTiers">
                    <div className="drinkTier">
                      <p className="tierDuration">2 Hours</p>
                      <p className="tierPrice">
                        <sup>$</sup>49
                      </p>
                      <p className="tierPp">per person</p>
                    </div>
                    <div className="drinkTier featured">
                      <p className="tierDuration">3 Hours</p>
                      <p className="tierPrice">
                        <sup>$</sup>65
                      </p>
                      <p className="tierPp">per person</p>
                    </div>
                    <div className="drinkTier">
                      <p className="tierDuration">4 Hours</p>
                      <p className="tierPrice">
                        <sup>$</sup>75
                      </p>
                      <p className="tierPp">per person</p>
                    </div>
                  </div>
                  <p className="drinkNote">
                    Includes 2 whites, 2 reds, sparkling, rose, Orion on tap,
                    Peroni Red
                    <br />
                    Add arrival cocktail +$10pp. Dedicated waiter. 5% service
                    charge applies.
                  </p>
                </div>
              </div>
              <div>
                <div className="sectionLabel reveal">Catering Menu</div>
                <div className="menuSection reveal reveal-delay-1">
                  <h3 className="menuCategory">Grazing & Sharing</h3>
                  <div className="menuItem">
                    <span>Giant Grazing & Charcuterie Board</span>
                    <span className="price">$30 pp</span>
                  </div>
                  <div className="menuItem">
                    <span>Make-Your-Own Bagel Station</span>
                    <span className="price">On request</span>
                  </div>
                  <div className="menuItem">
                    <span>BBQ / Slow Cooked Spit</span>
                    <span className="price">On request</span>
                  </div>
                </div>
                <div className="menuSection reveal reveal-delay-2">
                  <h3 className="menuCategory">Canapes</h3>
                  <div className="menuItem">
                    <span>Choose 5</span>
                    <span className="price">$40 pp</span>
                  </div>
                  <div className="menuItem">
                    <span>Choose 6</span>
                    <span className="price">$50 pp</span>
                  </div>
                  <p className="menuFine">
                    Oysters, baby burrata toast, arancini, polenta chips, mini
                    beef sliders, mini lobster rolls, chicken bao, and more.
                  </p>
                </div>
                <div className="reveal reveal-delay-3" style={{ marginTop: "52px" }}>
                  <a href="#contact" className="btnGold">Enquire About Your Event</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sectionWrap" id="testimonials">
          <div className="testimonials">
            <div className="testimonialsHeader">
              <div className="sectionLabel reveal">What People Say</div>
            </div>
            <div className="quoteGrid">
              {testimonials.map((item, index) => (
                <figure
                  key={item.author}
                  className={`quoteItem reveal ${index % 2 === 1 ? "offset" : ""}`}
                >
                  <div className="quoteMark">&quot;</div>
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>{item.author}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="findUs sectionWrap">
          <div className="findUsInner">
            <div className="mapPlaceholder reveal" />
            <div className="contactBlock">
              <div className="sectionLabel reveal">Find Us</div>
              <div className="contactSection reveal reveal-delay-1">
                <p className="contactSectionLabel">Address</p>
                <p className="contactValue">
                  663 High Street
                  <br />
                  Kew East, Victoria 3102
                </p>
              </div>
              <div className="contactSection reveal reveal-delay-1">
                <p className="contactSectionLabel">Phone</p>
                <p className="contactValue">
                  <a href="tel:0423481755">0423 481 755</a>
                </p>
              </div>
              <div className="contactSection reveal reveal-delay-2">
                <p className="contactSectionLabel">Hours</p>
                <p className="contactValue">
                  Wed-Thu 4:00 pm-9:00 pm
                  <br />
                  Fri-Sat 1:00 pm-10:30 pm
                  <br />
                  Sunday 3:00 pm-7:00 pm
                </p>
              </div>
              <div className="contactSection reveal reveal-delay-2 noBorder">
                <p className="contactSectionLabel">Follow</p>
                <p className="contactValue">
                  <a href="https://instagram.com/bar_christina_" target="_blank" rel="noreferrer">
                    @bar_christina_
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <span className="footerLogo">Bar Christina</span>
        <a href="https://instagram.com/bar_christina_" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <span className="footerCopy">© Bar Christina 2025 · Kew East</span>
      </footer>
    </div>
  );
}
