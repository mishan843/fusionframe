// assets
import { IconBook, IconBoxMultiple, IconBrush, IconChartBar, IconFiles, IconKey, IconMapPin } from '@tabler/icons-react';

// constant
const icons = {
    IconKey,IconFiles,IconBook,IconChartBar,IconBrush,IconMapPin,IconBoxMultiple
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const extracomponents = {
    id: 'extracomponents',
    title: 'EXTRA COMPONENTS',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Page Layout',
            type: 'collapse',
            icon: icons.IconFiles,

            children: [
                {
                    id: 'singleColumn',
                    title: '1 Column',
                    type: 'item',
                    url: '/pagelayout/1-column',
                    target: true
                },
                {
                    id: 'fixedHeader',
                    title: 'Fix header',
                    type: 'item',
                    url: '/pagelayout/fixed-header',
                    target: true
                },
                {
                    id: 'fixedSidebar',
                    title: 'Fix sidebar',
                    type: 'item',
                    url: '/pagelayout/fixed-sidebar',
                    target: true
                },
                {
                    id: 'fixedHeaderSidebar',
                    title: 'Fixed header & Sidebar',
                    type: 'item',
                    url: '/pagelayout/fixed-header-sidebar',
                    target: true
                },
                {
                    id: 'boxedLayout',
                    title: 'Boxed Layout',
                    type: 'item',
                    url: '/pagelayout/boxed-layout',
                    target: true
                },
                {
                    id: 'logoCenter',
                    title: 'Logo in Center',
                    type: 'item',
                    url: '/pagelayout/logo-center',
                    target: true
                }
            ]

        },
        {
            id: 'authentication',
            title: 'Sample Pages',
            type: 'collapse',
            icon: icons.IconBook,

            children: [
                {
                    id: 'starterKit',
                    title: 'Starter Kit',
                    type: 'item',
                    url: '/samplepages/starter-kit',
                    target: true
                },
                {
                    id: 'blankPage',
                    title: 'Blank page',
                    type: 'item',
                    url: '/samplepages/blank-page',
                    target: true
                },
                {
                    id: 'authentication',
                    title: 'Authentication',
                    type: 'collapse',
                    children: [
                        {
                            id: 'login1',
                            title: 'Login 1',
                            type: 'item',
                            url: '/samplepages/login1',
                            target: true
                        },
                        {
                            id: 'login2',
                            title: 'Login 2',
                            type: 'item',
                            url: '/samplepages/login2',
                            target: true
                        },
                        {
                            id: 'register',
                            title: 'Register',
                            type: 'item',
                            url: '/samplepages/register',
                            target: true
                        },
                        {
                            id: 'register2',
                            title: 'Register 2',
                            type: 'item',
                            url: '/samplepages/register2',
                            target: true
                        },
                        {
                            id: 'lockscreen',
                            title: 'Lockscreen',
                            type: 'item',
                            url: '/samplepages/lockscreen',
                            target: true
                        },
                        {
                            id: 'recoverPassword',
                            title: 'Recover password',
                            type: 'item',
                            url: '/samplepages/recover-password',
                            target: true
                        }
                    ]
                },
                {
                    id: 'profilePage',
                    title: 'Profile page',
                    type: 'item',
                    url: '/samplepages/profile-page',
                    target: true
                },
                {
                    id: 'animation',
                    title: 'Animation',
                    type: 'item',
                    url: '/samplepages/animation',
                    target: true
                },
                {
                    id: 'stickyLeftSidebar',
                    title: 'Sticky Left sidebar',
                    type: 'item',
                    url: '/samplepages/sticky-left-sidebar',
                    target: true
                },
                {
                    id: 'stickyRightSidebar',
                    title: 'Sticky Right sidebar',
                    type: 'item',
                    url: '/samplepages/sticky-right-sidebar',
                    target: true
                },
                {
                    id: 'invoice',
                    title: 'Invoice',
                    type: 'item',
                    url: '/samplepages/invoice',
                    target: true
                },
                {
                    id: 'treeview',
                    title: 'Treeview',
                    type: 'item',
                    url: '/samplepages/treeview',
                    target: true
                },
                {
                    id: 'helperClasses',
                    title: 'Helper Classes',
                    type: 'item',
                    url: '/samplepages/helper-classes',
                    target: true
                },
                {
                    id: 'searchResult',
                    title: 'Search result',
                    type: 'item',
                    url: '/samplepages/search-result',
                    target: true
                },
                {
                    id: 'scrollbar',
                    title: 'Scrollbar',
                    type: 'item',
                    url: '/samplepages/scrollbar',
                    target: true
                },
                {
                    id: 'pricing',
                    title: 'Pricing',
                    type: 'item',
                    url: '/samplepages/pricing',
                    target: true
                },
                {
                    id: 'lightboxPopup',
                    title: 'Lighbox popup',
                    type: 'item',
                    url: '/samplepages/lightbox-popup',
                    target: true
                },
                {
                    id: 'gallery',
                    title: 'Gallery',
                    type: 'item',
                    url: '/samplepages/gallery',
                    target: true
                },
                {
                    id: 'faqs',
                    title: 'Faqs',
                    type: 'item',
                    url: '/samplepages/faqs',
                    target: true
                },
                {
                    id: 'errorPages',
                    title: 'Error Pages',
                    type: 'collapse',
                    children: [
                        {
                            id: 'error400',
                            title: '400',
                            type: 'item',
                            url: '/samplepages/error-400',
                            target: true
                        },
                        {
                            id: 'error403',
                            title: '403',
                            type: 'item',
                            url: '/samplepages/error-403',
                            target: true
                        },
                        {
                            id: 'error404',
                            title: '404',
                            type: 'item',
                            url: '/samplepages/error-404',
                            target: true
                        },
                        {
                            id: 'error500',
                            title: '500',
                            type: 'item',
                            url: '/samplepages/error-500',
                            target: true
                        },
                        {
                            id: 'error503',
                            title: '503',
                            type: 'item',
                            url: '/samplepages/error-503',
                            target: true
                        }
                    ]
                },
                {
                    id: 'authentication',
                    title: 'Charts',
                    type: 'collapse',
                    icon: icons.IconKey,

                    children: [
                        {
                            id: 'morrischart',
                            title: 'Morris Chart',
                            type: 'item',
                            url: '/charts/morris-chart',
                            target: true
                        }
                    ]

                }
            ]
        },
        {
            id: 'authentication',
            title: 'Charts',
            type: 'collapse',
            icon: icons.IconChartBar,

            children: [
                {
                    id: 'morrisChart',
                    title: 'Morris Chart',
                    type: 'item',
                    url: '/charts/morris-chart',
                    target: true
                },
                {
                    id: 'chartistChart',
                    title: 'Chartis Chart',
                    type: 'item',
                    url: '/charts/chartist-chart',
                    target: true
                },
                {
                    id: 'echarts',
                    title: 'Echarts',
                    type: 'item',
                    url: '/charts/echarts',
                    target: true
                },
                {
                    id: 'flotChart',
                    title: 'Flot Chart',
                    type: 'item',
                    url: '/charts/flot-chart',
                    target: true
                },
                {
                    id: 'knobChart',
                    title: 'Knob Chart',
                    type: 'item',
                    url: '/charts/knob-chart',
                    target: true
                },
                {
                    id: 'chartjs',
                    title: 'Chartjs',
                    type: 'item',
                    url: '/charts/chartjs',
                    target: true
                },
                {
                    id: 'sparklineChart',
                    title: 'Sparkline Chart',
                    type: 'item',
                    url: '/charts/sparkline-chart',
                    target: true
                },
                {
                    id: 'extraChart',
                    title: 'Extra chart',
                    type: 'item',
                    url: '/charts/extra-chart',
                    target: true
                },
                {
                    id: 'peityCharts',
                    title: 'Peity Charts',
                    type: 'item',
                    url: '/charts/peity-charts',
                    target: true
                }
            ]


        },
        {
            id: 'authentication',
            title: 'Icons',
            type: 'collapse',
            icon: icons.IconBrush,

            children: [
                {
                    id: 'materialIcons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    target: true
                },
                {
                    id: 'fontawesomeIcons',
                    title: 'Fontawesome Icons',
                    type: 'item',
                    url: '/icons/fontawesome-icons',
                    target: true
                },
                {
                    id: 'themifyIcons',
                    title: 'Themify Icons',
                    type: 'item',
                    url: '/icons/themify-icons',
                    target: true
                },
                {
                    id: 'lineaIcons',
                    title: 'Linea Icons',
                    type: 'item',
                    url: '/icons/linea-icons',
                    target: true
                },
                {
                    id: 'weatherIcons',
                    title: 'Weather Icons',
                    type: 'item',
                    url: '/icons/weather-icons',
                    target: true
                },
                {
                    id: 'simpleLineIcons',
                    title: 'Simple Lineicons',
                    type: 'item',
                    url: '/icons/simple-lineicons',
                    target: true
                },
                {
                    id: 'flagIcons',
                    title: 'Flag Icons',
                    type: 'item',
                    url: '/icons/flag-icons',
                    target: true
                }
            ]


        },
        {
            id: 'authentication',
            title: 'Maps',
            type: 'collapse',
            icon: icons.IconMapPin,

            children: [
                {
                    id: 'googleMaps',
                    title: 'Google Maps',
                    type: 'item',
                    url: '/maps/google-maps',
                    target: true
                },
                {
                    id: 'vectorMaps',
                    title: 'Vector Maps',
                    type: 'item',
                    url: '/maps/vector-maps',
                    target: true
                }
            ]


        },
        {
            id: 'authentication',
            title: 'Multi level dd',
            type: 'collapse',
            icon: icons.IconBoxMultiple,

            children: [
                {
                    id: 'item1.1',
                    title: 'Item 1.1',
                    type: 'item',
                    url: '/levels/item-1.1',
                    target: true
                },
                {
                    id: 'item1.2',
                    title: 'Item 1.2',
                    type: 'item',
                    url: '/levels/item-1.2',
                    target: true
                },
                {
                    id: 'authentication',
                    title: 'Menu 1.3',
                    type: 'collapse',
                    children: [
                        {
                            id: 'item1.3.1',
                            title: 'Item 1.3.1',
                            type: 'item',
                            url: '/levels/item-1.3.1',
                            target: true
                        },
                        {
                            id: 'item1.3.2',
                            title: 'Item 1.3.2',
                            type: 'item',
                            url: '/levels/item-1.3.2',
                            target: true
                        },
                        {
                            id: 'item1.3.3',
                            title: 'Item 1.3.3',
                            type: 'item',
                            url: '/levels/item-1.3.3',
                            target: true
                        },
                        {
                            id: 'item1.3.4',
                            title: 'Item 1.3.4',
                            type: 'item',
                            url: '/levels/item-1.3.4',
                            target: true
                        }
                    ]
                },
                {
                    id: 'item1.4',
                    title: 'Item 1.4',
                    type: 'item',
                    url: '/levels/item-1.4',
                    target: true
                }
            ]


        }
    ]
};

export default extracomponents;
