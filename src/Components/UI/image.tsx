interface IProps {
  ImageURL: string;
  alt: string;
  className?: string;
}
const ProductImage = ({ ImageURL, alt, className }: IProps) => {
  return <img src={ImageURL} alt={alt} className={className} />;
};
export default ProductImage;
