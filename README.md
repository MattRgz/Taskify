# Taskify is a "To Do List"
coded as a project for my bootcamp. You can create a profile and manage the list with products previusly created.

# For the design of Taskify
various tools were used. For example:

## Excalidraw:
  ![AvanceProyecto](https://user-images.githubusercontent.com/100500096/201583907-b6c92cb5-1d68-4f64-894b-5e9442e964d6.png)
  
  A tool that was used for design and map the aplication. Currently It could be improve with the use of UML.

## Notion:
  ![image](https://user-images.githubusercontent.com/100500096/201584042-012abaca-07a8-42de-9283-46ed6b11c017.png)

  Used for order the tasks to do.
  
  
# The project is built with react
To start, you have to type "npm start" on client, and start the server with "nodemon start" command (if you don't have nodemon, you can start it in the classic way).

# To getting started
The project doesn't have a database of products, so you have to improve one by the server POST route:

http://localhost:8080/api/product/new

The DB is builded on MongoDB, so you have to post every product in a JSON file format.(ex: { name: "Tomatos" } )

Other way to post a list of products, is by change the "/server/config/mongoose.config.js" file, to another connection with the previous format.
