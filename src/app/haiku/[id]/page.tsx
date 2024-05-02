import Haiku from '@/components/haiku';
import { getHaiku } from '@/server/queries';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

async function HaikuPage({ params }: { params: { id: string } }) {

  const { isAuthenticated, getUser } = getKindeServerSession(); 

  const haikuId = parseInt(params.id);
  const haiku = await getHaiku(haikuId);

  return (
    <Haiku haiku={haiku} isAuhenticated={await isAuthenticated()} user={await getUser()} />
  );
}

export default HaikuPage;