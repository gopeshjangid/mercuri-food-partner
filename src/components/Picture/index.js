import React from 'react';
import { array } from 'prop-types';

import { getElementTag } from './Utils/utils';

export default function Picture(props) {
  const { imgArr = [] } = props;

  return (
    <picture>
      {imgArr.map(getElementTag)}
      </picture>
  );
}

Picture.propTypes = {
  imgArr: array.isRequired,
};
