import styles from "../../styles/generic/generic.module.css";
import pic2 from "../../assets/bigimg2.png";
export default function WhyChoose() {
  const features = [
    {
      title: "Modern Equipment",
      desc: "Train with confidence using our state-of-the-art fitness equipment, designed for maximum results."
    },
    {
      title: "Qualified Trainers",
      desc: "Our certified trainers are dedicated to your success, offering personalized guidance to match your fitness journey."
    },
    {
      title: "Variety of Classes",
      desc: "No matter your style HIIT, yoga, or group sessions we have a fitness program that fits and keeps you inspired."
    },
    {
      title: "Clean and Safe Environment",
      desc: "Cleanliness matters—our gym is meticulously maintained to ensure a safe, healthy environment for every member."
    }
  ];

  return (
    <section className={styles.whyChoose}>
      <div className={styles.content}>
        <h2>Why Choose <br /> Our Gym</h2>
        {features.map((f, idx) => (
          <div className={styles.feature} key={idx}>
            <span className={styles.icon}>✔</span>
            <div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.image}>
        <img src={pic2} alt="Gym Training" />
      </div>
    </section>
  );
}
