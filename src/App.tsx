import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, BedDouble, Check, ChevronDown, Compass, Heart,
  House, Landmark, Leaf, MapPin, Search, SlidersHorizontal, Sparkles, Star,
  Waves, X, Camera, Coffee, ShieldCheck, CalendarDays,
} from 'lucide-react';
import './index.css';

const SAVED_STAYS_STORAGE_KEY = 'stayfinder.saved-stays';

type Stay = {
  id: number; title: string; location: string; region: string; category: string;
  price: number; rating: number; reviews: number; image: string; badge: string;
  beds: number; guests: number; description: string; host: string; amenities: string[];
};

const stays: Stay[] = [
  { id: 1, title: 'The Osu Courtyard House', location: 'Osu, Accra', region: 'Ghana', category: 'City hideaways', price: 1850, rating: 4.98, reviews: 124, image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85', badge: 'Courtyard living', beds: 2, guests: 4, description: 'A city home built around a leafy courtyard, with a shaded veranda for a slow breakfast before a day out in Accra.', host: 'Akosua', amenities: ['Shaded courtyard', 'Kitchen', 'Fast WiFi', 'Air conditioning'] },
  { id: 2, title: 'The Jamestown Rooftop House', location: 'Jamestown, Accra', region: 'Ghana', category: 'Heritage homes', price: 1250, rating: 4.96, reviews: 88, image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85', badge: 'Coastal character', beds: 2, guests: 3, description: 'A bright, compact home near the old quarter, with open-air rooftop seating and views toward the working waterfront.', host: 'Kwame', amenities: ['Rooftop terrace', 'Kitchen', 'Fast WiFi', 'Walkable area'] },
  { id: 3, title: 'A Courtyard Stay in Kumasi', location: 'Ahodwo, Kumasi', region: 'Ghana', category: 'Design stays', price: 1200, rating: 4.93, reviews: 207, image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1200&q=85', badge: 'Made for gathering', beds: 3, guests: 5, description: 'A contemporary home gathered around an airy courtyard, with warm timber, local art and room to unwind after exploring the Ashanti capital.', host: 'Nana', amenities: ['Courtyard', 'Breakfast', 'Kitchen', 'Air conditioning'] },
  { id: 4, title: 'The Ridge House in Aburi', location: 'Aburi, Eastern Region', region: 'Ghana', category: 'Countryside', price: 1550, rating: 4.99, reviews: 63, image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1200&q=85', badge: 'Cool hillside air', beds: 2, guests: 4, description: 'A garden home on the ridge, with deep verandas and a quiet view over the green hills just beyond the city.', host: 'Esi', amenities: ['Garden', 'Veranda', 'Kitchen', 'Free parking'] },
  { id: 5, title: 'A Quiet Home in Labadi', location: 'Labadi, Accra', region: 'Ghana', category: 'Coastal', price: 1950, rating: 4.91, reviews: 92, image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85', badge: 'Near the coast', beds: 1, guests: 2, description: 'A light-filled Accra home with a sheltered garden terrace and easy access to the city’s shoreline and restaurants.', host: 'Mara', amenities: ['Coast nearby', 'Garden terrace', 'Kitchen', 'Fast WiFi'] },
  { id: 6, title: 'The Cape Coast Veranda Home', location: 'Cape Coast, Central Region', region: 'Ghana', category: 'Heritage homes', price: 1100, rating: 4.87, reviews: 171, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', badge: 'A slower stay', beds: 1, guests: 2, description: 'A welcoming guesthouse with a broad veranda and breezy central court, well placed for discovering Cape Coast and its history.', host: 'Abena', amenities: ['Veranda', 'Kitchen', 'Fast WiFi', 'Free parking'] },
  { id: 7, title: 'The Elmina Lagoon House', location: 'Elmina, Central Region', region: 'Ghana', category: 'Coastal', price: 1450, rating: 4.95, reviews: 75, image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85', badge: 'Lagoon-side days', beds: 2, guests: 4, description: 'A laid-back coastal stay with shaded outdoor space, fresh sea air and an easy pace beside the lagoon.', host: 'June', amenities: ['Lagoon nearby', 'Outdoor dining', 'Kitchen', 'Free parking'] },
  { id: 8, title: 'Ada Lagoon House', location: 'Ada Foah, Greater Accra', region: 'Ghana', category: 'Coastal', price: 1350, rating: 4.97, reviews: 58, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', badge: 'Made for the water', beds: 1, guests: 2, description: 'A breezy hideaway between river and sea. Spend the day on the water, then settle in on a private shaded terrace.', host: 'Eleni', amenities: ['Water nearby', 'Private terrace', 'Kitchen', 'Outdoor dining'] },
  { id: 9, title: 'The Bolgatanga Courtyard Lodge', location: 'Bolgatanga, Upper East Region', region: 'Ghana', category: 'Heritage homes', price: 1000, rating: 4.89, reviews: 106, image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85', badge: 'Northern hospitality', beds: 1, guests: 2, description: 'A small lodge centred on an open-air courtyard, with cool rooms and an introduction to the distinctive homes and craft traditions of northern Ghana.', host: 'Jules', amenities: ['Open courtyard', 'Kitchen', 'Fast WiFi', 'Local breakfast'] },
];

const categories = [
  { name: 'All stays', icon: Compass },
  { name: 'Coastal', icon: Waves },
  { name: 'Countryside', icon: Leaf },
  { name: 'Heritage homes', icon: Landmark },
  { name: 'City hideaways', icon: House },
  { name: 'Design stays', icon: Sparkles },
];
const formatGhs = (amount: number) => `GH₵${new Intl.NumberFormat('en-GH').format(amount)}`;

function Home() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2 guests');
  const [activeCategory, setActiveCategory] = useState('All stays');
  const [saved, setSaved] = useState<number[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState<Stay | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState('');
  const [maxPrice, setMaxPrice] = useState(3500);
  const [draftPrice, setDraftPrice] = useState(3500);
  const [minBeds, setMinBeds] = useState(0);
  const [draftBeds, setDraftBeds] = useState(0);
  const [selectedAmenity, setSelectedAmenity] = useState('');
  const [draftAmenity, setDraftAmenity] = useState('');
  const [bookingDone, setBookingDone] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  useEffect(() => {
    const savedStayIds = window.localStorage.getItem(SAVED_STAYS_STORAGE_KEY);
    if (!savedStayIds) {
      return;
    }

    try {
      const parsed = JSON.parse(savedStayIds) as number[];
      if (Array.isArray(parsed)) {
        setSaved(parsed);
      }
    } catch {
      window.localStorage.removeItem(SAVED_STAYS_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SAVED_STAYS_STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToast(''), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const resetSearchState = () => {
    setDestination('');
    setQuery('');
    setActiveCategory('All stays');
    setSavedOnly(false);
    setMaxPrice(3500);
    setMinBeds(0);
    setSelectedAmenity('');
    setDraftPrice(3500);
    setDraftBeds(0);
    setDraftAmenity('');
  };

  const results = useMemo(() => stays.filter((stay) => {
    const matchesSearch = !query || `${stay.title} ${stay.location} ${stay.region} ${stay.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'All stays' || stay.category === activeCategory;
    const guestCount = Number.parseInt(guests, 10) || 2;
    return matchesSearch && matchesCategory && stay.guests >= guestCount && (!savedOnly || saved.includes(stay.id)) && stay.price <= maxPrice &&
      stay.beds >= minBeds && (!selectedAmenity || stay.amenities.some((amenity) => amenity.toLowerCase().includes(selectedAmenity.toLowerCase())));
  }), [query, activeCategory, savedOnly, saved, maxPrice, minBeds, selectedAmenity, guests]);

  const notify = (message: string) => {
    setToast(message);
  };
  const toggleSaved = (id: number) => {
    const isSaved = saved.includes(id);
    setSaved((current) => isSaved ? current.filter((item) => item !== id) : [...current, id]);
    notify(isSaved ? 'Removed from your saved stays' : 'Saved for a daydream later');
  };
  const submitSearch = () => {
    setQuery(destination.trim());
    setSavedOnly(false);
    document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth' });
  };
  const openDetail = (stay: Stay) => { setDetail(stay); setBookingDone(false); };
  const toggleAmenity = (value: string) => setDraftAmenity((old) => old === value ? '' : value);

  return (
    <div className="page-shell">
      <header className="topbar">
        <a href="./" className="brand" aria-label="Stayfinder home" data-testid="link-home">
          <span className="brand-mark"><Compass size={18} strokeWidth={2.2} /></span>
          stayfinder
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a className="nav-link" href="#stays">Find a stay</a>
          <a className="nav-link" href="#field-notes">Field notes</a>
          <a className="nav-link" href="#about">Our point of view</a>
        </nav>
        <div className="nav-right">
          <button className="saved-pill" onClick={() => { setSavedOnly(!savedOnly); setActiveCategory('All stays'); document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth' }); }} data-testid="button-saved-stays">
            <Heart size={15} fill={savedOnly ? 'currentColor' : 'none'} /> {saved.length ? `Saved · ${saved.length}` : 'Saved stays'}
          </button>
          <div className="avatar-chip" title="Your trip journal">SF</div>
        </div>
      </header>

      <main>
        <section className="hero" aria-label="Discover your next stay">
          <img className="hero-image" src="https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=2200&q=90" alt="A distinctive home surrounded by forest" />
          <div className="hero-content">
            <div className="eyebrow">Places with a pulse</div>
            <h1>Go somewhere<br /><em>that stays</em> with you.</h1>
            <div className="hero-copy">Uncommon little homes, chosen for the feeling they leave behind. Find your kind of elsewhere.</div>
          </div>
          <div className="hero-note"><span /> A slower way to get away</div>
        </section>

        <div className="search-wrap">
          <div className="searchbar" role="search">
            <div className="search-field">
              <label htmlFor="destination"><MapPin size={13} /> Where to?</label>
              <input id="destination" value={destination} onChange={(event) => setDestination(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && submitSearch()} placeholder="Accra, Aburi, Cape Coast..." data-testid="input-destination" />
            </div>
            <div className="search-field">
              <label htmlFor="travel-dates"><CalendarDays size={13} /> When</label>
              <input id="travel-dates" value={dates} onChange={(event) => setDates(event.target.value)} placeholder="Add your dates" onFocus={(event) => { event.currentTarget.type = 'date'; }} data-testid="input-dates" />
            </div>
            <div className="search-field">
              <label htmlFor="guest-count"><BedDouble size={13} /> Who’s coming?</label>
              <select id="guest-count" value={guests} onChange={(event) => setGuests(event.target.value)} data-testid="select-guests">
                <option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option>
              </select>
            </div>
            <button className="search-submit" onClick={submitSearch} data-testid="button-search"><Search size={17} /> Find a stay</button>
          </div>
        </div>

        <section className="section" id="stays">
          <div className="section-head">
            <div><div className="section-kicker">A good place to begin</div><h2>What’s calling you?</h2><p>From coastal courtyards to cool ridge-top homes across Ghana.</p></div>
            <button className="text-link" onClick={() => { setActiveCategory('All stays'); setSavedOnly(false); setQuery(''); }}>See all stays <ArrowRight size={15} /></button>
          </div>
          <div className="category-row" aria-label="Browse by kind of stay">
            {categories.map(({ name, icon: Icon }) => <button key={name} className={`category-chip ${activeCategory === name ? 'active' : ''}`} onClick={() => { setActiveCategory(name); setSavedOnly(false); }} data-testid={`category-${name.toLowerCase().replaceAll(' ', '-')}`}><Icon size={15} />{name}</button>)}
          </div>
        </section>

        <section className="section listing-section">
          <div className="section-head">
            <div><div className="section-kicker">{savedOnly ? 'Your little shortlist' : query ? `Looking around ${query}` : 'Picked for the curious'}</div><h2>{savedOnly ? 'Saved for later' : query ? 'The good finds' : 'Stays worth the detour'}</h2><p>{results.length} sample stays · indicative prices in Ghanaian cedis · illustrative photos.</p></div>
            <div className="list-tools">
              <span className="result-count">{results.length} stays</span>
              <button className="filter-button" onClick={() => { setDraftPrice(maxPrice); setDraftBeds(minBeds); setDraftAmenity(selectedAmenity); setShowFilters(true); }} data-testid="button-filters"><SlidersHorizontal size={15} /> Filters <ChevronDown size={13} /></button>
            </div>
          </div>
          <div className="listing-grid">
            {results.map((stay, index) => <article className="listing-card" key={stay.id} onClick={() => openDetail(stay)} style={{ animationDelay: `${index * 55}ms` }} data-testid={`card-stay-${stay.id}`}>
              <div className="listing-photo-wrap">
                <img className="listing-photo" src={stay.image} alt={stay.title} loading="lazy" />
                <span className="listing-badge">{stay.badge}</span>
                <button className={`heart-btn ${saved.includes(stay.id) ? 'saved' : ''}`} aria-label={saved.includes(stay.id) ? 'Remove saved stay' : 'Save stay'} onClick={(event) => { event.stopPropagation(); toggleSaved(stay.id); }} data-testid={`button-save-${stay.id}`}><Heart size={18} fill={saved.includes(stay.id) ? 'currentColor' : 'none'} /></button>
                <span className="photo-count"><Camera size={12} /> 12</span>
              </div>
              <div className="listing-info">
                <div className="listing-topline"><div className="listing-title">{stay.title}</div><div className="rating"><Star size={12} /> {stay.rating}</div></div>
                <div className="listing-meta">{stay.location} · {stay.beds} {stay.beds === 1 ? 'bed' : 'beds'}</div>
                <div className="listing-price"><strong>{formatGhs(stay.price)}</strong> / night · <u>indicative</u></div>
              </div>
            </article>)}
            {!results.length && <div className="empty-state"><Compass size={25} /><strong>No stays on this particular path.</strong>Try a broader place, another kind of escape, or loosen your filters.<br /><button onClick={resetSearchState}>Clear the way</button></div>}
          </div>
        </section>

        <section className="editorial" id="field-notes">
          <div className="editorial-image" role="img" aria-label="A sunlit home surrounded by tropical greenery" />
          <div className="editorial-copy">
            <div className="section-kicker">A field note from Ghana</div>
            <h2>Leave room for<br />the long way round.</h2>
            <p>From an Accra courtyard to the cooler hills of Aburi, Ghana gives you a reason to slow down. Take the scenic road, linger over lunch, and stay one more night.</p>
            <button className="editorial-cta" onClick={() => { setDestination('Ghana'); setQuery('Ghana'); setActiveCategory('All stays'); setSavedOnly(false); document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore Ghana stays <ArrowDownRight size={15} /></button>
          </div>
        </section>

        <section className="benefits" id="about">
          <div className="benefit"><ShieldCheck className="benefit-icon" size={22} /><h3>Made to feel like Ghana.</h3><p>Discover homes and getaways inspired by the courtyards, verandas and architecture of Ghana’s regions.</p></div>
          <div className="benefit"><Coffee className="benefit-icon" size={22} /><h3>Room for local character.</h3><p>From a coastal guesthouse to a northern courtyard lodge, each sample stay has a sense of place.</p></div>
          <div className="benefit"><Leaf className="benefit-icon" size={22} /><h3>Take the longer road.</h3><p>Find a slower weekend by the lagoon, among the hills, or in the heart of the city.</p></div>
        </section>
        <section className="newsletter">
          <div><h2>A postcard, now and then.</h2><p>Thoughtful places, lovely detours. Nothing more than you asked for.</p></div>
          <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (newsletter.includes('@')) { setNewsletterDone(true); notify('You’re on the list. Watch your mailbox.'); } else notify('Add a valid email address to join.'); }}>
            <input type="email" value={newsletter} onChange={(event) => setNewsletter(event.target.value)} placeholder={newsletterDone ? 'You’re on the list' : 'Your email address'} aria-label="Email address" data-testid="input-newsletter" />
            <button type="submit" data-testid="button-newsletter">{newsletterDone ? 'Joined' : 'Count me in'}</button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <a href="./" className="brand"><span className="brand-mark"><Compass size={15} /></span> stayfinder</a>
        <span>Good places make good stories. © 2026 Stayfinder</span>
        <div className="footer-links"><button onClick={() => notify('Our privacy promise: your details stay yours.')}>Privacy</button><button onClick={() => notify('Demo experience — no reservations are transmitted.')}>How it works</button><button onClick={() => notify('Say hello: hello@stayfinder.example')}>Contact</button></div>
      </footer>

      {toast && <div className="toast-message" role="status"><Check size={15} />{toast}</div>}

      {detail && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setDetail(null); }}>
        <aside className="detail-panel" role="dialog" aria-modal="true" aria-label={`Details for ${detail.title}`}>
          <button className="detail-close" onClick={() => setDetail(null)} aria-label="Close listing details"><X size={19} /></button>
          <div className="detail-hero"><img src={detail.image} alt={detail.title} /></div>
          <div className="detail-body">
            <div className="detail-kicker">{detail.category} · {detail.badge}</div>
            <h2>{detail.title}</h2>
            <div className="detail-location"><MapPin size={14} />{detail.location}<span>·</span><Star size={13} fill="currentColor" /> {detail.rating} ({detail.reviews} stays)</div>
            <div className="detail-stats"><span>{detail.guests} guests</span><span>{detail.beds} bedrooms</span><span>1 bath</span><span>Hosted by {detail.host}</span></div>
            <p className="detail-description">{detail.description}</p>
            <div className="host-row"><div className="host-avatar">{detail.host.slice(0, 1)}</div><div><strong>A thoughtful host: {detail.host}</strong><span>Here to help make your stay feel like yours</span></div></div>
            <strong style={{ fontSize: 12, color: '#30483d' }}>The good-to-know bits</strong>
            <div className="amenities">{detail.amenities.map((amenity) => <span className="amenity" key={amenity}>{amenity}</span>)}</div>
            <div className="booking-box">
              <div className="booking-price"><strong>{formatGhs(detail.price)}</strong> / night <span>· indicative</span></div>
              <div className="booking-fields">
                <label>Arrive<input aria-label="Arrival date" type="date" /></label>
                <label>Leave<input aria-label="Departure date" type="date" /></label>
              </div>
              <button className="book-button" onClick={() => setBookingDone(true)} data-testid="button-demo-book">Check availability</button>
              {bookingDone && <div className="booking-confirm" role="status"><strong>Lovely choice.</strong> This is a demo, so no reservation or payment has been made. In a real booking, your host would confirm availability next.</div>}
              <p className="demo-note">Demo booking only — no payment is collected and no reservation is made.</p>
            </div>
          </div>
        </aside>
      </div>}

      {showFilters && <div className="filter-pop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowFilters(false); }}>
        <div className="filter-modal" role="dialog" aria-modal="true" aria-label="Filter stays">
          <div className="filter-head"><h3>Make it your kind of stay</h3><button onClick={() => setShowFilters(false)} aria-label="Close filters"><X size={19} /></button></div>
          <div className="filter-block"><h4>Nightly budget <span style={{ color: '#bd563b' }}>— up to {formatGhs(draftPrice)}</span></h4><input className="price-range" type="range" min="400" max="3500" step="100" value={draftPrice} onChange={(event) => setDraftPrice(Number(event.target.value))} aria-label="Maximum nightly budget" /></div>
          <div className="filter-block"><h4>Bedrooms</h4><div className="filter-checks">
            {[0, 1, 2, 3].map((value) => <button key={value} className={draftBeds === value ? 'selected' : ''} onClick={() => setDraftBeds(value)}>{value === 0 ? 'Any' : `${value}+`}</button>)}
          </div></div>
          <div className="filter-block"><h4>Little things that matter</h4><div className="filter-checks">
            {['Kitchen', 'Coast', 'Courtyard', 'WiFi'].map((item) => <button key={item} className={draftAmenity === item ? 'selected' : ''} onClick={() => toggleAmenity(item)}>{item}</button>)}
          </div></div>
          <div className="filter-actions"><button onClick={() => { setDraftPrice(3500); setDraftBeds(0); setDraftAmenity(''); }}>Clear all</button><button className="apply" onClick={() => { setMaxPrice(draftPrice); setMinBeds(draftBeds); setSelectedAmenity(draftAmenity); setShowFilters(false); }}>Show stays <ArrowRight size={14} style={{ verticalAlign: 'middle', marginLeft: 5 }} /></button></div>
        </div>
      </div>}
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;