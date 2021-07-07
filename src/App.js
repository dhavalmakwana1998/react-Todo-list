import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [inputData, setInputData] = useState("");
  const [todo, setTodo] = useState(["Dhaval", "Take out the trash"]);
  const [complete, setComplete] = useState([]);

  function addTodo() {
    if (!inputData || !inputData.trim()) {
      alert("please add data");
      setInputData("");
    } else {
      setTodo([...todo, inputData]);
      setInputData("");
    }
  }

  function removeAll() {
    if (todo.length <= 0) {
      alert("All Read");
    } else {
      setTodo([]);
      setComplete([...complete, ...todo]);
    }
  }

  function removeItem(id) {
    const newData = todo.filter((elem, ind) => {
      return ind !== id;
    });
    setTodo(newData);

    const done = todo.filter((elem, ind) => {
      return ind === id;
    });
    setComplete([...complete, done]);
  }

  function removeCompleteItem(id) {
    const newcData = complete.filter((elem, ind) => {
      return ind !== id;
    });
    setComplete(newcData);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card todolist not-done">
              <h1>Todos</h1>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control add-todo"
                  placeholder="Add todo"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                />
                <div className="input-group-append">
                  <span className="">
                    <button
                      className="btn btn-success rounded-0"
                      onClick={addTodo}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </span>
                </div>
              </div>
              <button onClick={removeAll} className="btn btn-outline-success">
                Mark all as done
              </button>

              <hr />
              <ul id="sortable" className="list-unstyled">
                {todo.map((item, ind) => {
                  return (
                    <li className="ui-state-default" key={ind + 1}>
                      <div className="font-weight-bold checkbox d-flex justify-content-between">
                        {item}
                        <i
                          onClick={() => removeItem(ind)}
                          className="fa fa-trash text-danger"
                        ></i>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="todo-footer">
                <strong>
                  <span className="count-todos">{todo.length} </span>
                </strong>
                Items Left
              </div>
            </div>
          </div>

          <div className="col-md-6 p-4 my-2">
            <div className="card p-4 stodolist">
              <h1>Already Done</h1>
              <ul id="done-items" className="list-unstyled">
                {complete.map((item, ind) => {
                  return (
                    <li className="d-flex justify-content-between" key={ind}>
                      {item}
                      <button className="btn btn-outline-danger btn-sm py-0 my-0">
                        <i
                          className="fa fa-remove"
                          onClick={() => removeCompleteItem(ind)}
                        ></i>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
