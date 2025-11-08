import { IoSearch } from "react-icons/io5";
import User from "./User";

const Sidebar = () => {
  return (
    <div className="max-w-[20rem] w-full h-screen flex flex-col border-r border-r-white/10">
      <h1 className="bg-black mx-3 mt-3 rounded-lg px-2 py-1 text-[#7080ff] text-xl font-semibold">
        DevTalks
      </h1>
      <div className="p-3">
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="Search" />
          <IoSearch />
        </label>
      </div>

      <div className="h-screen overflow-y-scroll px-3">
        <User />
      </div>

      <div className="bg-zinc-800 flex justify-between items-center p-3">
        <div class="avatar">
          <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <button class="btn btn-active btn-error btn-sm px-4">Logout</button>
      </div>
      
    </div>
  );
};

export default Sidebar;
