import styles from "./About.module.scss";
export default function About() {
  return (
    <>
      <h2>ABOUT</h2>
      <div className={styles.content}>
        <p>
          This project was made by Ajay to practice React and Next.js. He's
          getting familiar with how to use APIs.
        </p>
        <p>
          The API used in this project was{" "}
          <a href="https://jikan.moe/">Jikan</a>, which fetches data from{" "}
          <a href="https://myanimelist.net/">MyAnimeList.net</a>
        </p>
        <p>
          The top 200 animes sorted by popularity are fetched from the API and
          randomly picked in the matchups.
        </p>
        <p>The game will break if you reach a score of 75 ;)</p>
      </div>
    </>
  );
}
