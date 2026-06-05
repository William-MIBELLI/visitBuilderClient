import { useEffect, useState, type FC } from "react";
import type { IShop } from "../../Interfaces/Shop.type";
import {
  AlignEndVertical,
  ChevronDown,
  EllipsisVertical,
  Phone,
  PhoneMissed,
  Plus,
  Trash2
} from "lucide-react";
import VisitTiming from "./VisitTiming";
import { useShopContext } from "../../Contexts/ShopContext";
import type { IAvailability } from "../../Interfaces/Availability.type";
import ShopPlanning from "./ShopPlanning";
import {
  AlertDialog,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  Spinner,
} from "@heroui/react";

interface IProps {
  shop: IShop;
}

const ShopDetails: FC<IProps> = ({ shop }) => {
  const { fetchShopById, deleteShop } = useShopContext();
  const [displayPlanning, setDisplayPlanning] = useState<boolean>(false);
  const [avails, setAvails] = useState<IAvailability[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const onClickPlanningHandler = async () => {
    if (displayPlanning) {
      setDisplayPlanning(false);
      return;
    }
    setLoading(true);
    const data = await fetchShopById(shop.id);
    if (data) {
      setAvails(data.availabilities);
      setDisplayPlanning(true);
    }
    setLoading(false);
  };

  const onDeleteHandler = async () => {
    setLoadingDelete(true);
    const isDeleted = await deleteShop(shop.id);

    setLoadingDelete(false);
    setIsDeleteOpen(false)
  }

  const onCloseALertHandler = () => {
    if (loadingDelete) return;
    setIsDeleteOpen(false);
  }

  useEffect(() => {
    setLoading(false);
    setAvails(null);
    setDisplayPlanning(false);
  }, [shop]);

  return (
    <div className="bg-white absolute bottom-4 right-4 min-w-64 overflow-hidden rounded-2xl">
      <div className="bg-bleu px-6 py-3 text-white font-semibold text-left flex items-center justify-between gap-3">
        <p>{shop.placeName}</p>
        <Dropdown>
          <Button
            isIconOnly
            aria-label="menu"
            className="cursor-pointer rounded-full bg-bleu  hover:bg-blue-900"
          >
            <EllipsisVertical size={18} className="cursor-pointer m-1" />
          </Button>
          <DropdownPopover className=" rounded-xl">
            <DropdownMenu>
              <DropdownItem
                className="hover:bg-turquoise hover:text-white rounded-xl"
                id="update"
                textValue="Update"
              >
                <AlignEndVertical size={15} />
                <p className="font-semibold text-sm">Update</p>
              </DropdownItem>
              <DropdownItem
                className="hover:bg-turquoise hover:text-white rounded-xl"
                id="circuit"
                textValue="Add to circuit"
              >
                <Plus size={15} />
                <p className="font-semibold">Add to circuit</p>
              </DropdownItem>
              <DropdownItem
                id="delete"
                textValue="Delete"
                className="bg-rouge text-white rounded-xl"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2 size={15} />
                <p className="font-semibold">Delete</p>
              </DropdownItem>
            </DropdownMenu>
          </DropdownPopover>
        </Dropdown>
        <AlertDialog isOpen={isDeleteOpen} onOpenChange={onCloseALertHandler}>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-100 rounded-xl">
                <AlertDialog.CloseTrigger onClick={onCloseALertHandler}/>
                <AlertDialog.Header >
                  <AlertDialog.Heading className="font-bold text-rouge">
                    Delete this shop ?
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    This will permanently delete{" "}
                    <strong className="text-bleu">{shop.placeName}</strong> and all of its data.
                    This action cannot be undone.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button onClick={onCloseALertHandler} variant="tertiary" className="rounded-xl">
                    Cancel
                  </Button>
                  <Button isDisabled={loadingDelete} onClick={onDeleteHandler} className="bg-rouge text-white rounded-xl">
                    {
                      loadingDelete && (
                        <div className="flex justify-center items-center">
                          <Spinner size="sm" color="current"/>
                        </div>
                      )
                    }
                    <p>Delete Project</p>
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      </div>
      <div className="bg-white p-6 border-r-4 border-turquoise text-sm">
        <div className="text-gray-700 mb-2 ">
          <p>{shop.address}</p>
          <p>
            {shop.postalCode} {shop.city}
          </p>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          {shop?.phone ? (
            <>
              <Phone size={15} />
              <p>+33 {shop.phone}</p>
            </>
          ) : (
            <>
              <PhoneMissed size={10} />
              <p className="text-red-500">No phone</p>
            </>
          )}
        </div>
        <div className="my-4 text-sm">
          <VisitTiming text="Morning" isAuthorized={shop.canBeMorning} />
          <VisitTiming text="Lunchbreak" isAuthorized={shop.canBeLunchBreak} />
          <VisitTiming text="Afternoon" isAuthorized={shop.canBeAfternoon} />
        </div>
        <div
          className="flex items-center justify-end mt-3 gap-1 cursor-pointer"
          onClick={onClickPlanningHandler}
        >
          <p className="text-right text-sm text-gray-700 italic hover:underline">
            Show planning
          </p>
          <ChevronDown size={13} />
        </div>
        {loading && (
          <div className="flex items-center justify-center my-3">
            <Spinner size="md" className="text-turquoise" />
          </div>
        )}
        {displayPlanning && avails && <ShopPlanning avails={avails} />}
      </div>
    </div>
  );
};

export default ShopDetails;
