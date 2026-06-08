import { Input } from "@heroui/react"

const Searchbar = () => {
  return (
    <div className="bg-white h-18 border-b-2 border-bleu flex items-center px-4">
      <h1 className="font-extrabold text-5xl italic text-bleu flex gap-1">Visit <p className="text-turquoise">Builder</p></h1>
      <div className="grow flex justify-center">
        <Input className="w-100 focus-visible:ring-bleu"  placeholder="Search a shop..."/>
      </div>
    </div>
  )
}

export default Searchbar