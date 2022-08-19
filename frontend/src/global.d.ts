declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.png';
declare module '*.gif';
declare module '*.svg';
declare module '*.jpg';