import {
  FaWater,
  FaSwimmingPool,
  FaHotTub,
  FaShuttleVan,
  FaSpa,
  FaParking,
  FaGolfBall,
  FaBeer,
  FaDog,
  FaBaby,
  FaTree,
  FaPersonBooth,
  FaSnowflake,
} from 'react-icons/fa';
import {
  MdWifi,
  MdKitchen,
  MdOutlineWaterDrop,
  MdOutlineCasino,
  MdFitnessCenter,
  MdEvStation,
  MdOutlineAcUnit,
  MdOutlineDryCleaning,
} from 'react-icons/md';
import { BiRestaurant, BiFridge } from 'react-icons/bi';
import { GiUmbrella } from 'react-icons/gi';
import { RiHotelLine } from 'react-icons/ri';

const allAmenities = [
  { title: 'Cots', icon: <FaBaby /> },
  { title: 'Gym', icon: <MdFitnessCenter /> },
  { title: 'Hot tub', icon: <FaHotTub /> },
  { title: 'Wi-Fi', icon: <MdWifi /> },
  { title: 'Airport shuttle', icon: <FaShuttleVan /> },
  { title: 'Spa', icon: <FaSpa /> },
  { title: 'Pool', icon: <FaSwimmingPool /> },
  { title: 'Ocean view', icon: <FaWater /> },
  { title: 'Water park', icon: <MdOutlineWaterDrop /> },
  { title: 'Pet-friendly', icon: <FaDog /> },
  { title: 'Air conditioned', icon: <MdOutlineAcUnit /> },
  { title: 'Restaurant', icon: <BiRestaurant /> },
  { title: 'Kitchen', icon: <MdKitchen /> },
  { title: 'EV charging', icon: <MdEvStation /> },
  { title: 'Washer & dryer', icon: <MdOutlineDryCleaning /> },
  { title: 'Casino', icon: <MdOutlineCasino /> },
  { title: 'Outdoor space', icon: <FaTree /> },
  { title: 'Parking', icon: <FaParking /> },
  { title: 'Golf course', icon: <FaGolfBall /> },
  { title: 'Bar', icon: <FaBeer /> },
  { title: '24/7 reception', icon: <RiHotelLine /> },
  { title: 'Sauna', icon: <FaSnowflake /> },
  { title: 'Sun umbrellas', icon: <GiUmbrella /> },
  { title: 'Adults only', icon: <FaPersonBooth /> },
  { title: 'Fridge', icon: <BiFridge /> },
];

export default allAmenities;
