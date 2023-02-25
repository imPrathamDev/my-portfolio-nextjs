interface CategoryTypes {
  title: string;
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
}

interface ContentType {
  children: object[];
  markDefs: [];
  style: string;
  _key: string;
  _type: string;
}

export interface PostTypes {
  title: string;
  content: any;
  author: {
    name: string;
    image: { asset: { _ref: string; _type: string }; _type: string };
    bio: any;
    slug: { current: string; _type: string };
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
  };
  keywords: string;
  categories: CategoryTypes[];
  mainImage: object;
  publishedAt: Date;
  shortDesc: string;
  slug: { current: string; _type: string };
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
}

export interface ProjectTypes {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  githubURL: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  shortDesc: string;
  title: string;
}

export interface ToastTypes {
  toast: {
    show: boolean;
    msg: string;
  };
  setToast: (
    value: React.SetStateAction<{
      show: boolean;
      msg: string;
    }>
  ) => void;
}
