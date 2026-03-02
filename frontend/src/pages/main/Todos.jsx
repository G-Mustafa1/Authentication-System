import React, { useState, useEffect } from "react";
import { ListTodo, CheckCircle2, Circle, Trash2, Edit2, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/features/taskSlice";

const Todos = () => {
  const dispatch = useDispatch();

  // ✅ SAFE SELECTOR (error fix)
  const taskState = useSelector((state) => state.task) || {};
  const tasks = taskState.tasks || [];
  const loading = taskState.loading || false;

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // ADD
  const openAddModal = () => {
    setModalType("add");
    setForm({ title: "", description: "", status: "pending" });
    setShowModal(true);
  };

  // EDIT
  const openEditModal = (task) => {
    setModalType("edit");
    setSelectedTask(task);
    setForm(task);
    setShowModal(true);
  };

  // SUBMIT
  const handleSubmit = () => {
    if (!form.title) return toast.error("Title required");

    if (modalType === "add") {
      dispatch(createTask(form));
      toast.success("Task added");
    } else {
      dispatch(updateTask({ id: selectedTask._id, updates: form }));
      toast.success("Task updated");
    }

    setShowModal(false);
  };

  // DELETE
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted");
  };

  // TOGGLE
  const toggleStatus = (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    dispatch(updateTask({ id: task._id, updates: { status: newStatus } }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4">
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Meri Tasks</h1>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {loading ? (
            <p>Loading...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-400">No tasks found</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="bg-white p-4 rounded-xl flex gap-3 shadow">

                {/* STATUS */}
                <button onClick={() => toggleStatus(task)}>
                  {/* {task.status === "completed"
                    ? <CheckCircle2 className="text-blue-500" />
                    : <Circle className="text-gray-300" />} */}
                </button>

                {/* CONTENT */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className={task.status === "completed" ? "line-through text-gray-400" : ""}>
                      {task.title}
                    </p>

                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(task)}>
                        <Edit2 size={15} className="text-blue-500" />
                      </button>

                      <button onClick={() => handleDelete(task._id)}>
                        <Trash2 size={15} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs">{task.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-xl w-full max-w-md">

            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className="w-full border p-2 mb-3"
            />

            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              className="w-full border p-2 mb-3"
            />

            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="flex-1 border py-2">
                Cancel
              </button>

              <button onClick={handleSubmit} className="flex-1 bg-blue-600 text-white py-2">
                {modalType === "add" ? "Add" : "Update"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;