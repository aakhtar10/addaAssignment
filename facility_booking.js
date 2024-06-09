class Facility {
    constructor(name, slots) {
        this.name = name;
        this.slots = slots;
        this.bookings = [];
    }
    book(date, startTime, endTime) {
        for (let booking of this.bookings) {
            if (booking.date === date && !(endTime <= booking.startTime || startTime >= booking.endTime)) {
                return `Booking Failed, Already Booked`;
            }
        }
        const totalCost = this.calculateCost(startTime, endTime);
        this.bookings.push({ date, startTime, endTime });
        return `Booked, Rs. ${totalCost}`;
    }
    calculateCost(startTime, endTime) {
        throw new Error("Subclasses should implement this!");
    }
}
class Clubhouse extends Facility {
    constructor() {
        super("Clubhouse", [
            { start: 10, end: 16, rate: 100 },
            { start: 16, end: 22, rate: 500 }
        ]);
    }
    calculateCost(startTime, endTime) {
        let totalCost = 0;
        for (let slot of this.slots) {
            if (startTime < slot.end && endTime > slot.start) {
                const applicableStart = Math.max(startTime, slot.start);
                const applicableEnd = Math.min(endTime, slot.end);
                const hours = applicableEnd - applicableStart;
                totalCost += hours * slot.rate;
            }
        }
        return totalCost;
    }
}
class TennisCourt extends Facility {
    constructor() {
        super("Tennis Court", [
            { start: 0, end: 24, rate: 50 }
        ]);
    }
    calculateCost(startTime, endTime) {
        let totalCost = 0;
        for (let slot of this.slots) {
            if (startTime < slot.end && endTime > slot.start) {
                const applicableStart = Math.max(startTime, slot.start);
                const applicableEnd = Math.min(endTime, slot.end);
                const hours = applicableEnd - applicableStart;
                totalCost += hours * slot.rate;
            }
        }
        return totalCost;
    }
}
function parseTime(timeStr) {
    return parseInt(timeStr.split(':')[0]);
}
function main() {
    const clubhouse = new Clubhouse();
    const tennisCourt = new TennisCourt();
    const requests = [
        ["Clubhouse", "26-10-2020", "16:00-22:00"],
        ["Tennis Court", "26-10-2020", "16:00-20:00"],
        ["Clubhouse", "26-10-2020", "16:00-22:00"],
        ["Tennis Court", "26-10-2020", "17:00-21:00"]
    ];
    const facilities = {
        "Clubhouse": clubhouse,
        "Tennis Court": tennisCourt
    };
    for (let request of requests) {
        const [facilityName, date, timeRange] = request;
        const [startTimeStr, endTimeStr] = timeRange.split('-');
        const startTime = parseTime(startTimeStr);
        const endTime = parseTime(endTimeStr);
        const facility = facilities[facilityName];
        const result = facility.book(date, startTime, endTime);
        console.log(`${facilityName}, ${date}, ${timeRange} ${result}`);
    }
}
main();









