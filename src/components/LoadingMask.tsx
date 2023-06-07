import { FC } from 'react'
import Icons from './Icons'

interface LoadingMaskProps {
 
}

const LoadingMask: FC<LoadingMaskProps> = ({}) => {
  return <div className='fixed w-full backdrop-blur-sm h-full left-0 right-0 flex items-center justify-center bg-slate-/75'>
    <Icons.Loader2 className='animate-spin'/>
  </div>
}

export default LoadingMask