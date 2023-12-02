"use client"

import { useRouter } from 'next/navigation'
import Script from 'next/script'
import React from 'react'

const Fileupload = () => {
    const router = useRouter()
  return (
    <div>
         <iframe data-tally-src="https://tally.so/embed/3ExZoX?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="217" title="File Upload"></iframe>
           <Script
                id="tally-js"
                src="https://tally.so/widgets/embed.js"
                // onLoad={() => {
                //     Tally.loadEmbeds();
                // }}
                onSubmit={() => {
                  router.push('/')
                }}
            />
    </div>
  )
}

export default Fileupload