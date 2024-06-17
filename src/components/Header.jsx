
import MenuItem from "./MenuItem";
import {AiFillHome} from 'react-icons/ai';
import {BsFillInfoCircleFill} from 'react-icons/bs';

export default function Header() {
    return (
        <div className="flex justify-center items-center p-3 max-w-6xl mx-auto">
            <div className="flex gap-4">
                <MenuItem title="home" address="/" Icon={AiFillHome}/>
                <MenuItem title="Members
" address="/team" Icon={BsFillInfoCircleFill}/>
            </div>
        </div>
    )
}