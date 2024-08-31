import UserAccount from '../account';
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session ) {
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
}
const Account = () => {
    return (
        <UserAccount>
            account
        </UserAccount>
    );
}

export default Account;
