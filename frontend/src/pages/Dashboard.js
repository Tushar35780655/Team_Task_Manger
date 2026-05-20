import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
  });

  const [tasks, setTasks] = useState([]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    project: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetchDashboard();
    fetchTasks();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await axios.get(
        "http://https://team-task-manger-hy5n.onrender.com/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });

  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://https://team-task-manger-hy5n.onrender.com/api/tasks",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created");

      fetchTasks();
      fetchDashboard();

      setTaskData({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        project: "",
      });

    } catch (error) {
      console.log(error);
      alert("Task Creation Failed");
    }
  };

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  return (
    <div style={{ padding: "40px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 220px)",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div className="card">
          <h3>Total Tasks</h3>
          <h2>{stats.totalTasks}</h2>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <h2>{stats.completedTasks}</h2>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <h2>{stats.pendingTasks}</h2>
        </div>

        <div className="card">
          <h3>In Progress</h3>
          <h2>{stats.inProgressTasks}</h2>
        </div>

      </div>

      <h2 style={{ marginTop: "50px" }}>
        Create Task
      </h2>

      <form
        onSubmit={createTask}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
          marginTop: "20px",
        }}
      >

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={taskData.description}
          onChange={handleChange}
        />

        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="text"
          name="project"
          placeholder="Project ID"
          value={taskData.project}
          onChange={handleChange}
        />

        <button type="submit">
          Create Task
        </button>

      </form>

      <h2 style={{ marginTop: "50px" }}>
        Tasks
      </h2>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "20px",
        }}
      >

        {tasks.map((task) => (

          <div
            key={task._id}
            className="task-card"
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <p>
              <strong>Priority:</strong> {task.priority}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Dashboard;