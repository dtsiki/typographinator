import { IContainerProps } from './Container.types';

import styles from './Container.module.scss';

export const Container = ({ children }: IContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};
