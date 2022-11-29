// React
import { useState, FormEvent, ChangeEvent } from "react";

// Icon
import { PlusCircle } from "phosphor-react";
import { ClipboardText } from "phosphor-react";

// Styles
import styles from "./NewTaskForm.module.css";

// Components
import { Tasks } from "./Tasks";

// Interface
export interface NewTask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function NewTaskForm() {
  const [tasks, setTasks] = useState<NewTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Criação de uma nova tarefa
  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault();

    if (newTaskTitle) {
      setTasks([
        ...tasks,
        {
          id: crypto.randomUUID(), // Id Aleatório
          title: newTaskTitle,
          isCompleted: false,
        },
      ]);

      setNewTaskTitle("");
    } else {
      return;
    }
  }

  // Título da tarefa
  function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setNewTaskTitle(e.target.value);
  }

  // Contagem de total de tarefas criadas
  const tasksMaids = tasks.length;

  // Contagem de total de tarefas completadas
  const tasksCompleted = tasks.filter((task) => task.isCompleted).length;

  // Deletar uma Tarefa
  function deleteTask(taskId: string) {
    const newTask = tasks.filter((task) => {
      task.id !== taskId;
    });

    setTasks(newTask);
  }

  // Marcar tarefa como completada
  function toggleCompletedTask(taskId: string) {
    const newTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasks(newTask);
  }

  return (
    <div className={styles.containerTask}>
      <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskTitle}
          onChange={handleNewTaskChange}
        />

        <div>
          <button type="submit">
            Criar
            <PlusCircle size={16} weight="bold" />
          </button>
        </div>
      </form>

      <div className={styles.headerList}>
        <div className={styles.tasksCreated}>
          <p>Tarefas criadas</p>
          <span>{tasksMaids}</span>
        </div>
        <div className={styles.tasksFinished}>
          <p>Concluídas</p>
          <span>
            {tasksCompleted} de {tasksMaids}
          </span>
        </div>
      </div>

      {tasks.length > 0 ? (
        <div className={styles.taskList}>
          {tasks.map((task) => {
            return (
              <Tasks
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onCompletedTask={toggleCompletedTask}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.clipBoard}>
          <ClipboardText size={72} />
          <div className={styles.clipBoardText}>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      )}
    </div>
  );
}
