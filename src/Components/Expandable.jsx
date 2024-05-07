import { Children, useState } from "react";

function Expandable(props) {
  const { children } = props;
  const [showing, setShowing] = useState(false);
  const expandClick = () => {
    setShowing(!showing);
  };
  return (
    <>
      <button onClick={expandClick}>comments</button>
      {showing && children}
    </>
  );
}

export default Expandable;
