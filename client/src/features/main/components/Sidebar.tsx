import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Sidebar() {
  return (
    <div className="shrink-0 overflow-x-hidden bg-progateSidebarBG">
      <div className="h-full w-[260px]">
        <aside className="size-full flex-1 overflow-auto border-r-2 border-r-progateSidebarBorder bg-progateSidebarBG p-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>話題が表示されません</AccordionTrigger>
              <AccordionContent>
                マイクが許可されていない可能性があるため、各ブラウザのやり方でマイクの入力を許可してください。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>チュートリアルを再度見たい</AccordionTrigger>
              <AccordionContent>
                ブラウザのリロードを行なっていただくことで、再度見ることが出来ます。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>相手にばれる心配</AccordionTrigger>
              <AccordionContent>
                録音中、相手に通知等が行くことはないため、安心してご利用いただけます。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>マイクを拒否してしまった</AccordionTrigger>
              <AccordionContent>
                Chromeの場合
                <br />
                右上のメニュー（縦に3つの点）をクリック。
                <br />
                設定を選択。
                <br />
                プライバシーとセキュリティ &gt; サイトの設定を選択。
                <br />
                マイクを選択。
                <br />
                リストから対象のサイトを探し、許可に変更。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>対面形式でも使いたい</AccordionTrigger>
              <AccordionContent>
                Taltnerはオフラインでもご利用可能でございます。是非ご活用ください！
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
      </div>
    </div>
  );
}
