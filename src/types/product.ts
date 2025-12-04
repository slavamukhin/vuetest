export interface CardProps {
  product: Product;
  wrapperClass?: 'small-wrapper' | 'bucket-view'
}

export interface Product {
  SKU: number
  additionalImages: AdditionalImages
  color: string
  createdAt: string
  description: string
  dimensions: string
  discountPercent: number
  documentId: string
  id: number
  image: string
  isFavorite: null
  itemsInStock: 1
  material: string
  price: number
  publishedAt: string
  title: string
  updatedAt: string
  weight: number
}

type KeyImg = `imageURL${number}`

interface AdditionalImages {
  additionalImages: Record<KeyImg, string>[]
}

export interface QueryParams {
  search: string,
  inStock: boolean,
  onSell: boolean
  sorted: 'title' | 'price' | ''
}
