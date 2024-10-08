import Image from "next/image"

function LastPlaceOfAdvertisingBar() {
  return (
    <div className="flex justify-around items-center">
      <div className="w-2/5">
            <Image src='/downAnonnceOne.png' className="w-full" width={500} height={500}/>
      </div>
      <div className="w-2/5">
            <Image src='/downAnonnceTow.png' className="w-full" width={500} height={500}/>
      </div>
    </div>
  )
}

export default LastPlaceOfAdvertisingBar
