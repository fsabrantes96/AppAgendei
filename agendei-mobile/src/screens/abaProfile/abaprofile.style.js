import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
        container: {
            flex: 1,
            backgroundColor: COLORS.creme,
            paddingTop: 12,
            justifyContent: "space-between",
        },
        item: {
            borderWidth: 1,
            borderColor: COLORS.blush,
            paddingLeft: 8,
            paddingTop: 15,
            paddingBottom: 15 
        },
        title: {
            fontSize: FONT_SIZE.sm,
            color: COLORS.bordo,
            marginBottom: 4
        },
        text: {
            fontSize: FONT_SIZE.md,
            fontWeight: "bold",
            color: COLORS.bordo,
        }
    }