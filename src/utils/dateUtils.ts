export class DateUtils {
    static getTimeDifference(startDate: Date): {
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        totalSeconds: number;
    } {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime();
        
        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        
        const years = Math.floor(totalDays / 365.25);
        const months = Math.floor((totalDays % 365.25) / 30.44);
        const days = Math.floor(totalDays % 30.44);
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;
        
        return {
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
            totalSeconds
        };
    }
    
    static formatDate(date: Date): string {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }
    
    static formatDateTime(date: Date): string {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    static isDatePassed(date: Date): boolean {
        return new Date() >= date;
    }
}