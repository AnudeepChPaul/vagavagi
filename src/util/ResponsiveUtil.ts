import { Dimensions, PixelRatio } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { OrientationChangeEvent } from 'expo-screen-orientation'

export type DimensionConfig = {
  width: number
  height: number
  scale: number
}

// Base width for scaling calculations
const BASE_WIDTH = 375

// Configuration object for fine-tuning text sizes
const fontConfig = {
  phone: {
    small: { min: 0.8, max: 1 },
    medium: { min: 0.9, max: 1.1 },
    large: { min: 1, max: 1.2 },
  },
  tablet: {
    small: { min: 1.3, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.5, max: 1.7 },
  },
}

const dim = new Map<string, number>()

const calculateDimensions = (): void => {
  const { width, height } = Dimensions.get('window')
  const scale = width > height ? height : width

  dim.set('width', width)
  dim.set('height', height)
  dim.set('scale', scale)
}

export const getDeviceType = (): 'phone' | 'tablet' => {
  const pixelDensity = PixelRatio.get()
  const adjustedWidth = dim.get('width') * pixelDensity
  const adjustedHeight = dim.get('height') * pixelDensity

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return 'tablet'
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return 'tablet'
  } else {
    return 'phone'
  }
}

const getScreenSizeCategory = (): 'small' | 'medium' | 'large' => {
  if (dim.get('scale') < 350) return 'small'
  if (dim.get('scale') > 500) return 'large'
  return 'medium'
}

export const getFontSize = (size: number): number => {
  const deviceType = getDeviceType()
  const screenCategory = getScreenSizeCategory()
  const config = fontConfig[deviceType][screenCategory]
  const scaleFactor = dim.get('scale') / BASE_WIDTH

  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, config.min),
    config.max
  )
  let newSize = size * clampedScaleFactor

  if (deviceType === 'tablet') {
    newSize *= 1.1 // Increase tablet font sizes by an additional 10%
  }

  return (
    Math.round(PixelRatio.roundToNearestPixel(newSize)) /
    PixelRatio.getFontScale()
  )
}

// Function to adjust font configuration
export const adjustFontConfig = (
  deviceType: 'phone' | 'tablet',
  sizeCategory: 'small' | 'medium' | 'large',
  minScale: number,
  maxScale: number
) => {
  fontConfig[deviceType][sizeCategory] = { min: minScale, max: maxScale }
}

const onOrientationChangeListener = (
  orientationChangeEvent: OrientationChangeEvent
) => {
  calculateDimensions()
}

export function initiateListenrs() {
  const orientationListener = ScreenOrientation.addOrientationChangeListener(
    onOrientationChangeListener
  )

  return () => {
    ScreenOrientation.removeOrientationChangeListener(orientationListener)
  }
}
