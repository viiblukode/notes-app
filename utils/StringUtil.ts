export const truncateText = (text: string, maxLength: number = 20) => {
    //trim text to defined maxLength, if not maxLength is defined, it will be fixed to 20
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}