import Image from "next/image"

function LastPlaceOfAdvertisingBar() {
  return (
    <div className="grid md:grid-cols-2 gap-5 p-10">
      <div className="w-full p-5 border-2 border-[#6bb41e] rounded-lg">
            <Image src='/diapo/freeDelivery.png' alt="downAnonnceOne" className="w-full" width={500} height={500}/>
      </div>
      <div className="w-full p-5 border-2 border-[#6bb41e] rounded-lg">
            <Image src='/diapo/packOrganize.png' alt="downAnonnceTow" className="w-full" width={500} height={500}/>
      </div>
    </div>
  )
}

export default LastPlaceOfAdvertisingBar
