import { Flex } from '@chakra-ui/react';
import { Catalogue } from './Catalogue';
import { useSelector } from 'react-redux';
const { REACT_APP_API_URL } = process.env;

export const GridView = () => {
  const products = useSelector((state) => state.products.products);
  const getProfileImage = (product) => {
    if (product.images) {
      const profiles = product.images.filter(
        (image) => image.isProfile === true
      );
      if (profiles.length > 0) {
        return `${profiles[0].path}`;
      }
    }
    return 'https://bit.ly/dan-abramov';
  };
  return (
    <Flex gap='10' justifyContent={['space-evenly']} py='30px' wrap={'wrap'}>
      {products.map((product, i) => {
        product.profileImage = getProfileImage(product);
        return <Catalogue key={i} product={product} />;
      })}
    </Flex>
  );
};
