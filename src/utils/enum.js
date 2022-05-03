const ENUMS = {
    JOIN_MERCURI: 'Want to join Mercuri?',
    CONNECT_WITH_CUSTOMERS: 'Connect with your customers using our platform and boost your restaurant’s sales. Partner with us today.',
    REGISTER_MY_RESTAURANT: 'Yes, register my restaurant!',
    FORGOT_PASSWORD: 'Forgot password?',
    LOGIN: 'Login',
    CREATE_CATEGORY: 'Create Category',
    ADD_CATEGORY: 'Add Category',
    DELETE_CATEGORY: 'Delete Category',
    SAVE_CHANGES: 'Save Changes',
    SAVE: 'Save',
    CANCEL: 'Cancel',
    ITEMS: 'Items',
    ITEM: {
        DESCRIPTION: 'Item Description',
        VARIATIONS: 'Variations',
        MODIFIERS: 'Modifiers'
    },
    ADD_NEW_ITEM: 'Add new item',
    ADD_ITEM: 'Add Item',
    DELETE_ITEM: 'Delete Item',
    MENUS: 'Menus',
    CREATE_MENU: 'Create Menu',
    CREATE_NEW_MENU: 'Create new menu',
    CREATE_FIRST_MENU: 'Create my first menu',
    DELETE_MENU: 'Delete Menu',
    ACTIVATE_MENU: 'Activate Menu',
    ACTIVATE_MENU_LONG: ' If you click on “Activate menu”, all of the items and categories will be displayed for customers.',
    DEACTIVATE_MENU: 'Deactivate Menu',
    ACTIVATE: 'activate',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    DELETE_CAMEL_CASE: 'Delete',
    MENUS_TITLE: 'Create Menus that match your food & beverages schedules',
    ADD_CATEGORY_TITLE: 'Add a name and description for your first Category.',
    ADD_ITEM_TITLE: 'Add a new item to sell in your restaurant',
    ADD_MENU_TITLE: 'Add a name for your first Menu name. You will be able to add categories and items inside your menu.',
    CONTACT_MERCURI: 'Contact Mercuri for Help',
    CONTACT_MERCURI_LONG: 'Is your menu too long? Contact Mercuri for help to handle that!',
    MANAGE_MENU_TITLE: 'Menu name',
    MANAGE_CATEGORY_TITLE: 'Category name',
    MANAGE_ITEM_TITLE: 'New item',
    NO_ITEMS: 'No items to display',
    ORDERS: 'orders',
    MENU: 'menu',
    ACCOUNT: 'account',
    BUSINESS_PROFILE: 'business profile',
    BUSINESS_BRANDING: 'business branding',
    SEND_YOUR_PROFILE: 'Send your profile',
    EDIT_PROFILE: 'Edit Profile',
    BRANDING_HEADER: 'Customize your branding',
    BRANDING_TITLE: 'Add your brand Look & feel inside your Mercuri’s Restaurant',
    BRANDING_UPLOAD_PLACEHOLDER: 'Your profile image should be at least 300x300px in .JPG, .PNG or .PDF formats and no more heavier than 3MB.',
    SAVE_MY_BRANDING: 'Save my branding preferences',
    PICK_A_BRAND: 'Pick a brand color',
    UPLOAD_A_PHOTO: 'Upload a profile photo',
    UPLOAD_A_COVER: 'Upload a cover image',
    PREVIEW_EAMPLE: 'Preview Example',
    PARKER_LOGO: 'ParkerBurgerLogo.jpg',
    PARKER_COVER: 'ParkerBurgeCover.jpg',
    ROUTES: {
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: 'forgot-password',
        HOME: '/',
        ORDERS: '/orders',
        ACCOUNT: '/account/business'
    },
    ORDER_TYPE: {
        TABLE_SERVICE: 'Table Service',
        PICK_UP_COUNTER: 'Pick-up at counter',
        PICK_UP_INSIDE: 'Pickup inside',
        CURBSIDE_PICKUP: 'Curbside pickup',
        CURBSIDE_LONG_TEXT: 'Customer orders and pickup inside or by curb-side',
        PICK_UP_INSIDE_LONG_TEXT: 'Customer orders inside at your table',
        TABLE_LONG_TEXT: 'Customer orders inside at your table',
        PICK_UP_COUNTER_LONG_TEXT: 'Customer orders and pickup at the counter',
        ORDER_TYPE_LONG_TEXT: 'Which type of order do you accept? (you can pick more than one option)',
        DINE_LONG_TEXT: 'Which type of Dine in order do you accept? (you can pick more than one option)',
    },
    BUSINESS: {
        ORDER_TYPE_LONG_TEXT: 'Which type of order do you accept? (you can pick more than one option)',
        TABLE: 'Table',
        TABLE_LONG_TEXT: 'Customer orders inside at your table',
        PICK_UP_COUNTER_LONG_TEXT: 'Customer orders and pickup at the counter',
        TAKEOUT_LONG_TEXT: 'Customer orders and pickup inside or by curb-side',
        PICK_UP_COUNTER: 'Pick-up at counter',
        TAKEOUT: 'Takeout',
        BUSINESS_HOURS: 'Business Hours',
        PROFILE_REVIEW: `Your business profile was successfully sent for review. Mercuri will review your Business profile and activate your account once is ready.`,
        OKAY: 'Okay'
    },
    '24HOURS': '24 Hours',
    'OPEN24HRS': 'Open 24 hrs.',
    SINGLE: 'Single',
    SIMPLIFIED_VIEW: 'Simplified View',
    RESTAURANT_VIEW: 'Restaurant View',
    PREVIEW_HELPER_TEXT: 'This is a generic preview of a business profile. Your preferences will be displayed once you save your branding preferences.',
    TOOLTIP_TEXT: 'This text is displayed in a collapsed nav bar at the top of the screen.',
    SIMPLIFIED_NAME: 'Simplified Restaurant name',
    SIMPLIFIED_HELPER: 'Please enter simplified name',
    BACK_TO_MENU: 'Back to Menu',
    BACK_TO_SIDE_ITEM_MENU: 'Back to Side Items Menu',
    NO_RESTAURANT: 'You don’t have a menu on your restaurant',
    TELL_YOUR_CUSTOMER: 'Tell to your customers everything about your business. The most info you fill the better.',
    PROFILE_SENT_FOR_REVIEW: 'Profile sent for review',
    ACTIVATE_ACCOUNT_LONG: `Your restaurant is still not active. Mercuri will review your Business Profile and will activate your account.  Your restaurant  won’t appear in the mobile app until it’s approved..`,
    KEY: {
        CRYPTO_KEY: process.env.REACT_APP_CRYPTO_KEY
    },
    ORDERS_NEW: {
        UPTO_DATE_TEXT: 'You’re up to date. Wait for a new order'
    },
    MESSAGE: {
        WENT_WORNG: 'Something went worng',
        ADDED: 'added',
        UPDATED: 'updated',
        DELETED: 'deleted',
        SUCCESSFULLY: 'successfully',
        OFFLINE: 'You are currently offline. Connect to internet and try again.'
    },
    VARIANT: {
        SUCCESS: 'success',
        ERROR: 'error',
        INFO: 'info',
        WARNING: 'warning'
    },
    SIDE_ITEM_MENU: {
        TITLE: 'Side Item Menu',
        ADD_ITEM_TO_ACCOMPANY: 'Add items to accompany a menu item',
        NEW_SIDE: ' New Side',
        SIDE_CATEGORY_NAME: 'Side Category Name',
        ITEMS: 'Items',
        ADD_A_NEW_ITEM: 'Add a new item',
        UPDATE_ITEM: 'Update Item',
        CREATE_ITEM_INSIDE_CATEGORY: 'Create an item to place inside this Side Category',
    }
};

export default ENUMS;