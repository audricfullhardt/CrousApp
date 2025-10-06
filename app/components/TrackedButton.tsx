import React from 'react';
import Button from './ui/Button';
import { trackEvent } from '@/utils/umami';

interface Props {
  title: string;
  onPress: () => void;
  path?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  textColor?: string;
  icon?: React.ReactNode;
}

export default function TrackedButton({ title, onPress, path, ...rest }: Props) {
  const handlePress = () => {
    trackEvent(`Clic ${title}`, path);
    onPress();
  };

  return <Button {...rest} onPress={handlePress} title={title} />;
}
