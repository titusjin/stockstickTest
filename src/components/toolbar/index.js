import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMoreData, reduceData } from '../../reducers/stockReducer';
import { data } from '../../utils/data/moreData.js';

import styles from './toolbar.module.scss';

const ToolBar = () => {
  const dispatch = useDispatch();
  const { page, currentData } = useSelector((state) => {
    return state.StockReducer;
  });
  
  const [waitRes, setWaitRes] = useState(false);
  const [patientMsg, setPatientMsg] = useState("");

  const getDataMore = page =>{
    return new Promise((resolve, reject) => {
      if(page <= 5){
        const moreData = data["page" + page];
        resolve(moreData);
      }else{
        console.error('out of data range');
        reject({code: '1002', msg: "out of data range"});
      }
    });
  };
  const removeData = page => {
    return new Promise((resolve, reject) => {
      if(page > 0){
        const removeData = data["page" + page];
        resolve(removeData);
      }else{
        console.error('out of data range');
        reject({code: '1002', msg: "out of data range"});
      }
    });
  }
  
  const stillWaitRes = () => {
    !patientMsg && setPatientMsg('Please Be patient waiting the data back');
  }
  const doDataChange = methodIndicator => {
    setWaitRes(true);
    patientMsg && setPatientMsg('');
    
    const currentDataClone = {...currentData}
    switch (methodIndicator){
      case 'more':
        getDataMore(page + 1)
          .then(value => {
            const addedData = Object.assign({...currentDataClone["Time Series (Daily)"]}, value);
            currentDataClone["Time Series (Daily)"] = addedData;
            dispatch(fetchMoreData(currentDataClone));
            setWaitRes(false);
          },error => {
            setWaitRes(false);
            setPatientMsg(error.msg);
          });
          break;
      case 'less':
        removeData(page)
          .then(value => {
              const removedData = {...currentDataClone["Time Series (Daily)"]};
              const keys = Object.keys(value);
              keys.forEach(key => {
                delete removedData[key];
              });
              currentDataClone["Time Series (Daily)"] = removedData;
              dispatch(reduceData(currentDataClone))
              setWaitRes(false);
            },error => {
              setWaitRes(false);
              setPatientMsg(error.msg);
            });
        break;
      default:
        setWaitRes(false);
        break;
    }
  }

  const handleData = e => {
    const methodIndicator = e.currentTarget.dataset.method;
    waitRes
      ? stillWaitRes()
      : doDataChange(methodIndicator);
  }
  
  const renderPatientMsg = () => {
    return (
      <div className={styles.errorMsg}>{patientMsg}</div>
    );
  }
  return (
    <div className={styles.container}>
      <div>ToolBar</div>
      {
        patientMsg
          ? renderPatientMsg()
          : null
      }
      <div className={styles.iconSection}>
        <div onClick={handleData} data-method="more">
          <span className="material-symbols-outlined">add</span>
        </div>
        <div onClick={handleData} data-method="less">
          <span className="material-symbols-outlined">remove</span>
        </div>
      </div>
    </div>
  );
}

export default ToolBar;