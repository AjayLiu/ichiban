import styles from './AnimeDiv.module.css'
export default function AnimeDiv({ obj, clickCallback, gameover }) {
  var numeral = require('numeral');
  var fanCount = numeral(obj.members).format("0.000a");

  return (
    <div className={styles.animeContainer}>
      <div className={styles.clickableRegion} onClick={() => clickCallback()} >
        <img className={styles.animeImg} src={obj.image_url}></img>
        <p>{obj.title}</p>
        {obj.reveal && <p className={styles.fanCount + ' ' + (gameover ? (obj.higher ? styles.higher : styles.lower) : styles.neutral)}>Fans: {fanCount}</p>}
      </div>
    </div>
  )
}
