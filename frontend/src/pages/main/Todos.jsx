import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";

const Todos = () => {
  return (
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Todos</h1>

        {/* Add Task Input */}
        <div className="flex gap-4 mb-8">
          <Input placeholder="Add new task..." className="flex-1" />
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Add Task</Button>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {[1, 2, 3].map((task) => (
            <div key={task} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center hover:shadow-lg transition">
              <span className="text-gray-800">Sample Task {task}</span>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="p-1">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Todos;