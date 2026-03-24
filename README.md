## Research Review Project
This project is the backend based project that has the concepts like caching, authentication, authorization, performance optimization etc. To test the api's we can use the postman that helps us to create the api's call really easily.

### Features
1. We can upload the pdf as the research paper for the review. (role -> author)
2. We can review the submitted uploaded pdf of anyone which are available for review. (role -> reviewer).
3. Has the admin role that can see all the papers uploaded by review. Admin can manage them.

### To run the project
1. Run the command - npm install
2. There are two scripts mentioned in the package.json.
   * Run in 1st terminal - npm run watch - To create a build of the project as dist folder.
   * Run in 2nd terminal - npm run dev - To run the server.js present in dist folder with nodemon.

And you are good to go with the project. You can submit the paper. You can review the paper. You can get all the papers.
