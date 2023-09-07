import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = (props) => {
  const [todos, setTodos] = useState([]);
  //delete todo function
//   const deleteTodo = async (id) => {
//     console.log("id")
//     try {
//       const deleteTodo = await fetch(`10.10.10.145:3000/todos/${id}`, {
//         method: "DELETE",
//       });
//       setTodos(todos.filter((todo) => todo.todo_id !== id));
//       console.log(deleteTodo);
//     } catch (error) {
//       console.error(error.message); 
//     }
//   };

  const getTodos = async () => {
    try {
      const response = await fetch("10.10.10.145:3000/todos/");
      const jsonData = await response.json();
      // if(todos.length !== jsonData.length)
      // {
      // }
      setTodos(jsonData);
      console.log("jsondata list", jsonData);
      console.log("todos",todos);
    } catch (error) {
      console.log(error.message);
    }
  };
 
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
          {props.todos.length === 0 ? (
            <div style={{width:'100%',textalign:'center'}}>No data</div>
          ) : (
            props.todos.map((todos) => (
              <tr key={todos.todo_id}>
                <td>{todos.description}</td>
                <td>
                  
                  <EditTodo todos={todos} />
                  
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => props.deleteTodo(todos.todo_id)}
                  >
                    Delete
                  </button>    
                 
                </td>
              </tr>
            ))                                                     
            
          )}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
