const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const pool = require('./db1');
const e = require('express');

    //////middleware
app.use(cors()); // allows us to parse json
app.use(express.json()); // allows us to parse json  request.body
 
////ROUTES
  
//create a todo
app.post("/todos", async(req, res) => {  

        try {
            const { description } = req.body;
            const newTodo = await pool.query("INSERT INTO todo (description)  VALUES($1) RETURNING *", [description] );   
            res.json(newTodo.rows);
            console.log(req.body);
            
        } 

        catch (error) {
            console.log(error.message);
        }

});

// get all todos
app.get("/todos", async(req, res) => {

    try {

        const newTodo = await pool.query(" SELECT * FROM todo ; " );   
        res.json(newTodo.rows);
        // console.log(req.body);
        
    } 

    catch (error) {
        console.log(error.message);
    }

});

    
 //get a todo

  app.get("/todos/:id", async(req, res) => {
    try{
          const {id} = req.params;
          const todos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
          res.json(todos.rows[0]);
        // console.log(res.body);
          
          
    }

    catch (err) {
      console.log(err.message);
    }
  });


// update a todo

  app.put("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated");
        // res.json(todos.rows[0]);
        // console.log(res.body);
    } catch (err) {
        console.log(err.message);
    }
  })

// delete a todo

app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;

        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted");
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(3000, () => {
   console.log('Server is running on port 3000'  );
});
// app.listen(3001, () => {
//     console.log('Server is running on port 3001'  );
//  });