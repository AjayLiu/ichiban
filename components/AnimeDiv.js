import styles from './AnimeDiv.module.css'
export default function AnimeDiv({obj, clickCallback}) {
  return (
    <div onClick ={()=>clickCallback()} className={styles.animeContainer}>
        <img src={obj.image_url}></img>
        <p>{obj.title}</p>
    </div>
  )
}
