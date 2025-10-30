import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Welcome — White Flower</title>
        <meta name="description" content="Welcome to the hotel booking system" />
      </Head>

      <div className={styles.page}>
        <main style={{ width: "100%", maxWidth: 900, margin: "120px auto", padding: 24 }}>
          <section
            className={styles.hero}
            style={{ textAlign: "center", padding: 40, maxWidth: 720, margin: "0 auto" }}
          >
            <div style={{ marginBottom: 8, fontWeight: 700, fontSize: 20 }}>Hotel Booking in Davao City</div>
            <h1 style={{ margin: "8px 0 12px", fontSize: 28 }}>Welcome to White Flower</h1>
            <p style={{ color: "#666", marginBottom: 20 }}>
              Sign in to manage bookings or create a new account. Book your favorite hotels in Davao City with ease.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
              <button className="btn btn-primary" onClick={() => router.push("/login")}>
                Login
              </button>
              <button className="btn btn-ghost" onClick={() => router.push("/register")}>
                Register
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}