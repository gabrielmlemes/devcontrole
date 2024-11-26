import { CustomerProps } from "@/utils/customer.type";

const ClientTicket = ({ name, email, phone}: CustomerProps) => {
  return (
    <article className="w-full border-2 p-3 rounded hover:bg-slate-100 duration-300">
      <div className="flex flex-col space-y-2 mb-2">
        <div>
          <span className="font-bold">Nome: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className="font-bold">Email: </span>
          <span>{email}</span>
        </div>
        <div>
          <span className="font-bold">Telefone: </span>
          <span>{phone}</span>
        </div>
      </div>
      <button className="bg-red-500 hover:scale-105 duration-300 text-white px-3 py-1 rounded">
        Deletar
      </button>
    </article>
  );
};

export default ClientTicket;
