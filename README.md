[![Netlify Status](https://api.netlify.com/api/v1/badges/a13f5084-4255-444d-b839-8afa2aa83f60/deploy-status)](https://app.netlify.com/sites/ichiban/deploys)
<p align="center">
  <a href="https://github.com/AjayLiu/ichiban">
    <img src="public/imgs/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Ichiban</h3>

  <p align="center">      
    Which anime is more popular? Naruto or Demon Slayer? See how well you can correctly guess the popularity of the most popular animes!
    <br />
    <a href="https://ichiban.ajayliu.com"><strong>Play now »</strong></a>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="preview.png"></img>

The top 150 most popular animes are fetched from [Jikan API](https://jikan.moe). They are randomized and matched up with each other. High scores are stored in a MongoDB database. 

### Built With
* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [SCSS](https://sass-lang.com/)
* [Netlify](https://www.netlify.com/)
* [MongoDB](https://www.mongodb.com)


<!-- GETTING STARTED -->
## Getting Started

Here is a guide if you want to clone my website and modify it for yourself, all the way to deployment.

### Prerequisites

* [yarn](https://yarnpkg.com/)
* [git](https://git-scm.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AjayLiu/ichiban.git
   ```
2. Install packages
   ```sh
   yarn
   ```
3. Create a .env file in the root and fill in the following information about your MongoDB database:
   ```
   USER=
   PASSWORD=
   ```
4. Make sure to enter the same environment variables to Netlify.
5. Publish the site on Netlify using continuous git integration. :tada:

### Development

To run the development server
   ```sh
   yarn dev
   ```
Then head over to localhost:3000

To test out the high score functionality, run this instead (install Netlify CLI first):
   ```sh
   netlify dev
   ```
<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Ajay Liu - contact@ajayliu.com

Project Link: [https://github.com/AjayLiu/ichiban](https://github.com/AjayLiu/ichiban)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Jikan API](https://jikan.moe)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Netlify](https://www.netlify.com/)
