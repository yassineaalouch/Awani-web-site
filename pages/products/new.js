import Layout from "../../components/Layout";
import ProductForm from "@/components/ProductForm";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session || session.user.role !== 'admin') {
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      };
    }
  
    return {
      props: {
           Session: JSON.parse(JSON.stringify(session)),
      },
    };
  }

export default function NewProduct(Session){
    

    return (
    <Layout>
      <div className="max-w-[65.2rem]">
        <h1 className="this">Add product</h1>
        <ProductForm />
      </div>
    </Layout>
    );
}