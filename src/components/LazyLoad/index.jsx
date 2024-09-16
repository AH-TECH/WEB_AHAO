import {Suspense } from 'react';
import CustomLoading from '../CustomLoading';
const LazyWrapper = ({ children }) => (
  
  <Suspense fallback={<CustomLoading/>}>
    {children}
  </Suspense>
);
 
export default LazyWrapper;
