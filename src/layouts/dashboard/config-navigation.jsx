import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Kategoriyalar',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Mijozlar',
    path: '/clients',
    icon: icon('ic_user'),
  },
  {
    title: 'Mahsulotlar',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Buyurtmalar',
    path: '/orders',
    icon: icon('ic_blog'),
  },
  {
    title: 'Ranglar',
    path: '/color',
    icon: icon('ic_color'),
  },
];

export default navConfig;
