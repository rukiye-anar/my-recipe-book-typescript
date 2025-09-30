export interface Recipe {
  id: string;
  title: string;
  imageSrc: string;
  category: string;
  time: string;
  detail: string;
  //eğer bazı yerlerde bazı tanımlar yoksa opsyonel yap ör:category?:string
}