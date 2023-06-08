import ToolBar from '../toolbar';
import Chart from '../chart';

import styles from  './layout.module.scss';

const Layout = () =>  {
  return (
    <div className={styles.container}>
      <ToolBar />
       <Chart />
    </div>
  );
}

export default Layout;