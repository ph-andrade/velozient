import { NonContent } from '@/styles/components/NonContent'
import React from 'react'
import { AiTwotoneEyeInvisible } from 'react-icons/ai'

const WarnNonContent: React.FC = () => {
  return (
    <NonContent>
      <AiTwotoneEyeInvisible size={100}/>
      <span>Non Content</span>
    </NonContent>
  )
}

export default WarnNonContent