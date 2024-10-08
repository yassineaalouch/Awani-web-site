import Image from "next/image"

function SlidesOfDiscountHomePage() {
  return (
    <div>
        {/* had lpartie fiha slides dyal 3orod takhfidat */}
        <div className="w-screen min-h-96 bg-slate-500">
          <Image src='/image.png' alt="j" width={1900} height={100} className="w-screen"/>
        </div>
        {/* hadi 3la 9bl dik lpartie li ta7t slidat li fiha no9att bach tatmchi mn slide l okhra o fiha aussi les carts de decription dyal tawsil lqualite ... */}
        <div className="bg-white py-6 flex justify-center w-full">
            {/* hna kayn no9at li ikhliwk tatmchi mn slide l okhra  */}
            <div className="flex w-24 justify-between">
                <div className="size-3 rounded-full bg-slate-700"/>
                <div className="size-3 rounded-full bg-slate-700"/>
                <div className="size-3 rounded-full bg-slate-700"/>
                <div className="size-3 rounded-full bg-slate-700"/>
                <div className="size-3 rounded-full bg-slate-700"/>
            </div>
            {/* hna kayn les carts dyal lwasf dyal lqualite */}            
        </div>
    </div>
  )
}

export default SlidesOfDiscountHomePage
