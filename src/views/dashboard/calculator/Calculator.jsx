import React, { useState } from 'react';
import calculate from './logic/calculate';
import style from './calculator.module.css'

function Calculator() {
  const [data, setData] = useState({
    total: null,
    next: null,
    operation: null,
  });

  const handleClick = async (e) => {
    let buttonName = e.target.name;

    if (buttonName === 'BC') {
      // Remove the last character from the next value
      setData(prevData => ({
        ...prevData,
        next: prevData.next ? prevData.next.slice(0, -1) : null
      }));
      return;
    }

    if (buttonName === 'Ce') {
      // Clear the current entry (next value)
      setData(prevData => ({
        ...prevData,
        next: null
      }));
      return;
    }

    if (buttonName === 'Ca') {
      // Clear all values
      setData({
        total: null,
        next: null,
        operation: null,
      });
      return;
    }

    // Handle other button clicks
    const response = await calculate(data, buttonName);
    setData({
      total: response.total,
      next: response.next,
      operation: response.operation,
    });
  };

  const { total, next } = data;
  return (
    <div className={`${style.allItems}`}>
      <div className={`${style.inputBtn} m-sm-2 m-1`}>
        {next || total || 0}
      </div>
      <div className={`${style.gridcontainer}`}>
        <button type="button" onClick={handleClick} className={`${style.griditem} ${style.operationname}`} name="BC"> BC </button>
        <button type="button" onClick={handleClick} className={`${style.griditem} ${style.operationname}`} name="Ce"> Ce </button>
        <button type="button" onClick={handleClick} className={`${style.griditem} ${style.operationname}`} name="Ca"> Ca </button>
        <div></div>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="1"> 1 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="2"> 2 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="3"> 3 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="÷"> ÷ </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="4"> 4 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="5"> 5 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="6"> 6 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="x"> x </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="7"> 7 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="8"> 8 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="9"> 9 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="+"> + </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="."> . </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="0"> 0 </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="="> = </button>
        <button type="button" onClick={handleClick} className={`${style.griditem}`} name="-"> - </button>
      </div>
    </div>
  );
}

export default Calculator;
