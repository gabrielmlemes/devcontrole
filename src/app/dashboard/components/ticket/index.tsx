import { FiFile, FiTrash2 } from "react-icons/fi";

const TicketItem = () => {
  return (
    <>
      <tr className="border-b-2 bg-slate-100 hover:bg-gray-200 duration-300 border-b-slate-200 h-16 last:border-b-0">
        <td className="text-left pl-1">João</td>
        <td className="text-left">12/12/2012</td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">Aberto</span>
        </td>
        <td className="text-left">
            <button className="mr-2">
                <FiTrash2 size={22} color="red"/>
            </button>
            <button>
                <FiFile size={22} color="blue"/>
            </button>
        </td>
      </tr>
    </>
  );
};

export default TicketItem;