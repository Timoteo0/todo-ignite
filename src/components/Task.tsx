import { CheckCircle, Circle, Trash } from "phosphor-react";
import styles from "./Task.module.css";

interface Tasks {
  id: string;
  content: string;
  done: boolean;
}

interface TaskProps {
  task: Tasks;
  onDeleDeleteTask: (task: string) => void;
  onTaskDone: (taskDone: Tasks) => void;
}

export function Task({ task, onDeleDeleteTask, onTaskDone }: TaskProps) {
  function handleDeleteTask() {
    onDeleDeleteTask(task.id);
  }

  function handleTaskDone() {
    onTaskDone(task);
  }

  return (
    <div className={styles.task}>
      <div>
        <button onClick={handleTaskDone}>
          {task.done === true ? <CheckCircle className={styles.done} size={22} weight='fill' /> : <Circle size={22} />}
        </button>
        <p
          className={task.done === false ? styles.content : styles.contentDone}
        >
          {task.content}
        </p>
      </div>
      <button onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  );
}
