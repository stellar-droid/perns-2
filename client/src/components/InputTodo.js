import React, { useEffect, useState } from "react";
import ListTodo from "./ListTodo";
// import ListTodo from './ListTodo';

const InputTodo = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const getTodos = async () => {
    try {
      const response = await fetch("http://10.10.10.145:3000/todos");
      const jsonData = await response.json();
      // if(todos.length !== jsonData.length)
      // {
      // }
      console.log("jsondata", jsonData);
      setTodos(jsonData);
      console.log(todos);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id) => {
    console.log("id")

    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if(confirmed){
      try {
        const deleteTodo = await fetch(`http://10.10.10.145:3000/todos/${id}`, {
          method: "DELETE",
        });
        setTodos(todos.filter((todo) => todo.todo_id !== id));
        console.log(deleteTodo);
      } catch (error) {
        console.error(error.message);
      }
    };
    }
       

  useEffect(() => {
    getTodos();    
  }, []);   


      // Get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);  

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };   



  const onSubmitForm = async (e) => {
    // console.log("event",e);
    e.preventDefault();
    if (description.trim() === "") {
      alert("Please enter a description");
      return;
    }


    try {
      const body = { description };
      const response = await fetch("http://10.10.10.145:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      // window.location = "/";
      if (response.status === 200) {
        getTodos();
      }
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
    
  };

  const [description, setDescription] = useState("");
  const settingdescription = (e) => {
    setDescription(e.target.value);
    
  };
  
  return (
    <>
      <h1 className="text-center mt-5">PERN TODO</h1>
      <form className="d-flex mt-5" >
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={settingdescription}
        />
        <button className=" btn-success"  onClick={onSubmitForm}>
          {" "}
          Add
        </button>
        <button className=" btn-success"  onClick={onSubmitForm}>
          {" "}
          Add
        </button>
      </form>
      {todos.length > 0 && <ListTodo todos={currentTodos} deleteTodo={deleteTodo} />}

      <Pagination
        todosPerPage={todosPerPage}
        totalTodos={todos.length}
        paginate={paginate}
      />

    {todos.length <= 0 && "NO DATA AVAILABLE to show"}
    </>
  );
};

export default InputTodo;


const Pagination = ({ todosPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }}
