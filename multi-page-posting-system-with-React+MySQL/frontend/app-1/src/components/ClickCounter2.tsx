type ClickCounter2Props = {
  count: number;
  onIncrement: () => void;
};

function ClickCounter2({ count, onIncrement }: ClickCounter2Props) {
  return (
    <button
      type="button"
      className="app__button app__button--ghost"
      onClick={onIncrement}
    >
      Ver. 2 Clicks: {count}
    </button>
  );
}

export default ClickCounter2;
