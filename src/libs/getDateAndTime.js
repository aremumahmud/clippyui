function getTimeAndDate(dateString) {
    // Create a new Date object from the date string
    const dateObject = new Date(dateString);

    // Extract time components
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Extract date components
    const year = dateObject.getFullYear();
    // JavaScript months are zero-based (0 = January, 1 = February, ..., 11 = December)
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    // Format time and date components
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // Return time and date as an object
    return { time, date };
}


export default getTimeAndDate
// // Example usage
// const dateString = '2024-05-09T12:34:56';
// const { time, date } = getTimeAndDate(dateString);
// console.log('Time:', time);
// console.log('Date:', date);