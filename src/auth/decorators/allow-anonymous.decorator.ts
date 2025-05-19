export const AllowAnonymous = () => {
  return (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
    console.log('AllowAnonymous decorator called' + target + propertyKey);
  };
};