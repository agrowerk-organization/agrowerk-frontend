import { FaqCategory } from "./faq-category";

export interface FaqResponse {
    id: string;
    question: string;
    answer: string;
    faqCategory: FaqCategory;
    displayOrder: number;
    viewCount: number;
    isActive: boolean;
}