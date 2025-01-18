import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
        cliente: {
            flex: 1,
            backgroundColor: COLORS.creme,
            padding: 8,
            flexDirection: "row",
            borderWidth: 1,
            borderColor: COLORS.areia,
            marginTop: 3,
            marginBottom: 3,
            borderRadius: 6, 
            alignItems: "center"

        },
        name: {
            fontSize: FONT_SIZE.md,
            color: COLORS.bordo,
        },
        icon: {
            width: 50,
            height: 50,
            marginRight: 8
        }
    }