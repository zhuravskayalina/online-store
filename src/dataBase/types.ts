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

export type SnowboardBrand =
  | 'Burton'
  | 'Nitro'
  | 'Ride'
  | 'Backcountry'
  | 'Rome'
  | 'Roxy'
  | 'Drake';

export type BootsBrand =
  | 'ThirtyTwo'
  | 'Burton'
  | 'Vans'
  | 'DC'
  | 'Nitro'
  | 'Northwave Snow';

export type AccessoriesBrand =
  | 'Smith'
  | 'Anon'
  | 'Sweet Protection'
  | 'Giro'
  | 'Oakley'
  | 'GoogleSoc';

export type Category = 'snowboards' | 'boots' | 'accessories';

export type BootsSize = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Filters =
  | SnowboardBrand
  | BootsBrand
  | AccessoriesBrand
  | Category
  | BootsSize;
