import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

const SAMPLE_HOTELS = [
  { id: 1, name: "Red Planet Davao", location: "Davao City", price: 1634, stars: 4.1 },
  { id: 2, name: "Acacia Hotel Davao", location: "Davao City", price: 4143, stars: 4.4 },
  { id: 3, name: "Aeon SUITES Staycation", location: "Davao City", price: 3219, stars: 3.7 },
  { id: 4, name: "Hotel Galleria", location: "Davao City", price: 1033, stars: 3.6 },
  { id: 5, name: "Davao Royal Suites and Residences", location: "Davao City", price: 897, stars: 3.9 },
  { id: 6, name: "Crown Regency Residences Davao", location: "Davao City", price: 934, stars: 3.5 },
  { id: 7, name: "Da West Inn Garden", location: "Davao City", price: 1188, stars: 3.1 },
  { id: 8, name: "Star Hotel", location: "Davao City", price: 985, stars: 4.0 },
  { id: 9, name: "GV Hotel Davao", location: "Davao City", price: 738, stars: 3.6 },
  { id: 10, name: "Kampotel Davao", location: "Davao City", price: 739, stars: 4.3 },
  { id: 11, name: "Orchard Hotel", location: "Davao City", price: 991, stars: 3.7 },
  { id: 12, name: "Pacific Palm Suites", location: "Davao City", price: 1987, stars: 3.8 },
  { id: 13, name: "RedDoorz near Robinsons Cybergate Davao", location: "Davao City", price: 1021, stars: 3.5 },
  { id: 14, name: "Central District Hotel", location: "Davao City", price: 1140, stars: 4.0 },
  { id: 15, name: "Daylight Inn Davao", location: "Davao City", price: 423, stars: 3.4 },
  { id: 16, name: "RedDoorz near G Mall Bajada Davao", location: "Davao City", price: 1022, stars: 3.8 },
  { id: 17, name: "Hotel Sogo Davao", location: "Davao City", price: 876, stars: 4.3 },
  { id: 18, name: "Traveler's Inn Bajada", location: "Davao City", price: 840, stars: 4.0 },
  { id: 19, name: "RedDoorz @ Traveler Inn Matina", location: "Davao City", price: 1191, stars: 2.0 },
  { id: 20, name: "Seda Abreeza", location: "Davao City", price: 6370, stars: 4.4 },
  { id: 21, name: "The Royal Mandaya Hotel", location: "Davao City", price: 3033, stars: 4.3 },
  { id: 22, name: "Casa Maria", location: "Davao City", price: 2461, stars: 4.0 },
  { id: 23, name: "RedDoorz Plus near SM Lanang Davao", location: "Davao City", price: 1130, stars: 3.7 },
  { id: 24, name: "Aikiko House", location: "Davao City", price: 891, stars: 4.2 },
  { id: 25, name: "Napsule Suites", location: "Davao City", price: 879, stars: 4.0 },
  { id: 26, name: "Rogen Inn", location: "Davao City", price: 2034, stars: 4.4 },
  { id: 27, name: "Big Ben's Apartelle", location: "Davao City", price: 832, stars: 3.7 },
  { id: 28, name: "Hop Inn Hotel Davao", location: "Davao City", price: 1421, stars: 4.3 },
  { id: 29, name: "La Anclar Hotel", location: "Davao City", price: 1777, stars: 3.8 },
  { id: 30, name: "Traveller's Inn Matina Pangi", location: "Davao City", price: 830, stars: 4.2 },
  { id: 31, name: "Snooze Inn and Suites", location: "Davao City", price: 3210, stars: 4.5 },
  { id: 32, name: "My Hotel Davao", location: "Davao City", price: 1252, stars: 3.9 },
  { id: 33, name: "Jotel Inn", location: "Davao City", price: 1139, stars: 4.1 },
  { id: 34, name: "Casa Leticia Business Inn", location: "Davao City", price: 1609, stars: 4.2 },
  { id: 35, name: "RedDoorz Plus near Bangko Sentral ng Pilipinas Davao", location: "Davao City", price: 973, stars: 4.6 },
  { id: 36, name: "Chateau Cinco Dormitel", location: "Davao City", price: 1570, stars: 4.3 },
  { id: 37, name: "Conclave Hotel", location: "Davao City", price: 1297, stars: 4.0 },
  { id: 38, name: "BlueBerry Tourist Hotel", location: "Davao City", price: 2890, stars: 4.1 },
  { id: 39, name: "The Strand Suites and Dormitel", location: "Davao City", price: 1085, stars: 4.3 },
  { id: 40, name: "Hotel Uno", location: "Davao City", price: 1578, stars: 3.4 },
  { id: 41, name: "Hampton Suites", location: "Davao City", price: 1981, stars: 4.5 },
  { id: 42, name: "Acacia Hotel Davao (2)", location: "Davao City", price: 4143, stars: 4.4 },
  { id: 43, name: "RedDoorz Plus @ Roxas Street Davao", location: "Davao City", price: 1149, stars: 3.9 },
  { id: 44, name: "Casa Leticia Boutique Hotel", location: "Davao City", price: 1829, stars: 4.0 },
  { id: 45, name: "Hotel Midori Davao", location: "Davao City", price: 1460, stars: 3.9 },
  { id: 46, name: "Blue Lotus Hotel", location: "Davao City", price: 3184, stars: 4.5 },
  { id: 47, name: "The Pinnacle Hotel and Suites", location: "Davao City", price: 3107, stars: 4.1 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const auth = localStorage.getItem("hotel_auth") === "true";
    const stored = localStorage.getItem("hotel_user");
    if (!auth || !stored) {
      router.replace("/login");
      return;
    }
    setUser(JSON.parse(stored));

    const bookingsRaw = localStorage.getItem("hotel_bookings") || "[]";
    setBookings(JSON.parse(bookingsRaw));
  }, [router]);

  const hotels = useMemo(() => SAMPLE_HOTELS.filter(h => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      h.name.toLowerCase().includes(q) ||
      h.location.toLowerCase().includes(q) ||
      String(h.price).includes(q)
    );
  }), [query]);

  const handleLogout = () => {
    localStorage.removeItem("hotel_auth");
    router.push("/");
  };

  const bookHotel = (hotel) => {
    const bookingsRaw = localStorage.getItem("hotel_bookings") || "[]";
    const current = JSON.parse(bookingsRaw);
    const newBooking = {
      id: Date.now(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      location: hotel.location,
      price: hotel.price,
      dates: `${new Date().toISOString().slice(0,10)} → ${new Date(Date.now()+86400000).toISOString().slice(0,10)}`
    };
    current.unshift(newBooking);
    localStorage.setItem("hotel_bookings", JSON.stringify(current));
    setBookings(current);
  };

  const cancelBooking = (id) => {
    const next = bookings.filter(b => b.id !== id);
    localStorage.setItem("hotel_bookings", JSON.stringify(next));
    setBookings(next);
  };

  return (
    <>
      <Head>
        <title>Dashboard - Luxury Hotels</title>
      </Head>

      <div className={styles.page}>
        <aside className={styles.sidebar}>
          <div className={styles.sideBrand}>Dashboard</div>
          <nav className={styles.sideNav}>
            <button className="btn btn-ghost" onClick={() => router.push("/dashboard")}>Home</button>
            <button className="btn btn-ghost" onClick={() => alert("Settings placeholder")}>Settings</button>
            <button className="btn btn-ghost" onClick={() => document.getElementById('bookings')?.scrollIntoView({behavior:'smooth'})}>Bookings</button>
          </nav>
        </aside>

        <main className={styles.dashboardMain}>
          <header className={styles.dashboardHeader}>
            <div>
              <h2>Welcome Back{user ? `, ${user.name}` : ""}</h2>
              <p className={styles.muted}>Manage your bookings and find new hotels.</p>
            </div>
            <div className={styles.headerActions}>
              <input
                className="form-control"
                placeholder="Search hotels by name or location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: 260 }}
              />
              <button className="btn btn-ghost" onClick={() => router.push("/")}>Site</button>
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          </header>

          <section className={styles.topCards}>
            <div className={styles.statCard}>Card 1</div>
            <div className={styles.statCard}>Card 2</div>
            <div className={styles.statCard}>Card 3</div>
          </section>

          <section className={styles.contentArea}>
            <div className={styles.leftColumn}>
              <div className="card" id="bookings">
                <h3 style={{ marginTop: 0 }}>Your Bookings</h3>
                {bookings.length === 0 ? (
                  <p className={styles.muted}>No bookings yet. Book from the list on the right.</p>
                ) : (
                  <ul className={styles.bookingList}>
                    {bookings.map(b => (
                      <li key={b.id} className={styles.bookingItem}>
                        <div>
                          <strong>{b.hotelName}</strong>
                          <div className={styles.muted}>{b.dates} • ₱{b.price}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-ghost" onClick={() => alert('View placeholder')}>View</button>
                          <button className="btn btn-ghost" onClick={() => cancelBooking(b.id)}>Cancel</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.rightColumn}>
              <h3 style={{ marginTop: 0 }}>Available Hotels</h3>
              <div className={styles.hotelList}>
                {hotels.map(h => (
                  <div key={h.id} className={styles.hotelRow}>
                    <div>
                      <strong>{h.name}</strong>
                      <div className={styles.muted}>{h.location} • {h.stars}★</div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div className={styles.priceSmall}>₱{h.price}</div>
                      <button className="btn btn-primary" onClick={() => bookHotel(h)}>Book</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}