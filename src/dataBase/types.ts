export interface ProductData {
  category: Category;
  brand: SnowboardBrand | AccessoriesBrand | BootsBrand;
  name: string;
  price: number;
  rating: number;
  images: string[];
  quantity: number;
  description: string;
  sizes?: BootsSize[];
  vendorCode: number;
}

type SnowboardBrand =
  | 'Burton'
  | 'Nitro'
  | 'Ride'
  | 'Backcountry'
  | 'Rome'
  | 'Roxy'
  | 'Drake';

type BootsBrand =
  | 'ThirtyTwo'
  | 'Burton'
  | 'Vans'
  | 'DC'
  | 'Nitro'
  | 'Northwave Snow';

type AccessoriesBrand =
  | 'Smith'
  | 'Anon'
  | 'Sweet Protection'
  | 'Giro'
  | 'Oakley'
  | 'GoogleSoc';

type Category = 'snowboards' | 'boots' | 'accessories';

type BootsSize = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

