import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <div className="fa-3x">
        <FontAwesomeIcon icon={faSpinner} size="2x" spin fixedWidth />
      </div>
    </Container>
  );
};

export default Loading;
