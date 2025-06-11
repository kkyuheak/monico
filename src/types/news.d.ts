interface NewsDataType {
  id: string;
  sections: string[];
  title: string;
  publisher: string;
  author: string;
  summary: string;
  highlight: null;
  image_url: string;
  thumbnail_url: string | null;
  content_url: string;
  esg: null;
  companies: [];
  entities: [];
  published_at: string;
  body: null;
}
