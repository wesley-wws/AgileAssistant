import Box from "@mui/material/Box";
import PokerCard from "../components/PokerCard";

const poker = {
    value: 100,
	isShown: true,
}

export default function TestPage(props:any){
    return <PokerCard  {...poker} ></PokerCard>
}