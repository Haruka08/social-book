# social-book
an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. 

## Links to the webpage and repository

To access the walk through video use [Social-Book video walk through](https://drive.google.com/file/d/1GeyyyUYWm1_SV2s3_Z-_1sEDwgM-tvQC/view)

To access the GitHub repository use [GitHub Repository social-book](https://github.com/Haruka08/social-book)

## Content

The list of available models:

1. Users
2. Thoughts

The lise of available routes:

1. /api/users/
2. /api/users/:userId/
3. /api/users/:userId/friends/:friendId
4. /api/thoughts
5. /api/thoughts/:thoughtId
6. /api/thoughts/:thoughtId/reactions

## How to run the applcation
1. Clone GitHub repository
2. Open cloned repository in Visual Studio Code
3. Install all modules required [i.e. npm i]
4. Inside the terminal
    - Install all module required by npm i
    - Enter npm start
    - Open insonmia
    - Access http://localhost:3001 with available routes to test all functions, ensuring the use of correct GET, POST, UPDATE, and DELETE options
    - Enter data into payload when Posting or Updating
