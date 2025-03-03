import localFont from 'next/font/local';

export const fontArial = localFont({
  src: [
    {
      path: '../public/fonts/arial-webfont/ARIAL.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/arial-webfont/ArialMdm.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/arial-webfont/ARIALBD.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-arial', // Define the CSS variable
});
export const fontSouthwestSans = localFont({
  src: [
    {
      path: '../public/fonts/SouthwestSans/SouthwestSans-Regular.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SouthwestSans/SouthwestSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SouthwestSans/SouthwestSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-swSans', // Define the CSS variable
});

export const fontFairWater = localFont({
  src: [
    {
      path: '../public/fonts/fairWater/fairwater-script.woff',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-fairWater', // Define the CSS variable
});
