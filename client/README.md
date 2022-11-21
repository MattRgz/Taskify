# Taskify is a "To Do List"
coded as a project for my bootcamp. You can create a profile and manage the list with products previusly created.

# The project is built with react
To start, you have to type "npm start" on client, and start the server with "nodemon start" command (if you don't have nodemon, you can start it in the classic way).

# To getting started
The project doesn't have a database of products, so you have to improve one by the server POST route:

   -    http://localhost:8080/api/product/new
   
   -    The DB is builded on MongoDB, so you have to post every product in a JSON file format.(ex:
        {
          name: "Tomatos"
        }
         )
         
Other way to post a list of products, is by change the "/server/config/mongoose.config.js" file, to another connection with the previous format.
