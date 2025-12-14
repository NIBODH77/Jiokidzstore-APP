
import { useWindowDimensions } from 'react-native';
import { useMemo } from 'react';

export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export interface ResponsiveValues {
  // Screen size
  width: number;
  height: number;
  
  // Breakpoint detection
  breakpoint: BreakpointName;
  isXSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
  isXXLarge: boolean;
  isXXXLarge: boolean;
  
  // Responsive values
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  columns: number;
  padding: number;
  margin: number;
  iconSize: number;
  buttonHeight: number;
  inputHeight: number;
}

export function useResponsive(): ResponsiveValues {
  const { width, height } = useWindowDimensions();
  
  const responsive = useMemo(() => {
    // Define breakpoints (covering all mobile, tablet, and desktop sizes)
    const breakpoints = {
      xs: 0,      // 320px - 374px (small phones)
      sm: 375,    // 375px - 413px (iPhone 6/7/8, standard phones)
      md: 414,    // 414px - 767px (iPhone Plus, large phones)
      lg: 768,    // 768px - 1023px (tablets portrait)
      xl: 1024,   // 1024px - 1365px (tablets landscape, small laptops)
      xxl: 1366,  // 1366px - 1919px (laptops, desktops)
      xxxl: 1920, // 1920px+ (large desktops, 4K)
    };
    
    // Determine current breakpoint
    let breakpoint: BreakpointName = 'xs';
    if (width >= breakpoints.xxxl) breakpoint = 'xxxl';
    else if (width >= breakpoints.xxl) breakpoint = 'xxl';
    else if (width >= breakpoints.xl) breakpoint = 'xl';
    else if (width >= breakpoints.lg) breakpoint = 'lg';
    else if (width >= breakpoints.md) breakpoint = 'md';
    else if (width >= breakpoints.sm) breakpoint = 'sm';
    
    // Calculate responsive spacing
    const spacing = {
      xs: width < 360 ? 4 : width < 768 ? 6 : 8,
      sm: width < 360 ? 8 : width < 768 ? 10 : 12,
      md: width < 360 ? 12 : width < 768 ? 14 : 16,
      lg: width < 360 ? 16 : width < 768 ? 18 : 20,
      xl: width < 360 ? 20 : width < 768 ? 24 : width < 1024 ? 28 : 32,
      xxl: width < 360 ? 28 : width < 768 ? 32 : width < 1024 ? 40 : 48,
    };
    
    // Calculate responsive font sizes
    const fontSize = {
      xs: width < 360 ? 10 : width < 768 ? 11 : 12,
      sm: width < 360 ? 12 : width < 768 ? 13 : 14,
      md: width < 360 ? 14 : width < 768 ? 15 : 16,
      lg: width < 360 ? 16 : width < 768 ? 17 : 18,
      xl: width < 360 ? 20 : width < 768 ? 22 : width < 1024 ? 24 : 28,
      xxl: width < 360 ? 24 : width < 768 ? 28 : width < 1024 ? 32 : 36,
    };
    
    // Calculate number of columns for grid layouts
    const columns = 
      width < 360 ? 1 :
      width < 414 ? 2 :
      width < 768 ? 2 :
      width < 1024 ? 3 :
      width < 1366 ? 4 :
      width < 1920 ? 5 : 6;
    
    // Calculate responsive padding
    const padding = 
      width < 360 ? 12 :
      width < 414 ? 16 :
      width < 768 ? 20 :
      width < 1024 ? 24 :
      width < 1366 ? 32 : 40;
    
    // Calculate responsive margin
    const margin = 
      width < 360 ? 8 :
      width < 414 ? 12 :
      width < 768 ? 16 :
      width < 1024 ? 20 : 24;
    
    // Calculate responsive icon size
    const iconSize = 
      width < 360 ? 20 :
      width < 414 ? 24 :
      width < 768 ? 28 :
      width < 1024 ? 32 : 36;
    
    // Calculate responsive button height
    const buttonHeight = 
      width < 360 ? 44 :
      width < 414 ? 48 :
      width < 768 ? 52 :
      width < 1024 ? 56 : 60;
    
    // Calculate responsive input height
    const inputHeight = 
      width < 360 ? 40 :
      width < 414 ? 44 :
      width < 768 ? 48 :
      width < 1024 ? 52 : 56;
    
    return {
      width,
      height,
      breakpoint,
      isXSmall: breakpoint === 'xs',
      isSmall: breakpoint === 'sm',
      isMedium: breakpoint === 'md',
      isLarge: breakpoint === 'lg',
      isXLarge: breakpoint === 'xl',
      isXXLarge: breakpoint === 'xxl',
      isXXXLarge: breakpoint === 'xxxl',
      spacing,
      fontSize,
      columns,
      padding,
      margin,
      iconSize,
      buttonHeight,
      inputHeight,
    };
  }, [width, height]);
  
  return responsive;
}
