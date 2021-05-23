import styles from './Container.module.css';

type Props = {
  children: Object;
};

const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
