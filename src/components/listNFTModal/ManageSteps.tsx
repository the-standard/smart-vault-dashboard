import { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

interface ModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalChildState: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenMap: any;
}

const Modal2: React.FC<ModalProps> = ({ modalChildState, tokenMap }) => {
  const [dataFromChild, setDataFromChild] = useState<number>(1);
  const [state, setState] = useState<number>(1);

  function handleDataFromChild(data: number) {
    setDataFromChild(data);
  }

  const renderByState = () => {
    switch (state) {
      case 1:
        return (
          <StepOne
            modalChildState={modalChildState}
            tokenMap={tokenMap}
            onDataFromChild={handleDataFromChild}
          />
        );
      case 2:
        return (
          <StepTwo
            modalChildState={modalChildState}
            tokenMap={tokenMap}
            onDataFromChild={handleDataFromChild}
          />
        );
      default:
        return <p>Step 1</p>;
    }
  };

  useEffect(() => {
    if (dataFromChild === 2) {
      setState(2);
    }
  }, [dataFromChild]);
  return (
    <div>
      {/* <StepOne
        modalChildState={modalChildState}
        tokenMap={tokenMap}
        onDataFromChild={handleDataFromChild}
      />{" "} */}
      {renderByState()}
      <p>Data from child: {dataFromChild}</p>
    </div>
  );
};
export default Modal2;
