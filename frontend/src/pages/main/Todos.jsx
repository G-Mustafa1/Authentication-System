import React, { useState, useEffect, useMemo } from "react";
import {
  ListTodo, CheckCircle2, Circle, Trash2, Edit2, Plus,
  X, Search, Clock, TrendingUp, CheckSquare,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/features/taskSlice";

const TABS = ["All", "Pending", "Completed"];

const EMPTY_FORM = { title: "", description: "", status: "pending" };

const Todos = () => {
  const dispatch = useDispatch();

  const { tasks = [], loading} = useSelector((state) => state.task);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" | "edit"
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  /* ───────────── MODAL HANDLERS ───────────── */
  const openAddModal = () => {
    setModalType("add");
    setSelectedTaskId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setModalType("edit");
    setSelectedTaskId(task._id);
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "pending",
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  /* ───────────── CRUD HANDLERS ───────────── */
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Description is required");
      return;
    }

    try {
      if (modalType === "add") {
        await dispatch(createTask(form)).unwrap();
        toast.success("Task added");
      } else {
        await dispatch(updateTask({ id: selectedTaskId, updates: form })).unwrap();
        toast.success("Task updated");
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err?.message || "Failed to delete task");
    }
  };

  // Toggle complete / pending directly from the list (no page reload)
  const toggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";    
    try {
      await dispatch(
        updateTask({ id: task._id, updates: {status: newStatus } })
      ).unwrap();
    } catch (err) {
      toast.error(err?.message || "Failed to update task");
    }
  };

  /* ───────────── FILTERING ───────────── */
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Pending" && task.status !== "completed") ||
        (activeTab === "Completed" && task.status === "completed");

      return matchesSearch && matchesTab;
    });
  }, [tasks, search, activeTab]);

  /* ───────────── STATS ───────────── */
  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = total - completedCount;
  const progressPct = total ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        {/* ─── HEADER ─── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
            <ListTodo size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Tasks</h1>
            <p className="text-gray-400 text-sm">Organize your work and stay productive</p>
          </div>
        </div>

        {/* ─── STATS ─── */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: ListTodo,     label: "Total",     value: total,         color: "text-blue-600",  bg: "bg-blue-50"  },
            { icon: CheckCircle2, label: "Completed", value: completedCount, color: "text-green-600", bg: "bg-green-50" },
            { icon: Clock,        label: "Pending",   value: pendingCount,   color: "text-amber-600", bg: "bg-amber-50" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={17} className={color} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* ─── PROGRESS ─── */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              <span className="font-semibold text-gray-700 text-sm">Today's Progress</span>
            </div>
            <span className="text-sm font-extrabold text-blue-600">{progressPct}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{completedCount} of {total} tasks complete</p>
        </div>

        {/* ─── TOOLBAR ─── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-sm shadow-md hover:opacity-90 transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>
        </div>

        {/* ─── TABS ─── */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ─── TASK LIST ─── */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <CheckSquare size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">No tasks found</p>
              <p className="text-gray-300 text-sm mt-1">Add a new task to get started</p>
              <button
                onClick={openAddModal}
                className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isCompleted = task.status === "completed";
              return (
                <div
                  key={task._id}
                  className={`group bg-white rounded-2xl border transition-all duration-200 hover:shadow-md ${
                    isCompleted ? "border-gray-100 opacity-70" : "border-gray-100 hover:border-blue-100"
                  }`}
                >
                  <div className="flex items-start gap-3 p-4">
                    {/* Status toggle */}
                    <button
                      type="button"
                      onClick={() => toggleStatus(task)}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {isCompleted
                        ? <CheckCircle2 size={21} className="text-blue-500" />
                        : <Circle size={21} className="text-gray-300 hover:text-blue-400 transition-colors" />
                      }
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-semibold text-sm leading-snug ${isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
                          {task.title}
                        </p>

                        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => openEditModal(task)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <Edit2 size={14} className="text-blue-500" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(task._id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      </div>

                      {task.description && (
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{task.description}</p>
                      )}

                      <div className="mt-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                          isCompleted ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                        }`}>
                          {isCompleted ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ─── ADD/EDIT MODAL ─── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-500">
              <h2 className="text-white font-extrabold text-lg">
                {modalType === "add" ? "Add New Task" : "Edit Task"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                  Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional description..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400 bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-sm shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  {modalType === "add" ? "Add Task" : "Update Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;