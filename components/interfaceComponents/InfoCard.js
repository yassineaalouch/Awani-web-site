const InfoCard = ({ Icon, title, description }) => {
  return (
    <div className=" w-4/12  text-center">
      <div className="w-full flex justify-center items-center mb-1 mt-1 " >
        <div className="bg-gray-300 p-[6px] rounded-full">
          <div className="bg-black p-[6px] rounded-full">
            <Icon className="size-8 text-white font- " />
          </div>
        </div>
      </div>
      <div className="space-y-3 mt-5">
        <h2 className="font-extrabold text-xl ">{title}</h2>
        <p className="text-sm px-3 pb-2">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
