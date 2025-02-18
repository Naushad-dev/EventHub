import moment from "moment"

const input="12/04/2025"
const date= moment(input,"DD/MM/YYYY").format("DD/MM/YYYY")

console.log("date",date);
