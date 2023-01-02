import { Filters } from "./types";

export const snowboardBrandList: Array<Filters> = [
  'Burton',
  'Nitro',
  'Ride',
  'Backcountry',
  'Rome',
  'Roxy',
  'Drake']

export const bootsBrandList: Array<Filters> = [
  'ThirtyTwo',
  'Burton',
  'Vans',
  'DC',
  'Nitro',
  'Northwave Snow']

export const accessoriesBrandList: Array<Filters> = [
  'Smith',
  'Anon',
  'Sweet Protection',
  'Giro',
  'Oakley',
  'GoogleSoc']

export const categoriesList: Array<Filters> = ['snowboards', 'boots', 'accessories']

export const brandsList: Array<Filters> = [
  ...snowboardBrandList,
  ...bootsBrandList,
  ...accessoriesBrandList,
  ]
