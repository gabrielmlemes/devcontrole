import Link from "next/link";

interface HeaderDescriptionProps{
    name: string
    nameButton: string
    href: string
}

const HeaderDescription = ({name, nameButton, href}: HeaderDescriptionProps) => {
    return ( 
        <div className="flex justify-between items-center w-full mt-9 mb-6">
        <h2 className="font-bold text-3xl">{name}</h2>
        <Link
          href={href}
          className="bg-[#3B82F6] font-semibold px-5 py-1 hover:scale-105 duration-300 text-white rounded-md "
        >
          {nameButton}
        </Link>
      </div>
     );
}
 
export default HeaderDescription;