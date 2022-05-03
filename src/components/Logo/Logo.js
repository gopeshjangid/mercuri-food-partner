import React from 'react';

export default function Logo(props) {

  return (
    <img src={props.logoSrc} alt="Logo" className={props.className} />
  );
}