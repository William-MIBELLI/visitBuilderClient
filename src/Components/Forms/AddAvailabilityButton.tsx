import { Button } from "@heroui/react"
import { Plus } from "lucide-react"

const AddAvailabilityButton = () => {
  return (
    <Button className="text white font-semibold rounded-xl bg-bleu">
      <Plus />
      <p>
        Add availability
      </p>
    </Button>
  )
}

export default AddAvailabilityButton