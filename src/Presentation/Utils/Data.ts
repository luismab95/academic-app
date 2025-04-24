export interface IWelcomeData {
  id: number;
  title: string;
  description: string;
  sortDescrition: string;
  image: any;
}

export interface IBannerData {
  id: number;
  bg_image: any;
  bg_image_1: any;
  title: string;
  offer: string;
  buttonText: string;
  showButton: boolean;
}

export const welcomeData: IWelcomeData[] = [
  {
    id: 1,
    title: 'Tus certificados académicos de manera rápida, segura y confiable',
    description: 'Gestiona tus solicitudes sin complicaciones',
    sortDescrition: 'y mantén tu historial siempre disponible.',
    image: require('../../../assets/Images/Welcome/intro_1.png'),
  },
  {
    id: 2,
    title: 'Solicita, verifica y descarga tus certificados académicos',
    description: 'En un solo lugar,',
    sortDescrition: 'es fácil, rápido y seguro.',
    image: require('../../../assets/Images/Welcome/intro_2.png'),
  },
  {
    id: 3,
    title: 'Tu historial académico al alcance de tu mano.',
    description: 'Accede a tus certificados cuando los necesites,',
    sortDescrition: 'con total seguridad y sin trámites innecesarios.',
    image: require('../../../assets/Images/Welcome/intro_3.png'),
  },
];

export const bannerData: IBannerData[] = [
  {
    id: 2,
    bg_image: require('../../../assets/Images/carousel/caroules_2.png'),
    bg_image_1: require('../../../assets/Images/carousel/caroules_image_2.png'),
    title: 'Revisa nuestra Política de Privacidad',
    offer: 'Conoce cómo protegemos tu información.',
    buttonText: 'Explora ahora',
    showButton: true,
  },
  {
    id: 1,
    bg_image: require('../../../assets/Images/carousel/carousel_1.png'),
    bg_image_1: require('../../../assets/Images/carousel/carousel_image_1.png'),
    title: 'Accede a tus Certificados Académicos',
    offer: 'Rápido y seguro.',
    buttonText: 'Explora ahora',
    showButton: true,
  },
];
