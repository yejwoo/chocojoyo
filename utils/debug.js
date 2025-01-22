export function debug(message, data, type) {
    const styleMap = {
        red: "color:red;",
        blue: "color:blue;",
        green: "color:green;",
    };

    const defaultStyle = "font-size: 16px;"
    const style = (styleMap[type] || "").concat(defaultStyle);

    if (typeof data === "object") {
        console.log(`%c${message} - ${JSON.stringify(data)}`, style);
    } else {
        console.log(`%c${message} - ${data}`, style);
    }
}
