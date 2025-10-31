import styles from "../../styles/generic/generic.module.css";

export default function Stats() {
  const data = [
    { number: "400+", title: "Happy Members", desc: "Our community is growing fast" },
    { number: "20+", title: "Weekly Classes", desc: "Every week we make online class" },
    { number: "8+", title: "Certified Trainers", desc: "Helps to get your dream body" },
    { number: "99%", title: "Customer Satisfied", desc: "We ensure our best service" },
  ];

  return (
    <section className={styles.statsSection}>
      {data.map((stat, idx) => (
        <div className={styles.statBox} key={idx}>
          <h2>{stat.number}</h2>
          <p className={styles.title}>{stat.title}</p>
          <p className={styles.desc}>{stat.desc}</p>
        </div>
      ))}
    </section>
  );
}
