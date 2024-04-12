export default interface ICar {
  readonly id: string;
  name: string;
  type: string;
  price: number;
  stock: number;
  description: string;
  image_links: string[];
  audio_link: string;
}
