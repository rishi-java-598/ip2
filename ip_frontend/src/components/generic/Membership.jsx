// import styles from "../../styles/generic/Membership.module.css";

// export default function Membership() {
//   return (
//     <>
//     <h1 className={styles.memHead}>Our Memberships</h1>
//     <section className={styles.membership}>
//       {/* {[1, 2, 3,4].map((i) => ( */}

//       <div className={styles.upd}>

//          <div className={styles.flipCard} key={1}>
//           <div className={styles.flipCardInner}>
//             <div className={styles.flipCardFront}>
//               <p className={styles.title}>FLIP CARD</p>
//               <p>Hover Me</p>
//             </div>
//             <div className={styles.flipCardBack}>
//               <p className={styles.title}>BACK</p>
//               <p>Leave Me</p>
//             </div>
//           </div>
//         </div>
//         <div className={styles.flipCard} key={4}>
//           <div className={styles.flipCardInner}>
//             <div className={styles.flipCardFront}>
//               <p className={styles.title}>FLIP CARD</p>
//               <p>Hover Me</p>
//             </div>
//             <div className={styles.flipCardBack}>
//               <p className={styles.title}>BACK</p>
//               <p>Leave Me</p>
//             </div>
//           </div>
//         </div>


//       </div>



//       <div className={styles.lowd}>


//   <div className={styles.flipCard} key={2}>
//           <div className={styles.flipCardInner}>
//             <div className={styles.flipCardFront}>
//               <p className={styles.title}>FLIP CARD</p>
//               <p>Hover Me</p>
//             </div>
//             <div className={styles.flipCardBack}>
//               <p className={styles.title}>BACK</p>
//               <p>Leave Me</p>
//             </div>
//           </div>
//         </div>
//         <div className={styles.flipCard} key={3}>
//           <div className={styles.flipCardInner}>
//             <div className={styles.flipCardFront}>
//               <p className={styles.title}>FLIP CARD</p>
//               <p>Hover Me</p>
//             </div>
//             <div className={styles.flipCardBack}>
//               <p className={styles.title}>BACK</p>
//               <p>Leave Me</p>
//             </div>
//           </div>
//         </div>
//       </div>
     
      
//       {/* ))} */}
//     </section></>

//   );
// }
import styles from "../../styles/generic/generic.module.css";

export default function Membership() {
  const memberships = [
    { id: 1, title: "Bronze Card", validity: "1 Month", price: "₹2200" },
    { id: 2, title: "Silver Card", validity: "3 Months", price: "₹6000" },
    { id: 3, title: "Gold Card", validity: "6 Months", price: "₹11000" },
    { id: 4, title: "Platinum Card", validity: "12 Months", price: "₹15000" },
  ];

  return (
    <>
      <h1 className={styles.memHead}>Our Memberships</h1>
      <section className={styles.membership}>
        <div className={styles.upd}>
          {memberships.slice(0, 2).map((card) => (
            <div className={styles.flipCard} key={card.id}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <h2 
                  style={{
                    fontSize:"1.6rem"
                  }}
                  >{card.title}</h2>

                
                  <p className={styles.getDetails}>Get Details</p>
                </div>
                <div className={styles.flipCardBack}>
                  <h3>{card.title}</h3>
                    {/* <hr 
                  style={{
                    width:"40%",
                    margin:"0 auto",
                    borderRadius:"6px",
                    height:"4px",
                    backgroundColor:card.title==="Bronze Card"?"#a52a2a91":"yellow"
                  }}
                  /> */}
                  <p className={styles.validity}>Validity: {card.validity}</p>
                  <p className={styles.price}>{card.price}</p>
                  <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis tempor justo nec orci volutpat.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.lowd}>
          {memberships.slice(2, 4).map((card) => (
            <div className={styles.flipCard} key={card.id}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <h2 
                   style={{
                    fontSize:"1.6rem"
                  }}>{card.title}</h2>
                  <p className={styles.getDetails}>Get Details</p>
                </div>
                <div className={styles.flipCardBack}>
                  <h3
                 
                  >{card.title}</h3>
                  <p className={styles.validity}>Validity: {card.validity}</p>
                  <p className={styles.price}>{card.price}</p>
                  <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis tempor justo nec orci volutpat.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
