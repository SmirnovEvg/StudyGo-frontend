export default class TimetableService {
    static getWeekNumber() {
        return Math.ceil((new Date(Date.now()).getTime() - new Date('December 29, 2019').getTime()) / (1000 * 60 * 60 * 24) / 7) % 2 === 0 ? 1 : 2;
    }

    static getWeekDay() {
        return new Date().getDay();
    }

    static getFullDayOfTheWeek(dayOfTheWeek) {
        switch (dayOfTheWeek) {
            case 1:
                return 'Понедельник'
            case 2:
                return 'Вторник'
            case 3:
                return 'Среда'
            case 4:
                return 'Четверг'
            case 5:
                return 'Пятница'
            case 6:
                return 'Суббота'
            default:
                break;
        }
    }

    static getFullClassTime(classTime) {
        switch (classTime) {
            case 1:
                return '8:00-9:35'
            case 2:
                return '9:50-11:25'
            case 3:
                return '11:40-13:15'
            case 4:
                return '13:50-15:25'
            case 5:
                return '15:40-17:15'
            case 6:
                return '17:30-19:05'
            case 7:
                return '19:20-20:55'
            default:
                break;
        }
    }

    static convertWeek(week) {
        switch (week) {
            case 1:
                return 'I'
            case 2:
                return 'II'
            default:
                break;
        }
    }

    static getFullLessonType(type) {
        switch (type) {
            case 0:
                return 'ЛК'
            case 1:
                return 'ЛБ'
            case 2:
                return 'ПЗ'
            default:
                break;
        }
    }
}