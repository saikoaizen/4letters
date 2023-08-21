'use client'

import React, { useState } from 'react'
import CustomInput from './primitive/CustomInput'
import Image from 'next/image'
import CopyLinkIcon from '../../../public/CopyLinkIcon.svg'
import styles from './LinkDisplay.module.css'
import colors from '../util/colors'

export default function LinkDisplay({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  const url = 'http://localhost:3000/join?roomCode='

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url + link).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    })
  }

  return (
    <div className="wrapperHorizontal">
      <CustomInput
        initialValue={url + link}
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
    </div>
  )
}
