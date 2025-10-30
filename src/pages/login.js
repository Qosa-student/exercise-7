import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('hotel_auth') === 'true') {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = localStorage.getItem('hotel_user');
    if (!stored) {
      alert('No account found. Please register first.');
      return;
    }

    const user = JSON.parse(stored);
    if (user.email === formData.email && user.password === formData.password) {
      localStorage.setItem('hotel_auth', 'true');
      router.push('/dashboard');
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <>
      <Head>
        <title>Login - Luxury Hotels</title>
      </Head>
      <div className={styles.page} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <main className="container card" style={{ maxWidth: 480, width: '100%', padding: 24 }}>
          <h1 style={{ marginTop: 0 }}>Login</h1>
          <p style={{ color: '#666', marginBottom: 18 }}>Sign in to manage bookings and reservations here in Davao City.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="button" className="btn btn-ghost" onClick={() => router.push('/register')}>Create account</button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}