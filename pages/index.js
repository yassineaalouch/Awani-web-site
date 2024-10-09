import Footer from "@/interfaceComponents/Footer";
import BlackBarTop from "@/components/blackBarTop";
import NavBarTajrProject from "@/components/NavBarTajrProject";
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
import Head from "next/head";

export async function getServerSideProps() {
  await mongooseConnect()
  const productList = await Product.find({}).populate('category').lean();
  console.log("productList in server component", productList);  return {
      props: {
          productList: JSON.parse(JSON.stringify(productList.reverse())),
      },
  };
}
export default function Home({productList}) {
  const[productListClientSide,setProductListClientSide]=useState(productList)
  return (
    <>
    <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.Next_PUBLIC_GOOGLE_ANALYTICS}`}/>
        <script
        dangerouslySetInnerHTML={{
          _html:`
                window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
              `
        }}
        />
    </Head>
      <BlackBarTop/>
      <NavBarTajrProject/>
      <SlidesOfDiscountHomePage/>
      <QualiteCarts/>
      <CategoriesHomePageSection/>
      <ProductsHomePageSection productList={productListClientSide} petitTitre={"هذا الشهر"} grandTitre={"المنتجات الأكثر مبيعاً"}/>
      <PlaceOfAdvertisingBar/>
      <ProductsHomePageSection productList={productListClientSide} petitTitre={"هذا الشهر"} grandTitre={"المنتجات الأكثر مبيعاً"}/>
      <ProductsHomePageSection productList={productListClientSide} petitTitre={"هذا الشهر"} grandTitre={"المنتجات الأكثر مبيعاً"}/>
      <LastPlaceOfAdvertisingBar/>
      <Footer className="mt-5"></Footer>
    
    </>
  );
}
