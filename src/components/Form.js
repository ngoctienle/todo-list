import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actCloseForm,
  actSubmitForm,
  actUnSelectItem,
} from "./../actions/index";

function Form(props) {
  const dispatch = useDispatch();

  const [newTaskItem, setNewTaskItem] = useState({
    task_id: "",
    task_name: "",
    task_level: 0,
  });

  const isShowForm = useSelector((state) => state.isShowForm);
  const itemSelected = useSelector((state) => state.itemSelected);

  useEffect(() => {
    if (itemSelected) {
      setNewTaskItem({
        task_id: itemSelected.id,
        task_name: itemSelected.name,
        task_level: itemSelected.level,
      });
    }
  }, [itemSelected]);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setNewTaskItem({
      ...newTaskItem,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let item = {
      id: newTaskItem.task_id,
      name: newTaskItem.task_name,
      level: newTaskItem.task_level,
    };
    dispatch(actSubmitForm(item));
    dispatch(actCloseForm());
  };

  const handleCancel = () => {
    dispatch(actCloseForm());
    dispatch(actUnSelectItem());
  };

  if (!isShowForm) return null;

  return (
    <div className="row">
      <div className="col-md-offset-7 col-md-5">
        <form onSubmit={handleSubmit} className="form-inline">
          <div className="form-group">
            <label className="sr-only" htmlFor>
              label
            </label>
            <input
              value={newTaskItem.task_name}
              onChange={handleChange}
              name="task_name"
              type="text"
              className="form-control"
              placeholder="Task Name"
            />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="true">
              label
            </label>
            <select
              value={newTaskItem.task_level}
              onChange={handleChange}
              name="task_level"
              className="form-control"
              required="required"
            >
              Small
              <option value={0}>Small</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className="btn btn-default"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
