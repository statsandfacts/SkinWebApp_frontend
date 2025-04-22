"use client";

import { CopyIcon } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  url: string;
}

export default function CopyButton({ url }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // hide after 2s
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopyUrl}
        className="p-2 rounded-full bg-gray-300 text-slate-600 hover:bg-gray-400 transition"
        title="Copy link"
      >
        <CopyIcon className="h-4 w-4" />
      </button>
      {copied && (
        <span className="absolute top-[-1.5rem] left-1/2 -translate-x-1/2 text-xs text-slate-600 bg-white border px-2 py-1 rounded shadow">
          Copied!
        </span>
      )}
    </div>
  );
}
