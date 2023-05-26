import { BallTriangle } from "react-loader-spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      visible={true}
    />
  );
}
