import { useState } from "react";

function ClickCounter() {
  const [clicks, setClicks] = useState(0);

  return (
    <button
      type="button"
      className="app__button app__button--ghost"
      onClick={() => setClicks((value) => value + 1)}
    >
      Clicks: {clicks}
    </button>
  );
}

export default ClickCounter;
