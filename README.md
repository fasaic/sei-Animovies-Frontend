# AMDB Frontend

## Description 
Animovies is a MERN application with user-authentication (register/login) where users can login and create, read, update, and delete information on the application. It is the third project of General Assembly’s Software Engineering Immersive course after two weeks of learning about MongoDB and database principles. Me and my group mates; Ridwan and Charlie all love animated movies, and decided to create a platform that is solely for animated movies.

**Timeframe:** 7 days | Group Project (Fasai, Ridwan, and Charlie)

## Deployment Link
Here is the link to my deployed version of Animovies : https://animovies-ga.netlify.app/

## Technologies Used 
- HTML5
- CSS3
- SASS
- React JS
- JavaScript
- Express JS
- node.js
- MongoDB
- NPM
- Git
- GitHub
- VSCode
- Google Chrome Dev Tools
- Google Fonts
- Figma

## Overview
Similar to IMDB, Animovies is a platform, a community, a platform, and library for not any movie lovers but specifically for those who love animated movies. Once users enter the site, they can view and search movies by genres or name, click into each movie to view its information along with the average rating, image stills and trailer. They can register and login to leave a comment, edit and delete their comment, rate a movie, and add it to their watchlist. The users can view a list of movies and comments they made on their personal profile page.

## Planning 
The first day of planning this project was to discuss what kind of application we were going to build. We tried to brainstorm a few ideas and topics that all three of us would be interested in, and were excited by the idea of a movie review platform. However, we wanted our project to be differentiated from the ones that are already existing, and the thought of having a fun-themed platform with only animated movies that we all love sparked this project.

After we have decided on making an application for animated movies, we discussed page components, functionalities of the app, and the design of backend and frontend. We created a wireframe of the app pages and also the initial structure of the backend.

**Wireframe of the pages**
<img width="1547" alt="Screen Shot 2565-09-29 at 15 20 16" src="https://user-images.githubusercontent.com/77038679/195330457-b0a20cd4-62a2-46ae-b08e-ba45c88ff430.png"><img width="1475" alt="Screen Shot 2565-09-29 at 15 24 16" src="https://user-images.githubusercontent.com/77038679/195330488-77bfc162-0c44-48e0-8592-ab24a764fd86.png">

**Backend Components and Schema Plan**
<img width="1538" alt="Screen Shot 2565-09-29 at 15 21 01" src="https://user-images.githubusercontent.com/77038679/195330622-859509cc-9ea3-46a2-b6ba-c28a5f24a6bd.png">

From the experiences in the last two projects, I felt that thinking about styling and the design of the frontend before actually building would be very helpful when we start to code everything, and it would help when working collaboratively to make sure that everyone is building and styling towards the same theme. For this reason, I designed the theme of the frontend on Figma on the first day.


**Figma Design**
<img width="1107" alt="Screen Shot 2565-10-12 at 12 27 21" src="https://user-images.githubusercontent.com/77038679/195331041-7d1acebc-8630-4e73-a98b-b438bd011cb5.png">


## Code Process

**How we worked as a team**

This was the first project we were working collaboratively on GitHub where we worked on different branches, then merged in the end. During the planning and the planning and set-up stage we worked together using LiveShare on VSCode. We then discussed what each person would do at the beginning of each day via Zoom, and worked on separate Git branches and communicated  throughout the day whenever a merge is going to be done to avoid merge conflicts. The whole group participated in parts of backend and frontend in different tasks and would jump in to each other’s task if discussion and help was needed.

**Building the backend and frontend skeleton:**

During the first two days of the project, we started by building the backend and the skeleton of the frontend simultaneously. Since this was the first time doing a full-stack application with our own back-end, we wanted to test the initial setup of our backend and ensure that the frontend was able to make a request to our API. I was responsible for creating the initial frontend structure including the navbar, register/login page, and a simple movie search page. I also implemented the stylings that I designed on Figma to test how it would turn out. Charlie was working on building all the routes using React Router to get the front-end into place. Ridwan created the movie schema and controllers as we planned and seeded one data for test. We went over the backend together, and I tested that the frontend can request data from our backend and be mapped for display. 

*MovieSchema and Controller*

<img width="1193" alt="Screen Shot 2565-10-12 at 12 29 16" src="https://user-images.githubusercontent.com/77038679/195331416-3f1641df-1f7d-4ed0-af2b-b9c33ceefce6.png">

*Frontend Dummy Page*

![Faj2PfsWIAATv0m](https://user-images.githubusercontent.com/77038679/195331783-9233fdc3-7969-4a4c-98a2-72465442a52c.jpeg)


After testing was done, we built the other parts of the backend. I built the comments schema and controller with CRUD functionalities. The users must both comment and rate the movie when they submit the comment form, therefore a conditional logic that returns an error response was added. Similarly, a user is only allowed to comment on a movie once so we have to check if the user has already made a comment and prevent them from commenting. Charlie built those for the user model and authentication and the watchlist. Ridwan seeded 20 datasets to our backend. 

<img width="859" alt="Screen Shot 2565-10-01 at 22 56 18" src="https://user-images.githubusercontent.com/77038679/195332052-d040dcfb-b0d0-4f91-9520-fe0d00cff078.png">

<img width="859" alt="Screen Shot 2565-10-01 at 22 57 31" src="https://user-images.githubusercontent.com/77038679/195332118-a24f95dc-0f2f-44d8-ab32-04784f687a76.png">



**Building frontend pages:**

I was responsible for building the movie single page, the search page, and the landing page.  Me and Ridwan worked on some functionalities of the page including the rating and comments CRUD functionality that links to the backend on the movie single page, the search and filter functionality, and linking comments through to the user profile page. Charlie was working on authentication creating functionalities for the user watchlist which was initially our stretch goal and we decided to include them. 

*Movie Single Page*

I built the frontend according to my Figma design with the colours adjusted to be similar throughout the app for continuity. A get request was done to request the data from our API for the movies, and also for the user’s profile to identify the user.

<img width="702" alt="Screen Shot 2565-10-12 at 12 41 23" src="https://user-images.githubusercontent.com/77038679/195333731-d1529ea2-5e17-4f86-829a-e3764bfffc9d.png">

The movie details were mapped and displayed on the page that has a carousel of movie stills, movie information, and an embedded Youtube trailer that autoplays once the page is loaded.
A Bootstrap Carousel was used to display the movie stills where it was set to automatically cycle through the slides at the assigned interval. 

<img width="590" alt="Screen Shot 2565-10-01 at 23 42 03" src="https://user-images.githubusercontent.com/77038679/195333843-fa0bc785-dbc6-42e1-bfee-9865a926aee8.png">

For the Youtube trailer, I created an iframe component called YoutubeEmbeded where the embedID of the movie was parsed through to display the video. 

<img width="764" alt="Screen Shot 2565-10-01 at 23 50 34" src="https://user-images.githubusercontent.com/77038679/195334056-3c371429-b459-4c2c-acbf-e3926cf7a1dd.png">

<img width="580" alt="Screen Shot 2565-10-01 at 23 42 31" src="https://user-images.githubusercontent.com/77038679/195334126-8b4327c1-fc0a-49ff-b4ba-196996af401f.png">

For the comments section, I used react-star-rating for the display and input of the rating, and swiper for displaying the comments in order to make them draggable and scrollable on both mobile and desktop. For each comment displayed, the edit and delete button only displays for the user who created the comment, therefore a conditional logic was added to the display of the buttons. 

<img width="449" alt="Screen Shot 2565-10-01 at 23 45 09" src="https://user-images.githubusercontent.com/77038679/195334236-aa070308-70e7-4051-96e9-a310f8cf5378.png">

Once the user clicks the edit button, the edit form appears at the same place as the existing comment. This is by updating the class name to display or hide the edit form according to the handleEdit function.

<img width="250" alt="Picture1" src="https://user-images.githubusercontent.com/77038679/195334443-5839b744-421a-43f3-ae49-c7a85a7d49da.png">
<img width="549" alt="Screen Shot 2565-10-01 at 23 45 51" src="https://user-images.githubusercontent.com/77038679/195334502-74ad7460-225a-47e2-ba09-462ff8411341.png">



*Movie Search Page*

For the search page, I created a grid of movies using the poster of the movies obtained from the API with the titles that will be displayed when the user hovers over the poster. The search input and the genre buttons are created where the genres were mapped as buttons. The user can search for movies by typing in the search bar or clicking on the genre buttons to view all movies in that genre, or they can both search and apply the filter simultaneously. The colours of the active button would also change once the button has been clicked.

<img width="1039" alt="Screen Shot 2565-10-02 at 00 10 01" src="https://user-images.githubusercontent.com/77038679/195334801-47d8e18b-03da-4db8-923c-446258b468f2.png">

<img width="787" alt="Screen Shot 2565-10-02 at 00 09 29" src="https://user-images.githubusercontent.com/77038679/195334988-c0449416-611f-41b8-bf7e-9e3055c672df.png">

*Landing Page*

Me and Ridwan worked together to create a filtered array of movie objects according to the genre. We used the forEach method and created a new state called FilteredMovies where the movies are separated by tags. The array was mapped to display a carousel of movie posters by genre on the landing page.

<img width="633" alt="Screen Shot 2565-10-12 at 12 50 02" src="https://user-images.githubusercontent.com/77038679/195335295-4d1c599e-f03f-4b9d-bbb8-73c4732763b6.png">

*User Profile Page*

This page was a stretch goal we decided to add after we have completed the other pages to add more functionalities and depth to the app. Ridwan created the structure of the page, and we worked together to display comments the user has made on their profile page. However, since this function was decided to be added after the user model was created, it is necessary to modify the model to include the comment schema. The comments in the user model had to be added, updated, and deleted at the same time the comments model is modified in order for the comments on the user profile page updated once there are changes on the comments model. Therefore, we added the user comments action to the comments controllers as well. 


*Pop-up Alert*

An alert pop-up was also added by displaying the success or error response from the backend through a library called Toastify, where a small popup with different colors according to the alert will be displayed. It is a nice feature to add, and made our application more fun to interact with.

## Finished Product
<img width="1800" alt="Screen Shot 2565-09-29 at 21 48 47" src="https://user-images.githubusercontent.com/77038679/195335629-a96aeffa-b589-4b6d-bccb-b345bc72df72.png">

<img width="1800" alt="Screen Shot 2565-09-29 at 21 51 09" src="https://user-images.githubusercontent.com/77038679/195335659-277c34aa-b486-4071-8b92-16493ae7250f.png">

![screencapture-animovies-ga-netlify-app-movies-63089c7bd39f6ac19147a9f1-2022-10-05-22_55_34](https://user-images.githubusercontent.com/77038679/195335774-ffac541e-cbef-46ec-9c27-7c53bb9008f6.png)

<img width="1824" alt="Screen Shot 2565-09-29 at 21 53 10" src="https://user-images.githubusercontent.com/77038679/195335869-3eaa532d-945f-4101-9a3d-42ecbf09e136.png">

<img width="1800" alt="Screen Shot 2565-09-29 at 21 52 00" src="https://user-images.githubusercontent.com/77038679/195335909-9d9ea7c9-66bc-4f81-b058-8c8e63dc0fd1.png">


## Challenges
One of the challenges we faced was making the genre filter dynamic. We have tried to create a unique set of the genres from the movies data, in this case if there is a new movie added with a new genre that is not available before, it would be updated on the search page and landing page. However, we were not able to complete this dynamic function within the last day. I know that the map function has to be used to iterate through the movie objects and return all genres, then create a set out of the genre array. 

## Wins / Key Learnings/Takeaways
This is the first full-stack application we ever did, and I am happy that we were able to complete it. There are many things that I learned from doing this project, from the actual planning, to designing the database.

I also pushed my boundaries in styling and tried to make the application look as clean and interactive as I could with fully functioning responsive design. To achieve that, I also added hover effects to elements that the user needs to interact with. Each movie poster or comment card will slightly and smoothly grow once it has been hovered over, with overlay of the movie name and creation date being displayed. I also cleaned up the stylings after all functionalities, elements, and pages of the app were in place to ensure that the design and interaction is consistent throughout. It was also the first time to research different React libraries and packages for both styling and functionality purposes and actually experimenting with them. 

The most important takeaway from this project is that planning and thinking about all the functionalities and including the stretch goals of the backend in the development process to prepare for future development is very important since the database and models design would be different. This will help me plan better for the next project on the backend. 

## Bugs & Future Improvements

**Bugs**

- The page reloads when a new comment has been added instead of updating the page
- Add to watchlist button does not change its appearance when the user has clicked on it. 

**Future Improvements**

- It would be great if the movies can be sorted by top-rated, most reviewed, and latest release on the landing page
- Add functionality for the user to be able to edit and delete their comments directly on their user profile page 
- Add functionality to filter movies using multiple tags



