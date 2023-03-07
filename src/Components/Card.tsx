export interface CardProps {
  name: string
  time: string
}

export function Card(props: CardProps) {
  return (
    <div className="w-2/3 h-14 px-5 flex justify-between items-center rounded-md bg-lime-500 text-white">
      <strong>{props.name}</strong>
      <small>{props.time}</small>
    </div>
  )
}