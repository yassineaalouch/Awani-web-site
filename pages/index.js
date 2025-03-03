import Footer from "@/components/interfaceComponents/Footer";
import BlackBarTop from "@/components/blackBarTop";
import SlidesOfDiscountHomePage from "@/components/SlidesOfDiscountHomePage";
import QualiteCarts from "@/components/QualiteCarts";
import CategoriesHomePageSection from "@/components/CategoriesHomePageSection";
import ProductsHomePageSection from "@/components/ProductsHomePageSection";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { useState } from "react";
import PlaceOfAdvertisingBar from "@/components/PlaceOfAdvertisingBar";
import LastPlaceOfAdvertisingBar from "@/components/LastPlaceOfAdvertisingBar";
import Nav_bar_interface from "@/components/interfaceComponents/Nav-bar-interface";
import Packs from "@/components/Packs";
export async function getServerSideProps() {
  await mongooseConnect()
  const productList = await Product.find({}).populate('category').lean();
  return {
    props: {
      productList: JSON.parse(JSON.stringify(productList.reverse())),
    },
  };
}


export default function Home({ productList }) {
  const [productListClientSide, setProductListClientSide] = useState(productList)
  return (
    <>
      <BlackBarTop />
      <div className="h-9">
      </div>
      <Nav_bar_interface classNameGlobal={' mt-12'} classNameMenuUserIcon={' !top-16'} />

      <SlidesOfDiscountHomePage />
      <QualiteCarts />
      {/* <Packs /> */}
      <CategoriesHomePageSection />
      <ProductsHomePageSection productList={productListClientSide} petitTitre={"هذا الشهر"} grandTitre={" الأكثر مبيعاً"} />
      <PlaceOfAdvertisingBar />
      <ProductsHomePageSection productList={productListClientSide} petitTitre={"هذا الشهر"} grandTitre={"معدات كهربائية"} />
      <ProductsHomePageSection productList={productListClientSide} petitTitre={"هذا الشهر"} grandTitre={"كؤوس"} />
      <LastPlaceOfAdvertisingBar />
      <Footer className="mt-5"></Footer>

    </>
  );
}
