import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Candlesticks from '../../utils/candleSticks';

import styles from './chart.module.scss';

const Chart = () => {
  const { currentData } = useSelector((state) => {
    return state.StockReducer;
  });

  useEffect(() => {
    let myCanvas = document.getElementById("stockChart");
    myCanvas.width = 700;
    myCanvas.height = 350;

    // sample chart options:
    const msftDaily = {
      canvas: myCanvas,
      padding: 10,
      gridScale: 5,
      gridColor: "#DBDBDB",
      bullColor: "#3D92FA",
      bearColor: "#FB6C64",
      data: currentData
    };
    
    let myChart = new Candlesticks(msftDaily);
    myChart.draw();

  }, [currentData]);

  return (
    <div className={styles.container}>
      <canvas id="stockChart"></canvas>
    </div>
  );
}

export default Chart;