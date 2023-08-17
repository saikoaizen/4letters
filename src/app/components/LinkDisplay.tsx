'use client'

import React, { useState } from 'react'
import CustomInput from './primitive/CustomInput'
import WrapperHorizontal from './primitive/WrapperHorizontal'
import Image from 'next/image'
import CopyLinkIcon from '../../../public/CopyLinkIcon.svg'
import styles from './LinkDisplay.module.css'
import colors from '../util/colors'

export default function LinkDisplay({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    })
  }

  return (
    <WrapperHorizontal>
      <CustomInput
        initialValue={link}
        interactable={false}
        customStyle={{ color: colors.cyan }}
      />
      <div>
        <Image
          src={CopyLinkIcon}
          alt="CopyIcon"
          width={30}
          height={30}
          onClick={copyToClipboard}
          className={styles.copyLinkButton}
        />
        {copied && <span className={styles.copiedMessage}>Copied</span>}
      </div>
    </WrapperHorizontal>
  )
}
