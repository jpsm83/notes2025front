import { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "2",
  borderColor: "blue",
};

const Spinner = () => {
  return (
    <BeatLoader
      color={"#2b7fff"}
      cssOverride={override}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
