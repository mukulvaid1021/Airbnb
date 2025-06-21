import todoitem from "./todoitem";
import styles from "./todoitems.module.css";

const todoitems = ({ todoitems, onDeleteClick }) => {
  return (
    <div className={styles.itemsContainer}>
      {todoitems.map((item) => (
        <todoitem
          todoDate={item.dueDate}
          todoName={item.name}
          onDeleteClick={onDeleteClick}
        ></todoitem>
      ))}
    </div>
  );
};

export default todoitems;
