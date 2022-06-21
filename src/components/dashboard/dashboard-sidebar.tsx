import type { ElementType, FC } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, IconButton, List } from '@mui/material';
import { DashboardSidebarItem } from './dashboard-sidebar-item';
import { Scrollbar } from '../scrollbar';
import { ChevronLeft as ChevronLeftIcon } from '../../icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '../../icons/chevron-right';
import { Cog as CogIcon } from '../../icons/cog';
import { ColorSwatch as ColorSwatchIcon } from '../../icons/color-swatch';
import { CustomChartPie as ChartPieIcon } from '../../icons/custom-chart-pie';
import { CustomCube as CubeIcon } from '../../icons/custom-cube';
import { CustomShoppingCart as ShoppingCartIcon } from '../../icons/custom-shopping-cart';
import { CustomUsers as UsersIcon } from '../../icons/custom-users';
import { DocumentText as DocumentTextIcon } from '../../icons/document-text';
import { OfficeBuilding as OfficeBuildingIcon } from '../../icons/office-building';
import { SwitchHorizontal as SwitchHorizontalIcon } from '../../icons/switch-horizontal';
import { ReceiptTax as ReceiptTaxIcon } from '../../icons/receipt-tax';
import { Template as TemplateIcon } from '../../icons/template';

interface DashboardSidebarProps {
  onPin: () => void;
  pinned: boolean;
}

interface Item {
  external?: boolean;
  href?: string;
  icon: ElementType;
  items?: Array<{ href: string; title: string; partialMatch?: boolean; }>;
  partialMatch?: boolean;
  title: string;
}

const items: Item[] = [
  {
    icon: TemplateIcon,
    title: 'Application',
    href: '/applications',
  },
  {
    icon: DocumentTextIcon,
    title: 'Forms',
    href: '/forms',
  },
  {
    icon: CogIcon,
    title: 'Administation',
    items: [
      {
        href: '/administration/organization',
        title: 'Organization'
      },
      {
        href: '/administration/users',
        title: 'Users'
      }
    ]
  },
  // {
  //   icon: ChartPieIcon,
  //   title: 'Reports',
  //   items: [
  //     {
  //       href: '/dashboard/reports',
  //       title: 'Overview'
  //     },
  //     {
  //       href: '/dashboard/reports/sales',
  //       title: 'Sales'
  //     }
  //   ]
  // },
  // {
  //   icon: UsersIcon,
  //   title: 'Customers',
  //   items: [
  //     {
  //       href: '/dashboard/customers',
  //       title: 'List'
  //     },
  //     {
  //       href: '/dashboard/customers/1',
  //       title: 'Summary'
  //     },
  //     {
  //       href: '/dashboard/customers/1/orders',
  //       title: 'Orders'
  //     },
  //     {
  //       href: '/dashboard/customers/1/activity',
  //       title: 'Activity'
  //     }
  //   ]
  // },
  // {
  //   icon: CubeIcon,
  //   title: 'Orders',
  //   items: [
  //     {
  //       href: '/dashboard/orders',
  //       title: 'List'
  //     },
  //     {
  //       href: '/dashboard/orders/1',
  //       title: 'Summary'
  //     }
  //   ]
  // },
  // {
  //   icon: ShoppingCartIcon,
  //   title: 'Products',
  //   items: [
  //     {
  //       href: '/dashboard/products',
  //       title: 'List'
  //     },
  //     {
  //       href: '/dashboard/products/1',
  //       title: 'Summary'
  //     },
  //     {
  //       href: '/dashboard/products/1/inventory',
  //       title: 'Inventory'
  //     },
  //     {
  //       href: '/dashboard/products/1/analytics',
  //       title: 'Insights'
  //     }
  //   ]
  // },
  // {
  //   icon: ReceiptTaxIcon,
  //   title: 'Invoices',
  //   items: [
  //     {
  //       href: '/dashboard/invoices',
  //       title: 'List'
  //     },
  //     {
  //       href: '/dashboard/invoices/create',
  //       title: 'Create'
  //     },
  //     {
  //       href: '/dashboard/invoices/1',
  //       title: 'Details'
  //     },
  //     {
  //       href: '/dashboard/invoices/1/preview',
  //       title: 'Preview'
  //     }
  //   ]
  // },
  // {
  //   icon: CogIcon,
  //   title: 'Account',
  //   items: [
  //     {
  //       href: '/dashboard/account',
  //       title: 'General Settings'
  //     },
  //     {
  //       href: '/dashboard/account/notifications',
  //       title: 'Notifications'
  //     }
  //   ]
  // },
  // {
  //   icon: OfficeBuildingIcon,
  //   title: 'Organization',
  //   items: [
  //     {
  //       href: '/dashboard/organization',
  //       title: 'General Settings'
  //     },
  //     {
  //       href: '/dashboard/organization/team',
  //       title: 'Team'
  //     },
  //     {
  //       href: '/dashboard/organization/billing',
  //       title: 'Billing'
  //     }
  //   ]
  // },
  // {
  //   icon: TemplateIcon,
  //   title: 'Apps',
  //   items: [
  //     {
  //       href: '/dashboard/calendar',
  //       title: 'Calendar'
  //     }
  //   ]
  // },
  // {
  //   icon: SwitchHorizontalIcon,
  //   title: 'Onboarding',
  //   items: [
  //     {
  //       href: '/dashboard/onboarding/vertical',
  //       title: 'Onboarding Vertical'
  //     },
  //     {
  //       href: '/dashboard/onboarding/horizontal',
  //       title: 'Onboarding Horizontal'
  //     }
  //   ]
  // },
  // {
  //   icon: TemplateIcon,
  //   title: 'Components',
  //   items: [
  //     {
  //       href: '/dashboard/components/empty-states',
  //       title: 'Data States'
  //     },
  //     {
  //       href: '/dashboard/components/property-lists',
  //       title: 'Lists'
  //     },
  //     {
  //       href: '/dashboard/components/stats',
  //       title: 'Data Stats'
  //     },
  //     {
  //       href: '/dashboard/components/page-headings',
  //       title: 'Page Headers'
  //     },
  //     {
  //       href: '/dashboard/components/card-headings',
  //       title: 'Card Headers'
  //     },
  //     {
  //       href: '/dashboard/components/image-uploader',
  //       title: 'Image Uploader'
  //     }
  //   ]
  // },
  // {
  //   icon: ColorSwatchIcon,
  //   title: 'Foundation',
  //   items: [
  //     {
  //       href: '/dashboard/foundation/typography',
  //       title: 'Typography'
  //     },
  //     {
  //       href: '/dashboard/foundation/colors',
  //       title: 'Colors'
  //     },
  //     {
  //       href: '/dashboard/foundation/shadows',
  //       title: 'Shadows'
  //     },
  //     {
  //       href: '/dashboard/foundation/buttons',
  //       title: 'Buttons'
  //     },
  //     {
  //       href: '/dashboard/foundation/inputs',
  //       title: 'Inputs'
  //     },
  //     {
  //       href: '/dashboard/foundation/tables',
  //       title: 'Tables'
  //     },
  //     {
  //       href: '/dashboard/foundation/blank-page',
  //       title: 'Blank Page'
  //     }
  //   ]
  // },
  // {
  //   icon: DocumentTextIcon,
  //   title: 'Documentation',
  //   href: '/docs/welcome',
  //   external: true
  // }
];

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onPin, pinned } = props;
  const router = useRouter();
  const [openedItem, setOpenedItem] = useState<Item | null>(null);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [activeHref, setActiveHref] = useState('');
  const [hovered, setHovered] = useState(false);

  const handleOpenItem = (item: Item): void => {
    if (openedItem === item) {
      setOpenedItem(null);
      return;
    }

    setOpenedItem(item);
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item.items) {
        for (let index = 0; index < item.items.length; index++) {
          const active = item.items[index].partialMatch
            ? router.asPath.startsWith(item.items[index].href)
            : router.asPath === item.items[index].href;

          if (active) {
            setActiveItem(item);
            setActiveHref(item.items[index].href);
            setOpenedItem(item);
            break;
          }
        }
      } else {
        const active = item.partialMatch
          ? router.asPath.startsWith(item.href)
          : router.asPath === item.href;

        if (active) {
          setActiveItem(item);
          setOpenedItem(item);
        }
      }
    });
  }, [router.asPath]);

  return (
    <Drawer
      open
      sx={{ zIndex: 1000 }}
      variant="permanent"
      PaperProps={{
        onMouseOver: () => { setHovered(true); },
        onMouseLeave: () => { setHovered(false); },
        sx: {
          backgroundColor: (theme) => theme.palette.mode === 'light'
            ? 'neutral.50'
            : 'neutral.900',
          height: 'calc(100% - 64px)',
          overflowX: 'hidden',
          top: 64,
          transition: 'width 250ms ease-in-out',
          width: pinned ? 270 : 73,
          '& .simplebar-content': {
            height: '100%'
          },
          '&:hover': {
            width: 270,
            '& span, p': {
              display: 'flex'
            }
          }
        }
      }}
    >
      <Scrollbar
        style={{
          display: 'flex',
          flex: 1,
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 2
          }}
        >
          <List disablePadding>
            {activeItem && (
              items.map((item) => (
                <DashboardSidebarItem
                  active={activeItem?.title === item.title}
                  activeHref={activeHref}
                  key={item.title}
                  onOpen={() => handleOpenItem(item)}
                  open={openedItem?.title === item.title && (hovered || pinned)}
                  pinned={pinned}
                  {...item}
                />
              ))
            )}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Box sx={{ pt: 1 }}>
            <IconButton onClick={onPin}>
              {pinned ? <ChevronLeftIcon color="action" /> : <ChevronRightIcon color="action" />}
            </IconButton>
          </Box>
        </Box>
      </Scrollbar>
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onPin: PropTypes.func,
  pinned: PropTypes.bool
};
