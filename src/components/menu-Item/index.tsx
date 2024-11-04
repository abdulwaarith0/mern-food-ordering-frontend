import { MenuItem as MenuItemType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui";

type Props = {
    menuItem: MenuItemType;
}

const MenuItem = ({ menuItem }: Props) => {
    return (
        <Card className="cursor-pointer">
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