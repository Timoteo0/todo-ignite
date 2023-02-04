import { Header } from "./components/Header";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "./components/Task";
import uuid from "react-uuid";

import clipboard from "./assets/Clipboard.svg";

import styles from "./App.module.css";
import "./global.css";

interface Tasks {
  id: string;
  content: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [newTask, setNewTask] = useState("");

  const uniqueId = uuid().split("-").join("");

  const onlyTaskDone = tasks.filter((task) => {
    return task.done === true;
  });

  function handleNewTasks(event: FormEvent) {
    event.preventDefault();

    const newTaskObject = {
      id: uniqueId,
      content: newTask,
      done: false,
    };

    setTasks((state) => [...state, newTaskObject]);
    setNewTask("");
  }

  function handleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;

    setNewTask(inputValue);
  }

  function deleteTask(idTaskToDelete: string) {
    const newTasks = tasks.filter((task) => {
      return task.id !== idTaskToDelete;
    });

    setTasks(newTasks);
  }

  function handleTaskDone(taskDone: Tasks) {
    const falseOrTrue = tasks.map((task) => {
      if (task === taskDone) {
        task.done = !task.done;
      }

      return task;
    });

    setTasks(falseOrTrue);
  }

  return (
    <div className="App">
      <Header />

      <div className={styles.wrapper}>
        <div>
          <form onSubmit={handleNewTasks} className={styles.form}>
            <input
              type="text"
              placeholder="Adicione uma nova tarefa"
              onChange={handleTaskChange}
              value={newTask}
            />
            <button type="submit">
              Criar <PlusCircle size={16} weight="bold" />
            </button>
          </form>
        </div>
        <div className={styles.info}>
          <div>
            <p className={styles.incomplete}>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div>
            <p className={styles.completed}>Concluídas</p>
            <span>
              {onlyTaskDone.length} de {tasks.length}
            </span>
          </div>
        </div>

        <div className={styles.tasks}>
          {!tasks.length && (
            <div className={styles.emptyTasks}>
              <img src={clipboard} alt="prancheta" />
              <div>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          )}
          {tasks &&
            tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDeleDeleteTask={deleteTask}
                onTaskDone={handleTaskDone}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
