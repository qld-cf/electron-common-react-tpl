import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import style from './loading.less';

const Loading = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setTimeout(() => setMount(true));
  }, []);

  return (
    <div className={classNames(style.loading, { [style.mount]: mount })}>
      <div className="loader">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

export default Loading;
