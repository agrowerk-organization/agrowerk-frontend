export interface Testimonial {
    id: number;
    quote: string;
    author: {
        name: string;
        role: string;
        property: string;
        location: string;
        avatar?: string;
    };
    metrics: {
        productivity?: string;
        savings?: string;
        customMetric?: {
            label: string;
            value: string;
        }
    };
    rating: number;
}