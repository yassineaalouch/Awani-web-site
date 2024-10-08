import Image from "next/image"

function PlaceOfAdvertisingBar() {
  return (
    <div>
      <div className="max-w-[90rem] m-auto h-fit bg-fuchsia-900">
        <Image src='/image.png' alt="j" width={1900} height={100} className="w-screen"/>
      </div>
    </div>
  )
}

export default PlaceOfAdvertisingBar
