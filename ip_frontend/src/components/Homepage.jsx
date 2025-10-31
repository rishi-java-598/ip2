import React from "react";
import styles from "../styles/common/HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Transform Your Body, Transform Your Life</h1>
          <p>Join our community and achieve your fitness goals today!</p>
          <button className={styles.cta}>Join Now</button>
        </div>
      </section>

      {/* Services */}
      <section className={styles.services}>
        <h2>Our Programs</h2>
        <div className={styles.serviceGrid}>
          {[
            { name: "Personal Training", icon: "🏋️‍♂️" },
            { name: "Yoga & Pilates", icon: "🧘‍♀️" },
            { name: "CrossFit", icon: "🤸‍♂️" },
            { name: "Group Classes", icon: "👥" },
          ].map((service, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.icon}>{service.icon}</span>
              <h3>{service.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className={styles.about}>
        <div>
          <h2>About Us</h2>
          <p>
            We are a modern fitness hub equipped with the latest equipment and
            certified trainers. Whether you're a beginner or an athlete, we
            have programs tailored for you.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1"
          alt="Gym"
        />
      </section>

      {/* Pricing */}
      <section className={styles.pricing}>
        <h2>Membership Plans</h2>
        <div className={styles.priceGrid}>
          {[
            { title: "Monthly", price: "$30" },
            { title: "Quarterly", price: "$80" },
            { title: "Yearly", price: "$250" },
          ].map((plan, i) => (
            <div key={i} className={styles.priceCard}>
              <h3>{plan.title}</h3>
              <p>{plan.price}</p>
              <button>Join Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section className={styles.trainers}>
        <h2>Meet Our Trainers</h2>
        <div className={styles.trainerGrid}>
          {[
            { name: "Alex Smith", img: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Maria Johnson", img: "https://randomuser.me/api/portraits/women/45.jpg" },
            { name: "John Doe", img: "https://randomuser.me/api/portraits/men/65.jpg" },
          ].map((trainer, i) => (
            <div key={i} className={styles.trainerCard}>
              <img src={trainer.img} alt={trainer.name} />
              <h3>{trainer.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2>What Our Members Say</h2>
        <div className={styles.testimonialGrid}>
          {[
            "Best gym in town! Amazing trainers and atmosphere.",
            "I lost 10kg in 3 months thanks to their programs!",
            "Highly recommend for both beginners and pros.",
          ].map((quote, i) => (
            <div key={i} className={styles.testimonialCard}>
              <p>"{quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact}>
        <h2>Contact Us</h2>
        <p>Email: contact@gym.com | Phone: +123 456 7890</p>
        <button>Get in Touch</button>
      </section>
    </div>
  );
}
