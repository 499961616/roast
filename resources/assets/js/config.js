/**
 * Defines the API route we are using.
 */
var api_url = '';
var app_url = '';
var gaode_maps_js_api_key = '755fb98b692e54db56846ed1626f49b0';

switch( process.env.NODE_ENV ){
    case 'development':
        api_url = 'http://roast.cn/api/v1';
        app_url = 'http://roast.cn';
        break;
    case 'production':
        api_url = 'http://roast.demo.laravelacademy.org/api/v1';
        app_url = 'http://roast.cn';

        break;
}

export const ROAST_CONFIG = {
    API_URL: api_url,
    APP_URL: app_url,
    GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
}
