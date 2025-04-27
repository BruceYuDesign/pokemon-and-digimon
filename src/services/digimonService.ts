import { requestHandler } from '~/libs/requestHandler';


export interface DigimonItem {
  id: number;
  name: string;
  href: string;
  image: string;
}


interface Digimons {
  content: Array<DigimonItem>;
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
  }
}


interface Digimon {
  id: number;
  name: string;
  xAntibody: boolean;
  images: Array<{
    href: string;
    transparent: boolean;
  }>;
  levels: Array<{
    id: number;
    level: string;
  }>;
  types: Array<{
    id: number;
    type: string;
  }>;
  attributes: Array<{
    id: number;
    attribute: string;
  }>;
  fields: Array<{
    id: number;
    field: string;
    image: string;
  }>;
  releaseDate: string;
  descriptions: Array<{
    origin: string;
    language: string;
    description: string;
  }>;
  skills: Array<{
    id: number;
    skill: string;
    translation: string;
    description: string;
  }>;
  priorEvolutions: Array<{
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
  }>;
  nextEvolutions: Array<{
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
  }>;
}


export interface DigimonDetail {
  id: number | string;
  name: string;
  thumbnail: string;
  types: Array<string>;
  description: string;
}


const defaultUrl = 'https://digi-api.com/api/v1/digimon?page=0&pageSize=18';


export async function getDigimons(url?: string): Promise<Digimons> {
  const data: Digimons = await requestHandler({
    url: url || defaultUrl,
  });

  return data;
}


export async function getDigimon(url: string): Promise<DigimonDetail> {
  const data: Digimon = await requestHandler({ url });

  return {
    id: data.id,
    name: data.name.replaceAll('-', ' ').trim(),
    thumbnail: data.images[0].href,
    types: data.types.map(({ type }) => type),
    description: data.descriptions.find(({ language }) => language === 'en_us')?.description || '',
  }
}