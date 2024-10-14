import InfoCard from "@/interfaceComponents/InfoCard"
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
                            description="نعيد الأموال خلال 30 يومًا"
                            />
                            <InfoCard
                                Icon={BiSupport}
                                title="24/7 خدمة عملاء 24/7"
                                description="خدمة عملاء 24/7 "
                            />    
                            <InfoCard
                                Icon={FaTruckFast}
                                title="توصيل مجاني وسريع"
                                description="توصيل مجاني لجميع الطلبات التي تزيد قيمتها عن 140 دولارًا"
                            />    

                </div>
        </div>
  )
}

export default QualiteCarts
