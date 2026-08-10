import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import LogoDay from '@/assets/Brewser_logo_day_small.png';
import LogoNight from '@/assets/Brewser_logo_night_small_2.png';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: (
        <span className="inline-flex items-center gap-2">
          {/* Light theme logo */}
          <img
            src={LogoDay.src}
            width={LogoDay.width}
            height={LogoDay.height}
            alt=""
            className="h-6 w-6 rounded-sm dark:hidden"
          />
          {/* Dark theme logo */}
          <img
            src={LogoNight.src}
            width={LogoNight.width}
            height={LogoNight.height}
            alt=""
            className="hidden h-6 w-6 rounded-sm dark:block"
          />
          {appName}
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/Brewser`,
  };
}
