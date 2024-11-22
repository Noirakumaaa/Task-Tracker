import SideOption from "@/app/components/SideOption";
import UserTopNav from "@/app/components/UserTopNav";
import { ReactNode} from "react";

export default function HomePage({ children }: { children: ReactNode }) {

  return (
    <>
    <div className="grid grid-rows-[10%,auto] grid-cols-[1fr,1fr] h-[100%]">
    <div className='border h-full w-full grid grid-cols-[20%,70%,10%] col-span-2'>
        <UserTopNav />
      </div>
      <div className="col-span-2 flex">
        <SideOption /> 
        {children}
      </div>
    </div>


    </>

  );
}
