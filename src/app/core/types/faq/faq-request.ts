export interface FaqRequest {
    question: string;
    answer: string;
    faqCategory: string;
    displayOrder?: number;
}