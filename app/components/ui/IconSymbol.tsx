// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'gear': 'settings',
  'fork.knife': 'restaurant',
  'info.circle': 'info',
  'heart': 'favorite-border',
  'heart.fill': 'favorite',
  'message': 'chat',
  'speaker.wave.2': 'volume-up',
  'slider.horizontal.3': 'tune',
  'location': 'location-on',
  'map': 'map',
  'arrow.counterclockwise': 'refresh',
  'creditcard': 'credit-card',
  'gearshape': 'settings',
  'xmark': 'close',
  'arrow.right': 'arrow-forward',
  'graduationcap': 'school',
  'flame': 'local-fire-department',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}

export default IconSymbol; 