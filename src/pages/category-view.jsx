import React from 'react';
import { useParams } from 'react-router-dom';

import { CategoryView } from 'src/sections/category/view';

export default function CategoryViewPage() {
  const { id } = useParams();
  return <CategoryView categoryId={id} />;
}
