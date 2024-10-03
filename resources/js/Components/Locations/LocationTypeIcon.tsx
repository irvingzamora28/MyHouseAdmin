import React from 'react';
import { MdMeetingRoom, MdLock, MdHelpOutline } from 'react-icons/md';
import {
    FaBoxOpen,
    FaCar,
    FaTree,
    FaWarehouse,
    FaBath,
    FaUtensils,
    FaBed,
    FaCouch,
    FaBriefcase,
    FaDoorOpen,
    FaToolbox,
    FaSuitcase,
    FaShoppingBag,
} from 'react-icons/fa';
import { RiInboxArchiveLine, RiArchiveDrawerLine } from 'react-icons/ri';
import { PiShippingContainerDuotone, PiWarehouseDuotone, PiStairsLight, PiStairsDuotone } from 'react-icons/pi';
import { BiCloset, BiCabinet } from 'react-icons/bi';
import { BsBookshelf } from 'react-icons/bs';
import { GiHomeGarage, GiStrongbox, GiWoodenCrate, GiWashingMachine, GiOfficeChair } from 'react-icons/gi';

interface IconComponents {
    [key: string]: React.ComponentType<{ className?: string }>;
}

const iconComponents: IconComponents = {
    MdMeetingRoom,
    FaBoxOpen,
    RiInboxArchiveLine,
    PiShippingContainerDuotone,
    BsBookshelf,
    RiArchiveDrawerLine,
    BiCloset,
    BiCabinet,
    GiHomeGarage,
    PiWarehouseDuotone,
    PiStairsLight,
    PiStairsDuotone,
    GiStrongbox,
    MdLock,
    FaCar,
    FaTree,
    FaWarehouse,
    GiWoodenCrate,
    GiWashingMachine,
    GiOfficeChair,
    FaBath,
    FaUtensils,
    FaBed,
    FaCouch,
    FaBriefcase,
    FaDoorOpen,
    FaToolbox,
    FaSuitcase,
    FaShoppingBag,
};

const DefaultIcon = MdHelpOutline;

interface LocationTypeIconProps {
    iconName: string;
}

const LocationTypeIcon: React.FC<LocationTypeIconProps> = ({ iconName }) => {
    const IconComponent = iconComponents[iconName] || DefaultIcon;
    return <IconComponent className="text-indigo-500 w-6 h-6" />;
};

export default LocationTypeIcon;
