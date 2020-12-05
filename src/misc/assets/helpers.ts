export class Helpers {
  static selectors = {
    'updated': ' .content .top .left',
    'summary': ' .content .top .right',
    'furnniture': '.furniture_info span',
    'address': ' .content .main_content .main_title',
    'cityArea': ' .content .main_content .description',
    'city': ' .content .main_content .description span:nth-child(2)',
    'area': ' .content .main_content .description span:nth-child(1)',
    'rooms': ' .content .main_content .table dl:nth-child(1) dd',
    'floor': ' .content .main_content .table dl:nth-child(2) dd',
    'meters': ' .content .main_content .table dl:nth-child(3) dd',
    'price': ' .content .main_content .price',

    'about': '.about_ad',

    'description': '.ad_about.info_container .wrapper_container section',
    'dateOfEntrance': '.ad_about.info_container .wrapper_container .more_data span',

    'features': '.ad_additional_info_items .info_feature',
    'featuresPresent': '.ad_additional_info_items .info_feature:not(.delete)',
    'featuresAbsent': '.ad_additional_info_items .info_feature.delete',

    'detailsField': '.details_wrapper .item',

    'feedbackMark': '.feedback_mark',
    'sellerName': '.contact_seller_light_box .seller .name',
    'sellerPhone': '.contact_seller_light_box .middle_line div',
    'sellerPhone0': '#lightbox_phone_number_0',
    'sellerPhone1': '#lightbox_phone_number_1',
    'photo': 'img.advertiser_img',
    'hasPhoto': '.has_images',
    'hasVideo': '.y2i_PlayButton',
    'video': '#myVideo',

  };
  static translations = {
    'מיזוג': 'conditioning',
    'לשותפים': 'toPartners',
    'מטבח כשר': 'kosherKitchen',
    'מעלית': 'elevators',
    'משופצת': 'renovated',
    'דלתות פנדור': 'pandoraDoors',
    'מזגן תדיראן': 'tadiran',
    'לטווח ארוך': 'longTerm',
    'סורגים': 'bars',
    'גישה לנכים': 'accessForDisabled',
    'ממ"ד': 'shelter',
    'מחסן': 'storage',
    'חיות מחמד': 'pets',
    'ריהוט': 'furniture',
    'תאריך כניסה': 'entryDate',
    'כניסה': 'entrance',
    'ועד בית (לחודש)': 'houseCommittee',
    'קומות בבנין': 'totalFloors',
    'מס תשלומים': 'numberPayments',
    'ארנונה לחודשיים': 'arnona',
    'חניות': 'parking',
    'רמת השקט ברחוב': 'levelQuietOnStreet',
    'כמות החניה ברחוב': 'streetParking',
    'קרבה לשירותים מסחריים': 'proximityCommercialServices',
    'נגישות לתחבורה ציבורית': 'accessibilityPublicTransportation',
    'נכס בבלעדיות': 'exclusiveProperty',
    'מצב הנכס': 'propertyCondition',
    'מרפסות': 'balconies',
    'ללא': 0,
    'גמיש': -3,
    'לא צוין': 'not set',

  };

}
