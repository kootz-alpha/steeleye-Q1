import styles from "./ListRow.module.css";

const ListRow = ({ children, onClick }) => {
  return <tr className={styles.cell} onClick = {onClick}>{children}</tr>;
};

export default ListRow;
