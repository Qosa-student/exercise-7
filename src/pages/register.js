import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('hotel_auth') === 'true') {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    try {
      localStorage.setItem('hotel_user', JSON.stringify(user));
      localStorage.setItem('hotel_auth', 'true');
      router.push('/dashboard');
    } catch (err) {
      alert('Unable to save account locally.');
    }
  };

  return (
    <>
      <Head>
        <title>Register - Luxury Hotels</title>
      </Head>
      <div className={styles.page} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <main className="container card" style={{ maxWidth: 480, width: '100%', padding: 24 }}>
          <h1 style={{ marginTop: 0 }}>Create account</h1>
          <p style={{ color: '#666', marginBottom: 18 }}>Create an account to manage bookings here in Davao City.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required />
            </div>

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

            <div className="form-control">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input id="confirmPassword" type="password" value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="submit" className="btn btn-primary">Register</button>
              <button type="button" className="btn btn-ghost" onClick={() => router.push('/login')}>Have an account?</button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}