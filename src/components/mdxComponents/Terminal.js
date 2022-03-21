/*
 * Copyright 2022 steadybit GmbH. All rights reserved.
 */

import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import React from "react";

import "./Terminal.css";

export default function Terminal({ children }) {
  return (
    <div className="terminal">
      {children}

      <CopyToClipboard
        text={children}
        onCopy={() =>
          toast("Copied!", {
            autoClose: 2000,
          })
        }
      >
        <button className="terminal-copy">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.768 0a2.255 2.255 0 00-1.603.708 2.274 2.274 0 00-.619 1.601v11.745c-.01.594.211 1.17.62 1.602a2.255 2.255 0 001.602.708h9.217a2.255 2.255 0 001.577-.708c.409-.433.63-1.008.62-1.602V4.961h-.91l.91.003v-.001a2.341 2.341 0 00-.63-1.605L15.037.694A2.193 2.193 0 0013.45 0H6.768zm11.414 14.054v.01h-.91l.91-.021v.011zm-13.636 0v-.011l.91.02h-.91v-.009zm0-11.745V2.3h.91l-.91.021V2.31zm1.942-.353a.437.437 0 01.296-.138h6.659a.367.367 0 01.267.119L16.223 4.6l.002.001a.52.52 0 01.138.357v9.126a.456.456 0 01-.123.324.438.438 0 01-.297.138H6.784a.438.438 0 01-.296-.138.456.456 0 01-.124-.324V2.28a.456.456 0 01.124-.324zm-2.851 1.68a.91.91 0 00-1.819 0v13.308c0 .578.237 1.126.648 1.527.411.4.964.62 1.534.62h11.455a.91.91 0 100-1.818H4a.38.38 0 01-.266-.105.312.312 0 01-.097-.224V3.636z"
              fill="currentcolor"
            />
          </svg>
        </button>
      </CopyToClipboard>
    </div>
  );
}
