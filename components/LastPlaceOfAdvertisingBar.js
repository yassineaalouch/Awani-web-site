import Image from "next/image"

function LastPlaceOfAdvertisingBar() {
  return (
    <div className="grid md:grid-cols-2 gap-5 px-3">
      <div className="w-full">
            <Image src='/downAnonnceOne.png' alt="downAnonnceOne" className="w-full" width={500} height={500}/>
      </div>
      <div className="w-full">
            <Image src='/downAnonnceTow.png' alt="downAnonnceTow" className="w-full" width={500} height={500}/>
      </div>
    </div>
  )
}

export default LastPlaceOfAdvertisingBar
