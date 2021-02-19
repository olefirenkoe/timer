// import React, { useState } from 'react';

function Display({currentTime}) {
  return (
    <div className='display'>
      {dataFormated(currentTime)}
    </div>
  );
}

export default Display;

function dataFormated(time) {
  let data = time,
    hours = Math.floor(data / 60 / 60),
    minutes = Math.floor(data / 60) - (hours * 60),
    seconds = data % 60,
    formatData = ((hours < 10) ? "0" : "") + hours;

  formatData += ((minutes < 10) ? ":0" : ":") + minutes; 
  formatData += ((seconds < 10) ? ":0" : ":") + seconds; 
    
  return(formatData);
}