import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa6';

const SpinnerIcon = FaSpinner as unknown as React.FC;

function Loading() {
  return (
      <LoadingStyle>
          <SpinnerIcon />
      </LoadingStyle>
  );
}

const LoadingStyle = styled.div`
    padding: 40px 0;
    text-align: center;

    @keyframes rotate{
        100%{
            transform: rotate(360deg);
        }
    }

    svg{
        width: 70px;
        height: 70px;
        fill: #ccc;
        animation: rotate 1s linear infinite;
    }
`;

export default Loading;