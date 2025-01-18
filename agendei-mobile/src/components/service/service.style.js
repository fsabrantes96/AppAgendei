import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {

    service: {
        flex: 1,
        backgroundColor: COLORS.creme,
        flexDirection: "row",
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.areia
    },
    containerText: {
        flex: 1,
        marginRight: 10
    },
    containerButton: {
        marginTop: 25
    },
    procedimento: {
        fontSize: FONT_SIZE.md,
        color: COLORS.bordo,
        fontWeight: 500,
    },
    valor: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.blush,
        fontWeight: 700,
    },
    containerButton: {
        width: 130
    }
};
