<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LocationType;

class LocationTypeSeeder extends Seeder
{
    public function run()
    {
        $locationTypes = [
            // Existing location types
            ['name' => 'Room', 'icon_package' => 'md', 'icon_name' => 'MdMeetingRoom'],
            ['name' => 'Box', 'icon_package' => 'fa', 'icon_name' => 'FaBoxOpen'],
            ['name' => 'Storage', 'icon_package' => 'ri', 'icon_name' => 'RiInboxArchiveLine'],
            ['name' => 'Container', 'icon_package' => 'pi', 'icon_name' => 'PiShippingContainerDuotone'],
            ['name' => 'Shelf', 'icon_package' => 'bs', 'icon_name' => 'BsBookshelf'],
            ['name' => 'Drawer', 'icon_package' => 'ri', 'icon_name' => 'RiArchiveDrawerLine'],
            // Additional location types
            ['name' => 'Closet', 'icon_package' => 'gi', 'icon_name' => 'BiCloset'],
            ['name' => 'Cabinet', 'icon_package' => 'gi', 'icon_name' => 'BiCabinet'],
            ['name' => 'Attic', 'icon_package' => 'gi', 'icon_name' => 'PiStairsLight'],
            ['name' => 'Basement', 'icon_package' => 'gi', 'icon_name' => 'PiStairsDuotone'],
            ['name' => 'Garage', 'icon_package' => 'gi', 'icon_name' => 'GiHomeGarage'],
            ['name' => 'Safe', 'icon_package' => 'gi', 'icon_name' => 'GiStrongbox'],
            ['name' => 'Locker', 'icon_package' => 'md', 'icon_name' => 'MdLock'],
            ['name' => 'Vehicle', 'icon_package' => 'fa', 'icon_name' => 'FaCar'],
            ['name' => 'Outdoor Area', 'icon_package' => 'fa', 'icon_name' => 'FaTree'],
            ['name' => 'Storage Unit', 'icon_package' => 'fa', 'icon_name' => 'FaWarehouse'],
            ['name' => 'Pantry', 'icon_package' => 'gi', 'icon_name' => 'GiWoodenCrate'],
            ['name' => 'Laundry Room', 'icon_package' => 'gi', 'icon_name' => 'GiWashingMachine'],
            ['name' => 'Bathroom', 'icon_package' => 'fa', 'icon_name' => 'FaBath'],
            ['name' => 'Kitchen', 'icon_package' => 'fa', 'icon_name' => 'FaUtensils'],
            ['name' => 'Bedroom', 'icon_package' => 'fa', 'icon_name' => 'FaBed'],
            ['name' => 'Living Room', 'icon_package' => 'fa', 'icon_name' => 'FaCouch'],
            ['name' => 'Office', 'icon_package' => 'fa', 'icon_name' => 'GiOfficeChair'],
            ['name' => 'Hallway', 'icon_package' => 'fa', 'icon_name' => 'FaDoorOpen'],
            ['name' => 'Garden Shed', 'icon_package' => 'pi', 'icon_name' => 'PiWarehouseDuotone'],
            ['name' => 'Toolbox', 'icon_package' => 'fa', 'icon_name' => 'FaToolbox'],
            ['name' => 'Briefcase', 'icon_package' => 'fa', 'icon_name' => 'FaBriefcase'],
            ['name' => 'Suitcase', 'icon_package' => 'fa', 'icon_name' => 'FaSuitcase'],
            ['name' => 'Bag', 'icon_package' => 'fa', 'icon_name' => 'FaShoppingBag'],
        ];

        foreach ($locationTypes as $type) {
            LocationType::create($type);
        }
    }
}
