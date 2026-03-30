export interface TimelineEvent {
    id: number;
    date: Date;
    title: string;
    description: string;
    image?: string;
}

export interface GalleryImage {
    id: number;
    url: string;
    caption: string;
    date: Date;
}

export interface TimeCapsule {
    id: number;
    title: string;
    message: string;
    unlockDate: Date;
    createdAt: Date;
    isUnlocked: boolean;
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface TimeStats {
    totalSeconds: number;
    totalHours: number;
    totalDays: number;
    estimatedHeartbeats: number;
    estimatedMessages: number;
}