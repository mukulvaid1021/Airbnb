import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import todoitems from "./components/todoitems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState } from "react";
import { additemtoserver } from "./services/itemservice";

function App() {
  const [todoitems, settodoitems] = useState([]);

  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const serveritem = await additemtoserver(itemName, itemDueDate);
    const newtodoitems = [
      ...todoitems,
     serveritem,
    ];
    settodoitems(newtodoitems);
  };

  const handleDeleteItem = (todoitemName) => {
    const newtodoitems = todoitems.filter((item) => item.name !== todoitemName);
    settodoitems(newtodoitems);
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoitems.length === 0 && <WelcomeMessage></WelcomeMessage>}
      <todoitems
        todoitems={todoitems}
        onDeleteClick={handleDeleteItem}
      ></todoitems>
    </center>
  );
}

export default App;
