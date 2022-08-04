import { BsCode } from 'react-icons/bs';
import { GiMusicalNotes } from 'react-icons/gi';
import { FaPaw, FaLaptopCode, FaCar, FaHamburger } from 'react-icons/fa';
import  { RiEmotionLaughLine } from 'react-icons/ri';
import { MdSportsEsports, MdSportsMotorsports } from 'react-icons/md';

export const topics = [
  {
    name: 'cars',
    icon: <FaCar />,
  },
  {
    name: 'racing',
    icon: <MdSportsMotorsports />,
  },
  {
    name: 'animals',
    icon: <FaPaw />,
  },
  {
    name: 'technology',
    icon: <FaLaptopCode />,
  },
  {
    name: 'comedy',
    icon: <RiEmotionLaughLine />,
  },
  {
    name: 'gaming',
    icon: <MdSportsEsports />,
  },
  {
    name: 'food',
    icon: <FaHamburger />,
  },
  {
    name: 'music',
    icon: <GiMusicalNotes />,
  },
];

export const footerList1 = [ 'About', 'Newsroom', 'Store', 'Contact', 'Careers' ]
export const footerList2 = [ 'Advertise', 'Developers', 'Terms', 'Privacy' ]
export const footerList3 = [ 'Help', 'Safety', 'Terms', 'Creator Portal', 'Community Guidelines' ]