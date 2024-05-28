import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export function Tutorial() {
  // 状態変数とその更新関数を定義します。初期値はtrueです。
  const [isOpen, setIsOpen] = useState(true);

  // handleOpen関数は、isOpenの状態をtrueに設定します。
  const handleOpen = () => {
    setIsOpen(true);
  };

  // handleClose関数は、isOpenの状態をfalseに設定します。
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={handleClose}
          className="absolute inset-0 flex items-center justify-center bg-black opacity-70"
        >
          {/* スライド画面 */}
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-4 flex bg-slate-300"
          >
            {/* スライド取り消しボタン */}
            <div onClick={handleClose} className="text-3xl ml-auto pt-6 pr-8">
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
