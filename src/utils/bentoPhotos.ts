type BentoPhoto = {
    src: string;
    aspectRatio: Aspect;
    alt: string;
    width: number;
    height: number;
};

type Aspect = "Wide" | "Tall" | "Square";

export const bentoPhotos : BentoPhoto[] = [
    {
        src: "/images/photos/bento/foto-cuadrado.jpeg",
        aspectRatio: "Square",
        alt: "iphone-16-back-face",
        width: 400,
        height: 300,
    },
    {
        src: "/images/photos/bento/foto-paisaje.jpeg",
        aspectRatio: "Wide",
        alt: "iphone-15-pro-back-face",
        width: 200,
        height: 100,
    },
    {
        src: "/images/photos/bento/foto-pies-vertical.jpeg",
        aspectRatio: "Tall",
        alt: "s22-ultra-back-face",
        width: 400,
        height: 300,
    },
    {
        src: "/images/photos/bento/gabriel-con-vaca.jpeg",
        aspectRatio: "Tall",
        alt: "instax-camera",
        width: 400,
        height: 300,
    },
    
    {
        src: "/images/photos/bento/gabriel-con-vaca.jpeg",
        aspectRatio: "Tall",
        alt: "instax-camera",
        width: 400,
        height: 300,
    },
    {
        src: "/images/photos/bento/foto-pies-vertical.jpeg",
        aspectRatio: "Tall",
        alt: "s22-ultra-back-face",
        width: 400,
        height: 300,
    },
    {
        src: "/images/photos/bento/foto-paisaje.jpeg",
        aspectRatio: "Wide",
        alt: "iphone-15-pro-back-face",
        width: 200,
        height: 100,
    },
    {
        src: "/images/photos/bento/foto-pies-vertical.jpeg",
        aspectRatio: "Tall",
        alt: "s22-ultra-back-face",
        width: 400,
        height: 300,
    },
    {
        src: "/images/photos/bento/foto-pies-vertical.jpeg",
        aspectRatio: "Tall",
        alt: "s22-ultra-back-face",
        width: 400,
        height: 300,
    },
];