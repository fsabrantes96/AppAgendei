import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
        container: {
            flex: 1,
            backgroundColor: COLORS.creme
        },
        banner: {
            backgroundColor: COLORS.areia,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 30,
            paddingBottom: 25
        },
        nome: {
            fontSize: FONT_SIZE.md,
            fontWeight: "bold",
            marginTop: 5,
            color: COLORS.bordo
        },
        idade: {
            fontSize: FONT_SIZE.md,
            fontWeight: "bold",
            color: COLORS.blush
        },
        text: {
            fontSize: FONT_SIZE.md,
            fontWeight: "bold",
            color: COLORS.blush
        },
        observacoes: {
            fontSize: FONT_SIZE.sm,
            fontWeight: "bold",
            color: COLORS.bordo

        },
        icon: {
            width: 80,
            height: 80
        }
    }