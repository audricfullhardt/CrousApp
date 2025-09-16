import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

type Props = Omit<ComponentProps<typeof TouchableOpacity>, 'onPress'> & { href: string };

export function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={async () => {
        if (Platform.OS !== 'web') {
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        } else {
          // On web, open in new tab
          window.open(href, '_blank');
        }
      }}
    >
      {children}
    </TouchableOpacity>
  );
}
