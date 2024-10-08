import InfoCard from "@/interfaceComponents/InfoCard"
import { IoSettings } from "react-icons/io5"

function QualiteCarts() {
  return (
              <div className=" py-5 ">
                <div className="grid-cols-3 m-auto w-4/5 gap-5 grid">
                    <InfoCard
                        Icon={IoSettings}
                        title="الدفع عند الاستلام"
                        description="نعيد الأموال خلال 30 يومًا"
                    />
                    <InfoCard
                        Icon={IoSettings}
                        title="24/7 خدمة عملاء 24/7"
                        description="خدمة عملاء ودية 24/7 خدمة عملاء ودودة"
                    />
                    <InfoCard
                        Icon={IoSettings}
                        title="توصيل مجاني وسريع"
                        description="توصيل مجاني لجميع الطلبات التي تزيد قيمتها عن 140 دولارًا"
                    />
                </div>
        </div>
  )
}

export default QualiteCarts
