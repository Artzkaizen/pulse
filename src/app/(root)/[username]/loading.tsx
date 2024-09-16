const loading = () => {
  return (
    <div className="h-screen w-full overflow-auto p-6 grid place-items-center">
      <p className="text-xl text-semibold">Loading.....</p>
    </div>
  );
};

export default loading;

type Counter = {
  increment: () => number;
  decrement: () => number;
  reset: () => number;
};

function createCounter(init: number): Counter {
  let count = init;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = init),
  };
}
