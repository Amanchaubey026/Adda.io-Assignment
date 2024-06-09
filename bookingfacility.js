class BookingFacility {
  constructor(name, hourlyRates) {
    this.name = name;
    this.bookings = [];
    this.hourlyRates = hourlyRates;
  }

  isAvailable(date, startHour, endHour) {
    return !this.bookings.some(booking =>
      booking.date === date &&
      ((startHour >= booking.startHour && startHour < booking.endHour) ||
      (endHour > booking.startHour && endHour <= booking.endHour))
    );
  }

  calculateFee(startHour, endHour) {
    let totalFee = 0;
    for (let hour = startHour; hour < endHour; hour++) {
      const rate = this.hourlyRates.find(rate => hour >= rate.start && hour < rate.end);
      if (rate) {
        totalFee += rate.price;
      }
    }
    return totalFee;
  }

  book(date, startHour, endHour) {
    if (this.isAvailable(date, startHour, endHour)) {
      const totalFee = this.calculateFee(startHour, endHour);
      this.bookings.push({ date, startHour, endHour });
      return `Booked, Rs. ${totalFee}`;
    } else {
      return 'Booking Failed, Already Booked';
    }
  }
}

const clubhouseRates = [
  { start: 10, end: 16, price: 100 },
  { start: 16, end: 22, price: 500 },
];
const tennisCourtRates = [{ start: 0, end: 24, price: 50 }];

const clubhouse = new BookingFacility('Clubhouse', clubhouseRates);
const tennisCourt = new BookingFacility('Tennis Court', tennisCourtRates);

console.log(clubhouse.book('26-10-2020', 14, 16));
console.log(clubhouse.book('26-10-2020', 18, 22));
console.log(tennisCourt.book('26-10-2020', 17, 20));
