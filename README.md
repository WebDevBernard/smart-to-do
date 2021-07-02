# get sh*t done! - Smart TODO List
=========

## Introduction

A single page app that autocategorizes your tasks into either a things to watch, places to eat at, books to read, things to buy, miscellaneous todo's.  Enter a verb to (watch, read, eat, buy, do) manually categorize your tasks.

## Screenshots

### PLACEHOLDER
## Demo Video
https://user-images.githubusercontent.com/51090676/124223210-24baed80-dab8-11eb-86c8-60f56c74d4af.mov


## Contributors

- [Cynthia Cui](https://github.com/cyncui)
- [Yucen J Liu](https://github.com/YucenLyc)
- [Bernard Yang](https://github.com/bernard9)

- This is the group project we made for our Lighthouse Labs Midterm. 

## How to Install

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
  - OMDB_KEY=`YOUR_OMDB_KEY_GOES_HERE`
  - BOOKS_KEY=`YOUR_GOOGLE_BOOKS_KEY_GOES_HERE`
  - YELP_KEY=`YOUR_YELP_FUSION_KEY_GOES_HERE`
  - WOLF_KEY=`YOUR_WOLFRAM_ALPHA_KEY_GOES_HERE`

  *Requires the following API keys in .env file: Omdb, Google Books, Yelp Fusion, Wolfram Alpha. 

4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Pg-native
- Axios
- Body-Parser
- Chalk
- dotenv
- Ejs
- Express
- Morgan
- Node-sass-middleware
- Sortablejs
