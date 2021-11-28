import React, { useEffect } from 'react';
import LoadingLogo from './LoadingLogo.svg';

export const LoadingText = () => {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount((count + 1) % 4);
    }, 500);
  }, []);

  return (
    <div
      style={{
        fontSize: '30px',
        position: 'absolute',
        left: 'calc(50% - 60px)',
      }}
    >
      {'Loading' + '.'.repeat(count)}
    </div>
  );
};

export const Loading = () => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {/* <img src={LoadingLogo}/> */}
      {/* {LoadingLogo} */}
      <object
        type="image/svg+xml"
        style={{
          height: '100%',
          width: '100%',
        }}
        data={LoadingLogo}
      >
        svg-animation
      </object>
      <LoadingText />
    </div>
  );
};

export const LoadingPage = React.memo(() => {
  return (
    <div
      style={{
        height: '80vh',
        width: '80vw',
        marginTop: '10vh',
        marginLeft: '10vw',
      }}
    >
      <Loading />
    </div>
  );
});
