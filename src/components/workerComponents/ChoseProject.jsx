import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";



function ChoseProject() {
  return (
    <div className="p-4 container mx-auto">
        <h2 className='capitalize text-white font-semibold flex flex-col text-center text-4xl'>
            company study 
            <span className='font-light text-lg pt-1'>--development research--</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1  lg:pt-8  gap-4 ">

            <Link to="/worker/controller-panel" className="bg-[#1F2025] space-y-10 py-36 rounded-lg shadow-2xl">
                <div>
                    <img src={Logo} alt="" />
                </div>
                <div className="text-center text-white font-extrabold font-mono text-4xl">
                    <span>Atlas Project</span>
                </div>
            </Link>

            <Link to="/worker#meta-houses-project" className="bg-[#1F2025] space-y-10 py-36 rounded-lg shadow-2xl">
                <div>
                    <img src={Logo} alt="" />
                </div>
                <div className="text-center text-white font-extrabold font-mono text-4xl">
                    <span>Meta Houses</span>
                </div>
            </Link>

            <Link to="/worker#realtoric-project" className="bg-[#1F2025] space-y-10 py-36 rounded-lg shadow-2xl">
                <div>
                    <img src={Logo} alt="" />
                </div>
                <div className="text-center text-white font-extrabold font-mono text-4xl">
                    <span>Realtoric</span>
                </div>
            </Link>
            
        </div>
    </div>
  )
}

export default ChoseProject