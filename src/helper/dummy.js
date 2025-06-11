import { actIcon, allArt, allIcon, danceIcon, singIcon } from "./images";

export const categoryList = [
    {id: 1, label: "All", image: allIcon, backgroundColor: "#D8D8D8"},
    {id: 2, label: "Dancing", image: danceIcon,  backgroundColor: "#8BFFF9"},
    {id: 3, label: "Singing", image: singIcon,  backgroundColor: "#F9F9F9"},
    {id: 4, label: "Acting", image: actIcon,  backgroundColor: "#F9F9F9"},
];

export const constestCategoryList = [
    {id: 1, label: "All", image: allArt, backgroundColor: ["#D9AF23", "#D9AF23"], textBg: "#AD8D23"},
    {id: 2, label: "Dancing", image: danceIcon,  backgroundColor: ["#DC5D1D", "#CD3739"], textBg: "#DEB15D"},
    {id: 3, label: "Singing", image: singIcon,  backgroundColor: ["#1DDC5D", "#37CDBC"], textBg: "#085025"},
    {id: 4, label: "Acting", image: actIcon,  backgroundColor: ["#69A5FF", "#37BECD"], textBg: "#00357C"},
];