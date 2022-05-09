export const PAGE_ROUTES = {
  DASHBOARD: {
    PATH: '/dashboard',
    TITLE: 'Dashboard - ClinicX',
    TITLE_MENU: 'Dashboard',
  },

  SIGN_IN: {
    PATH: '/sign-in',
    TITLE: 'Sign In - ClinicX',
    TITLE_MENU: 'Sign In',
  },

  MEDICAL_BILLS: {
    PATH: '/medical-bills',
    TITLE: 'Medical Bills - ClinicX',
    TITLE_MENU: 'Medical bills',
    DETAILS: {
      PATH: '/medical-bills/:id',
      ID: (id: string) => `/medical-bills/${id}`,
      TITLE: 'Medical Bill Details - ClinicX',
    },
  },

  PATIENTS: {
    PATH: '/patients',
    TITLE: 'Patients - ClinicX',
    TITLE_MENU: 'Patients',
    DETAILS: {
      PATH: '/patients/:id',
      ID: (id: string) => `/patients/${id}`,
      TITLE: 'Patient Details - ClinicX',
    },
  },

  INVOICES: {
    PATH: '/invoices',
    TITLE: 'Invoices - ClinicX',
    TITLE_MENU: 'Invoices',
    DETAILS: {
      PATH: '/invoices/:id',
      ID: (id: string) => `/invoices/${id}`,
      TITLE: 'Invoice Details - ClinicX',
    },
  },

  ACCOUNT: {
    PATH: '/account',
    TITLE: 'Account - ClinicX',
    TITLE_MENU: 'Account',
  },

  SUPPORT: {
    PATH: '/support',
    TITLE: 'Support - ClinicX',
    TITLE_MENU: 'Support',
  },

  PROFILE: {
    PATH: '/profile',
    TITLE: 'My Profile - ClinicX',
    TITLE_MENU: 'My Profile',
  },

  STATISTICS: {
    PATH: '/statistics',
    TITLE: 'Statistics - ClinicX',
    TITLE_MENU: 'Statistics',
  },

  HELP_CENTER: {
    PATH: '/help-center',
    TITLE: 'Help Center - ClinicX',
    TITLE_MENU: 'Help Center',
  },

  ACCOUNT_RECOVER: {
    PATH: '/login/recover',
    TITLE: 'Forgotten Password - ClinicX',
  },
};
