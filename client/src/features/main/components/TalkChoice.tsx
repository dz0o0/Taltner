import React from "react";

import { Button } from "@/components/ui/button";

export function TalkChoice() {
  return (
    <section className="mx-32 my-16 flex rounded-md bg-progateSidebarBG  shadow-progate">
      <div className="grid size-full grid-cols-2 gap-16 p-24">
        <Button variant="default" className="h-24 shadow-progate">
          <p className="font-noto text-base">今日のご飯はなんですか</p>
        </Button>
        <Button variant="default" className="h-24 shadow-progate">
          <p className="font-noto text-base">昨日何時に寝ましたか</p>
        </Button>
        <Button variant="default" className="h-24 shadow-progate">
          <p className="font-noto text-base">明日の予定はなんですか</p>
        </Button>
        <Button variant="default" className="h-24 shadow-progate">
          <p className="font-noto text-base">好きなアーティストは誰ですか</p>
        </Button>
      </div>
    </section>
  );
}
