import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const ResizableComponent = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = useState({ width: 1200, height: 600 });

  const handleResize = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    setSize(size);
    // console.log(`New size: ${size.width}x${size.height}`);
  };

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
      resizeHandles={["w"]}
      onResize={handleResize}
      minConstraints={[400, 100]}
      maxConstraints={[2000, 800]}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </ResizableBox>
  );
};

export default ResizableComponent;
