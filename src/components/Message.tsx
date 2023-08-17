import styles from "./Message.module.css";

interface Props {
  text: string;
  alignment: number;
}

export default function Message({ text, alignment }: Props) {
  return (
    <>
      {alignment === 0 ? (
        <div className={styles.messageRight}>
          <text className={styles.message}>{text} </text>
          <img src="PlayerIcon.svg" alt="icon" width={20} height={20} />
        </div>
      ) : (
        <div className={styles.messageLeft}>
          <img src="PlayerIcon.svg" alt="icon" width={20} height={20} />
          <text className={styles.message}>{text} </text>
        </div>
      )}
    </>
  );
}
