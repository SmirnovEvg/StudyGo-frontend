export default class TimetableService {
    static getWeekNumber() {
        return Math.ceil((new Date(Date.now()).getTime() - new Date('December 29, 2019').getTime()) / (1000 * 60 * 60 * 24) / 7) % 2 === 0 ? 1 : 2;
    }
}