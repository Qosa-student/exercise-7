import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

const SAMPLE_HOTELS = [
  { id: 1, name: "Seaside Resort", location: "Davao City", price: 120, stars: 4 },
  { id: 2, name: "City Center Hotel", location: "Davao City", price: 90, stars: 3 },
  { id: 3, name: "Mountain View Lodge", location: "Davao Hills", price: 140, stars: 5 },
  { id: 4, name: "Lakeside Inn", location: "Davao Lake", price: 80, stars: 3 },
  { id: 5, name: "Grand Palace Hotel", location: "Downtown", price: 200, stars: 5 },
  { id: 6, name: "Budget Stay", location: "Near Airport", price: 50, stars: 2 },
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
                          <div className={styles.muted}>{b.dates} • ${b.price}</div>
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
                      <div className={styles.priceSmall}>${h.price}</div>
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