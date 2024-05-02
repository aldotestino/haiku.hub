import Haiku from '@/components/haiku';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

async function NewHaikuPage() {

  const { isAuthenticated, getUser } = getKindeServerSession(); 

  return (
    <Haiku isAuhenticated={await isAuthenticated()} user={await getUser()} />
  );
}

export default NewHaikuPage;