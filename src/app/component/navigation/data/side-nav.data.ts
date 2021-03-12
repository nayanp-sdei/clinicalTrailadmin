import { SideNavItems, SideNavSection } from '@app/component/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: '',
        items: ['dashboard'],
    },
    {
        text: '',
        items: ['volunteer']
    },
    {
        text: '',
        items: ['categories'],
    },
    {
        text: '',
        items: ['cms'],
    },
    // {
    //     text: 'ADDONS',
    //     items: ['charts', 'tables'],
    // },
    // {
    //     text: 'INTERFACE',
    //     items: ['pages','layouts'],
    // },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    categories: {
        icon: 'book-open',
        text: 'Categories',
        link: '/categories/categories-List'
    },
    cms: {
        icon: 'chart-area',
        text: 'CMS',
        submenu: [
            {
                text: 'About-Us',
                link: '/cms/aboutus',
            },
            {
                text: 'Email Policy',
                link: '/cms/email-policy',
            },
            {
                text: 'FAQs',
                link: '/cms/faqs',
            },
            {
                text: 'Privacy Policy',
                link: '/cms/privacy-policy',
            },
            {
                text: 'Return Policy',
                link: '/cms/return-policy',
            },
            {
                text: 'Terms Of Service',
                link: '/cms/terms-of-service',
            }

        ]
    },
    volunteer: {
        icon: 'user',
        text: 'Volunteer',
        link: '/volunteer/volunteer-list'
        // submenu: [
        //     {
        //         text: 'Volunteer List',
        //         link: '/volunteer/volunteer-list'
        //     },
        //     {
        //         text: 'Volunteer Add',
        //         link: '/volunteer/volunteer-add'
        //     }
        // ]
    },
    payment: {
        icon: 'tachometer-alt',
        text: 'Transaction',
        link: '/payment',
    },
    layouts: {
        icon: 'columns',
        text: 'Layouts',
        submenu: [
            {
                text: 'Static Navigation',
                link: '/dashboard/static',
            },
            {
                text: 'Light Sidenav',
                link: '/dashboard/light',
            },
        ],
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ],
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                    },
                ],
            },
        ],
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
    },
};
