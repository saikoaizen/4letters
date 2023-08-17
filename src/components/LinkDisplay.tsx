import { useState } from "react";
import CustomInput from "./CustomInput";
import styles from "./LinkDisplay.module.css";
import colors from "../utils/colors";

export default function LinkDisplay({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <div className="wrapperHorizontal">
      <CustomInput
        initialValue={link}
        interactable={false}
        customStyle={{ color: colors.cyan }}
      />
      <div>
        <img
          src="/CopyLinkIcon.svg"
          alt="CopyIcon"
          width={30}
          height={30}
          onClick={copyToClipboard}
          className={styles.copyLinkButton}
        />
        {copied && <span className={styles.copiedMessage}>Copied</span>}
      </div>
    </div>
  );
}
