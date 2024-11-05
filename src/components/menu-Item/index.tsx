import { MenuItem as MenuItemType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui";

type Props = {
    menuItem: MenuItemType;
    addToCart: () => void;
}

const MenuItem = ({ menuItem, addToCart }: Props) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader className="fontSize-sm">
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
                ￡{(menuItem.price / 100).toFixed(2)}
            </CardContent>
        </Card>
    )
}

export default MenuItem;