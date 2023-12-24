import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getRandomSearch } from '@/getRandomSearch';

const SlugPage = () => {
  const router = useRouter();
  const [lowercaseSlug, setLowercaseSlug] = useState<string>('');
  const xInitial: any[] = [];
  const [x, setX] = useState(xInitial);
  const randomValue = getRandomSearch();
  const accessToken = process.env.ACCESS_TOKEN;

  useEffect(() => {
    if (typeof router.query.slug === 'string') {
      const lowercase = router.query.slug.toLowerCase();
      setLowercaseSlug(lowercase);
      const getType = async ()=>{
        const response = await fetch(`https://api.spotify.com/v1/search?q=${randomValue}&type=${lowercase}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`    
          },
        });
        const json = await response.json();
        // console.log(json)
        setX(json)         
      }
      getType()
    }
  }, [router.query.slug,randomValue,accessToken]);
  return (
    <div>
      {lowercaseSlug}
    </div>
  );
};

export default SlugPage;
