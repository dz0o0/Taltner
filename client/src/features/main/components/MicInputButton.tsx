import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function MicInputButton() {
  const [isStarted, setIsStarted] = useState(false);

  const handleClick = () => {
    setIsStarted(!isStarted);
  };

  return (
    <div className="mb-8 mt-4 flex justify-center">
      {isStarted ? (
        <Button
          variant="destructive"
          className="h-12 w-32 shadow"
          onClick={handleClick}
        >
          話題を生成する
        </Button>
      ) : (
        <Button
          variant="destructive"
          className="h-12 w-32 shadow"
          onClick={handleClick}
        >
          はじめる
        </Button>
      )}
    </div>
  );
}
