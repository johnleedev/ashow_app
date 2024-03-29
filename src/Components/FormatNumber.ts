import React from 'react';

function FormatNumber(number: number): string {
  const isNegative = number < 0;
  const numberStr = Math.abs(number).toString();
  let billionPart = numberStr.slice(-9, -8);
  let millionPart = numberStr.slice(-8, -4);
  millionPart = parseInt(millionPart).toString();
  let restPart = numberStr.slice(-4);
  restPart = parseInt(restPart).toString();

  if (numberStr.length >= 9) {
    const formattedMillionPart = millionPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedRestPart = restPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (millionPart === '0' && restPart === '0') {
      return isNegative ? `-${billionPart}억원` : `${billionPart}억원`;
    } else if (millionPart === '0') {
      return isNegative ? `-${billionPart}억 ${restPart}원` : `${billionPart}억 ${restPart}원`;
    } else if (restPart === '0') {
      return isNegative ? `-${billionPart}억 ${millionPart}만원` : `${billionPart}억 ${millionPart}만원`;
    } else {
      return isNegative
        ? `-${billionPart}억 ${formattedMillionPart}만 ${formattedRestPart}원`
        : `${billionPart}억 ${formattedMillionPart}만 ${formattedRestPart}원`;
    }
  } else if (numberStr.length <= 8 && numberStr.length >= 5) {
    const formattedMillionPart = millionPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedRestPart = restPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (restPart === '0') {
      return isNegative ? `-${formattedMillionPart}만원` : `${formattedMillionPart}만원`;
    } else {
      return isNegative
        ? `-${formattedMillionPart}만 ${formattedRestPart}원`
        : `${formattedMillionPart}만 ${formattedRestPart}원`;
    }
  } else {
    const formattedNumber = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return isNegative ? `-${formattedNumber}원` : `${formattedNumber}원`;
  }
}

export default FormatNumber;
