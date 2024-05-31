import React from "react";

import { Button } from "@/components/ui/button";

export function MicInputButton() {
  return (
    <div className="my-12 flex justify-center">
      <Button variant="destructive" className="h-12 w-32 shadow-progate">
        はじめる
      </Button>
    </div>
  );
}
