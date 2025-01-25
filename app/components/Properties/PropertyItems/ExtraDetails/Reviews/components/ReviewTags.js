import {
  FaTree,
  FaHotTub,
  FaSpa,
  FaWater,
  FaParking,
  FaBaby,
  FaSnowflake,
  FaPersonBooth,
  FaDog,
} from 'react-icons/fa';
import {
  MdFitnessCenter,
  MdOutlineDryCleaning,
  MdOutlineAcUnit,
  MdEvStation,
  MdOutlineCasino,
  MdWifi,
} from 'react-icons/md';
import { BiRestaurant } from 'react-icons/bi';
import { RiHotelLine } from 'react-icons/ri';

const allReviewTags = [
  { title: 'Style', icon: <FaTree /> },
  { title: 'Facilities and amenities', icon: <MdFitnessCenter /> },
  { title: 'Activities', icon: <FaHotTub /> },
  { title: 'Wellness', icon: <FaSpa /> },
  { title: 'Experience', icon: <FaWater /> },
  { title: 'Location', icon: <FaParking /> },
  { title: 'Recommendation', icon: <FaBaby /> },
  { title: 'Views', icon: <FaSnowflake /> },
  { title: 'Dining and cuisine', icon: <BiRestaurant /> },
  { title: 'Room and accommodation', icon: <FaPersonBooth /> }, // Assuming "Room and accommodation" refers to this
  { title: 'Family-friendly', icon: <FaDog /> },
  { title: 'Safety', icon: <MdWifi /> }, // Added "Safety" as an assumption
  { title: 'Cleanliness', icon: <MdOutlineDryCleaning /> },
  { title: 'Comfort', icon: <MdOutlineAcUnit /> },
  { title: 'Staff', icon: <RiHotelLine /> },
  { title: 'Services', icon: <MdEvStation /> },
  { title: 'Miscellaneous', icon: <MdOutlineCasino /> },
];

export default allReviewTags;
