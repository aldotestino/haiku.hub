import Haiku from '@/components/haiku';
import { getHaiku } from '@/server/queries';

async function HaikuPage({ params }: { params: { id: string } }) {

  const haikuId = parseInt(params.id);
  const haiku = await getHaiku(haikuId);

  return (
    <Haiku haiku={haiku} />
  );
}

export default HaikuPage;