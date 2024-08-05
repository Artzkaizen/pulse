"use client";

import { useInView } from "react-intersection-observer";
interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
}

const InfiniteScrollContainer = ({
  onBottomReached,
  children,
  className,
}: InfiniteScrollContainerProps) => {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange(inView) {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <section className={className}>
      {children}
      <div ref={ref} />
    </section>
  );
};

export default InfiniteScrollContainer;
