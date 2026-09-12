export interface RunPagespeed {
    analysisUTCTimestamp?: string;
    captchaResult?: string;
    id?: string;
    kind?: string;
    lighthouseResult?: Record<string, any>;
    loadingExperience?: Record<string, any>;
    originLoadingExperience?: Record<string, any>;
    version?: Record<string, any>;
}
export interface RunPagespeedLoadMatch {
    captcha_token?: string;
    category?: any[];
    locale?: string;
    strategy?: string;
    url: string;
    utm_campaign?: string;
    utm_source?: string;
}
