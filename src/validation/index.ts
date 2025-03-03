/**
 * Validates a product object to ensure it meets specific criteria.
 *
 * @param {Object} product - The product object to be validated.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product image.
 * @param {string} product.price - The price of the product.
 *
 * @returns {Object} An object containing error messages for each invalid field.
 * @returns {string} errors.title - Error message for the title field.
 * @returns {string} errors.description - Error message for the description field.
 * @returns {string} errors.imageURL - Error message for the image URL field.
 * @returns {string} errors.price - Error message for the price field.
 */
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  // Regular expression to validate URL (Note: This regex might need adjustment for full URL validation)
  const validURL = /^(ftp|http|https):\/\/[^\s]+$/i.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Title must be between 10 and 80 characters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = "Description must be between 10 and 900 characters";
  }
  if (!product.imageURL.trim() || !validURL) {
    errors.imageURL = "This is not a valid image URL";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Price must be a number";
  }
  return errors;
};
