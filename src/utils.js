export const isOrderingOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const isOpen = (day, hours, minutes) => {
        const time = hours * 60 + minutes; // convert hours and minutes to total minutes
        switch (day) {
            case 0: // Sunday
                return time >= 15 * 60 + 30 && time <= 21 * 60;
            case 4: // Thursday
            case 5: // Friday
            case 6: // Saturday
                return time >= 15 * 60 + 30 && time <= 22 * 60;
            default:
                return false;
        }
    };

    return isOpen(day, hours, minutes);
};
