import PulseLoader from 'react-spinners/PulseLoader'

interface LoaderProps {
  size?: number
  margin?: number
  color?: string
  label?: string
}

export default function Loader(prop: LoaderProps) {
  return (
    <PulseLoader size={prop.size} margin={prop.margin} color={prop.color} />
  )
}
