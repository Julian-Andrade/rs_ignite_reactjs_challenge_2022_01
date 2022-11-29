// Icons
import { Check, Trash } from "phosphor-react";

// Styles
import styles from "./Tasks.module.css";

// Interface
import { NewTask } from "./NewTaskForm";

interface TasksProps {
  task: NewTask;
  onDeleteTask: (taskId: string) => void;
  onCompletedTask: (taskId: string) => void;
}

export function Tasks({ task, onDeleteTask, onCompletedTask }: TasksProps) {
  return (
    <div className={styles.containerTask}>
      <button
        className={task.isCompleted ? styles.checked : styles.check}
        onClick={() => onCompletedTask(task.id)}
      >
        <div>{task.isCompleted ? <Check size={10} weight="bold" /> : ""}</div>
      </button>
      <p className={task.isCompleted ? styles.completed : ""}>{task.title}</p>
      <button className={styles.trash} onClick={() => onDeleteTask(task.id)}>
        <Trash size={16} />
      </button>
    </div>
  );
}
