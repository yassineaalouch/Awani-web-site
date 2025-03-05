import InfoCard from "@/components/interfaceComponents/InfoCard"
import { FaTruckFast } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
function QualiteCarts() {
  return (
    <div className=" py-5 w-full flex justify-center ">
      <div className="px-3 md:px-0 md:w-3/5 flex justify-center ">
        <InfoCard
          Icon={LiaMoneyBillWaveSolid}
          title="الدفع عند الاستلام"
          description="تحقق من الطلب قبل دفع المال"
        />
        <InfoCard
          Icon={BiSupport}
          title="7/7 8:00-22:00"
          description="خدمة عملاء متاحة طوال الأسبوع"
        />
        <InfoCard
          Icon={FaTruckFast}
          title="توصيل مجاني وسريع"
          description="توصيل مجاني لجميع الطلبات التي تزيد قيمتها عن 120 درهمًا"
        />


      </div>
    </div>
  )
}

export default QualiteCarts
