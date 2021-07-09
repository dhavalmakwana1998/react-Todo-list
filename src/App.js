import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [inputData, setInputData] = useState("");
  const [todo, setTodo] = useState([{ id: 1, task: "AP" }]);
  const [complete, setComplete] = useState([{ id: 101, task: "DM" }]);
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  function addTodo() {
    if (!inputData || !inputData.trim()) {
      alert("please add data");
      setInputData("");
    } else if (inputData && isEdit) {
      setTodo(
        todo.map((elem) => {
          if (elem.id === editTodo) {
            return { ...elem, task: inputData };
            // console.log(...elem);
          }
          return elem;
        })
      );
      setInputData("");
      setIsEdit(false);
      setEditTodo(null);
    } else {
      const allInput = { id: new Date().getTime().toString(), task: inputData };
      setTodo([...todo, allInput]);
      setInputData("");
    }
  }

  function removeAll() {
    setInputData("");
    setIsEdit(false);
    if (todo.length <= 0) {
      alert("All Read");
    } else {
      setTodo([]);
      setComplete([...complete, ...todo]);
    }
  }

  function editItem(id) {
    setInputData("");
    setIsEdit(true);
    const editItem = todo.find((elem) => {
      return id === elem.id;
    });
    setInputData(editItem.task);
    setEditTodo(id);
  }

  function removeItem(id) {
    setInputData("");
    setIsEdit(false);
    const addtoDone = todo.find((elem) => {
      return id === elem.id;
    });
    setComplete([...complete, addtoDone]);

    const newData = todo.filter((elem) => {
      return id !== elem.id;
    });
    setTodo(newData);
  }

  function removeCompleteItem(id) {
    setInputData("");
    setIsEdit(false);
    const newcData = complete.filter((elem) => {
      return elem.id !== id;
    });
    setComplete(newcData);

    const addtoDo = complete.find((elem) => {
      return elem.id === id;
    });
    setTodo([...todo, addtoDo]);
  }

  return (
    <div className="App">
      <div className="container">
        {/* <div className="my-4 py-2 my-alert">
          {isAlert && <Alert type={1} />}
        </div> */}
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
                    {isEdit ? (
                      <button
                        className="btn btn-warning rounded-0"
                        onClick={addTodo}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    ) : (
                      <button
                        className="btn btn-success rounded-0"
                        onClick={addTodo}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    )}
                  </span>
                </div>
              </div>
              <button onClick={removeAll} className="btn btn-outline-success">
                Mark all as done
              </button>

              <hr />
              <ul id="sortable" className="list-unstyled">
                {!todo.length ? (
                  <h5 className="bg-warning text-center">No data found</h5>
                ) : (
                  todo.map((item) => {
                    return (
                      <li className="ui-state-default my-1" key={item.id}>
                        <div className="font-weight-bold checkbox d-flex justify-content-between">
                          <div>{item.task}</div>
                          <div>
                            <i
                              onClick={() => editItem(item.id)}
                              className="mr-3 fa fa-edit text-dark p-2 rounded bg-warning fa-md"
                            ></i>
                            <i
                              onClick={() => removeItem(item.id)}
                              className="fa fa-trash text-light p-2 rounded bg-danger fa-md"
                            ></i>
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}
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
                {!complete.length ? (
                  <h5 className="bg-warning text-center">No data found</h5>
                ) : (
                  complete.map((item) => {
                    return (
                      <li
                        className="d-flex justify-content-between"
                        key={item.id}
                      >
                        {item.task}
                        <button className="btn btn-outline-success btn-sm py-0 my-0">
                          <i
                            className="fa fa-remove"
                            onClick={() => removeCompleteItem(item.id)}
                          ></i>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
